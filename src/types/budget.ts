export interface BudgetCategory {
  income: number;
  monthlyBills: number;
  food: number;
  transport: number;
  subscriptions: number;
  miscellaneous: number;
}

export interface Budget {
  id: string;
  userId: string;
  month: string;
  categories: BudgetCategory;
  createdAt: string;
  updatedAt: string;
  syncStatus: 'local-only' | 'sync-pending' | 'synced';
  lastSyncedAt?: string;
}

export interface Analytics {
  burnRate: number;
  savingsPotential: number;
  totalExpenses: number;
  categoryBreakdown: {
    name: string;
    value: number;
    percentage: number;
  }[];
  anomalyWarnings: string[];
  aiSuggestions: string[];
}
