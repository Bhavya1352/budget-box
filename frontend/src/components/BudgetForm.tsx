import React from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { TrendingUp, Home, Utensils, Car, Smartphone, ShoppingBag, Save } from 'lucide-react';
import { BudgetCategory } from '../types/budget';
import { Card, Input } from './ui';

interface BudgetFieldConfig {
  label: string;
  field: keyof BudgetCategory;
  icon: React.ReactNode;
  description: string;
  placeholder: string;
}

const BudgetForm: React.FC = () => {
  const { currentBudget, updateCategory, lastSaved } = useBudgetStore();
  
  const fields: BudgetFieldConfig[] = [
    {
      label: 'Monthly Income',
      field: 'income',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Total monthly income after tax',
      placeholder: '50,000'
    },
    {
      label: 'Monthly Bills',
      field: 'monthlyBills',
      icon: <Home className="w-5 h-5" />,
      description: 'Rent, EMI, utilities, insurance',
      placeholder: '25,000'
    },
    {
      label: 'Food & Dining',
      field: 'food',
      icon: <Utensils className="w-5 h-5" />,
      description: 'Groceries, restaurants, food delivery',
      placeholder: '8,000'
    },
    {
      label: 'Transport',
      field: 'transport',
      icon: <Car className="w-5 h-5" />,
      description: 'Fuel, cab, public transport, maintenance',
      placeholder: '5,000'
    },
    {
      label: 'Subscriptions',
      field: 'subscriptions',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'OTT, SaaS, apps, memberships',
      placeholder: '2,000'
    },
    {
      label: 'Miscellaneous',
      field: 'miscellaneous',
      icon: <ShoppingBag className="w-5 h-5" />,
      description: 'Shopping, entertainment, others',
      placeholder: '3,000'
    },
  ];
  
  const handleFieldChange = (field: keyof BudgetCategory, value: number) => {
    updateCategory(field, value);
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-900">Monthly Budget</h2>
            <p className="text-sm text-slate-500 mt-1">Auto-saves every keystroke • Works offline</p>
          </div>
          {lastSaved && (
            <div className="flex items-center gap-2 text-xs text-success-600 bg-success-50 px-3 py-2 rounded-full border border-success-200 animate-fade-in">
              <Save className="w-3 h-3" />
              <span className="font-medium">Saved locally</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fields.map((field) => (
            <Card key={field.field} className="p-4 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                  {field.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{field.label}</h3>
                  <p className="text-xs text-slate-500 mt-1">{field.description}</p>
                </div>
              </div>
              
              <Input
                label=""
                value={currentBudget?.categories[field.field] || 0}
                onChange={(value) => handleFieldChange(field.field, value)}
                placeholder={field.placeholder}
                autoSave={true}
                className="mt-0"
              />
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BudgetForm;
