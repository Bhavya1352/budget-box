import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import { Budget, BudgetCategory, Analytics } from '../types/budget';
import { format } from 'date-fns';

localforage.config({
  name: 'BudgetBox',
  storeName: 'budgets',
});

interface BudgetState {
  currentBudget: Budget | null;
  isOnline: boolean;
  lastSaved: string | null;
  autoSaveInterval: number;
  
  initializeBudget: () => void;
  updateCategory: (field: keyof BudgetCategory, value: number) => void;
  calculateAnalytics: () => Analytics | null;
  syncToServer: () => Promise<void>;
  setOnlineStatus: (status: boolean) => void;
  exportData: () => void;
}

const createEmptyBudget = (): Budget => ({
  id: crypto.randomUUID(),
  userId: 'demo-user',
  month: format(new Date(), 'yyyy-MM'),
  categories: {
    income: 0,
    monthlyBills: 0,
    food: 0,
    transport: 0,
    subscriptions: 0,
    miscellaneous: 0,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  syncStatus: 'local-only',
});

const calculateAnomaliesAndSuggestions = (
  categories: BudgetCategory
): { anomalyWarnings: string[]; aiSuggestions: string[] } => {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  const { income, food, subscriptions, monthlyBills, transport, miscellaneous } = categories;
  const totalExpenses = food + subscriptions + monthlyBills + transport + miscellaneous;
  
  if (income === 0) {
    warnings.push('No income recorded for this month');
    return { anomalyWarnings: warnings, aiSuggestions: suggestions };
  }
  
  const foodPercentage = (food / income) * 100;
  const subsPercentage = (subscriptions / income) * 100;
  const savings = income - totalExpenses;
  
  if (foodPercentage > 40) {
    warnings.push(`Food expenses are ${foodPercentage.toFixed(1)}% of your income — too high!`);
    suggestions.push('💡 Reduce food spending next month. Try meal planning or cooking at home.');
  }
  
  if (subsPercentage > 30) {
    warnings.push(`Subscriptions are ${subsPercentage.toFixed(1)}% of your income`);
    suggestions.push('💡 Consider canceling unused apps and services.');
  }
  
  if (savings < 0) {
    warnings.push('Your expenses exceed your income!');
    suggestions.push('💡 Urgent: Review and cut unnecessary expenses immediately.');
  } else if (savings < income * 0.1) {
    suggestions.push('💡 Try to save at least 10-20% of your income for financial security.');
  }
  
  if (monthlyBills > income * 0.4) {
    suggestions.push('💡 Your fixed bills are high. Consider negotiating or finding alternatives.');
  }
  
  if (totalExpenses === 0 && income > 0) {
    suggestions.push('📊 Start tracking your expenses to get personalized insights!');
  }
  
  return { anomalyWarnings: warnings, aiSuggestions: suggestions };
};

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set, get) => ({
      currentBudget: null,
      isOnline: navigator.onLine,
      lastSaved: null,
      autoSaveInterval: 6,
      
      initializeBudget: () => {
        const existing = get().currentBudget;
        if (!existing) {
          set({ currentBudget: createEmptyBudget() });
        }
      },
      
      updateCategory: (field: keyof BudgetCategory, value: number) => {
        const current = get().currentBudget;
        if (!current) return;
        
        const updated: Budget = {
          ...current,
          categories: {
            ...current.categories,
            [field]: value,
          },
          updatedAt: new Date().toISOString(),
          syncStatus: get().isOnline ? 'sync-pending' : 'local-only',
        };
        
        set({ 
          currentBudget: updated,
          lastSaved: new Date().toISOString(),
        });
      },
      
      calculateAnalytics: (): Analytics | null => {
        const budget = get().currentBudget;
        if (!budget) return null;
        
        const { categories } = budget;
        const totalExpenses = 
          categories.monthlyBills +
          categories.food +
          categories.transport +
          categories.subscriptions +
          categories.miscellaneous;
        
        const burnRate = categories.income > 0 
          ? (totalExpenses / categories.income) * 100 
          : 0;
        
        const savingsPotential = categories.income - totalExpenses;
        
        const categoryBreakdown = [
          { name: 'Bills', value: categories.monthlyBills },
          { name: 'Food', value: categories.food },
          { name: 'Transport', value: categories.transport },
          { name: 'Subscriptions', value: categories.subscriptions },
          { name: 'Others', value: categories.miscellaneous },
        ]
          .filter(cat => cat.value > 0)
          .map(cat => ({
            ...cat,
            percentage: totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0,
          }))
          .sort((a, b) => b.value - a.value);
        
        const { anomalyWarnings, aiSuggestions } = calculateAnomaliesAndSuggestions(categories);
        
        return {
          burnRate,
          savingsPotential,
          totalExpenses,
          categoryBreakdown,
          anomalyWarnings,
          aiSuggestions,
        };
      },
      
      syncToServer: async () => {
        const budget = get().currentBudget;
        if (!budget || !get().isOnline) return;
        
        try {
          set({ 
            currentBudget: {
              ...budget,
              syncStatus: 'sync-pending',
            }
          });
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ 
            currentBudget: {
              ...budget,
              syncStatus: 'synced',
              lastSyncedAt: new Date().toISOString(),
            }
          });
        } catch (error) {
          console.error('Sync failed:', error);
          set({ 
            currentBudget: {
              ...budget,
              syncStatus: 'local-only',
            }
          });
        }
      },
      
      setOnlineStatus: (status: boolean) => {
        set({ isOnline: status });
        const budget = get().currentBudget;
        if (budget && budget.syncStatus === 'local-only' && status) {
          set({ 
            currentBudget: {
              ...budget,
              syncStatus: 'sync-pending',
            }
          });
        }
      },
      
      exportData: () => {
        const budget = get().currentBudget;
        if (!budget) return;
        
        const dataStr = JSON.stringify(budget, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `budgetbox-${budget.month}.json`;
        link.click();
        URL.revokeObjectURL(url);
      },
    }),
    {
      name: 'budgetbox-storage',
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          const value = await localforage.getItem(name);
          return value as string | null;
        },
        setItem: async (name, value) => {
          await localforage.setItem(name, value);
        },
        removeItem: async (name) => {
          await localforage.removeItem(name);
        },
      })),
    }
  )
);
