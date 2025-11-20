import React, { useEffect, useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { DollarSign, Save, TrendingUp, TrendingDown } from 'lucide-react';
import { BudgetCategory } from '../types/budget';

interface BudgetFieldProps {
  label: string;
  field: keyof BudgetCategory;
  icon: React.ReactNode;
  description: string;
}

const BudgetField: React.FC<BudgetFieldProps> = ({ label, field, icon, description }) => {
  const { currentBudget, updateCategory } = useBudgetStore();
  const [localValue, setLocalValue] = useState('');
  
  useEffect(() => {
    if (currentBudget) {
      setLocalValue(currentBudget.categories[field]?.toString() || '0');
    }
  }, [currentBudget, field]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    
    const numValue = parseFloat(value) || 0;
    updateCategory(field, numValue);
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
      <div className="flex items-start gap-3">
        <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
          {icon}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            {label}
          </label>
          <p className="text-xs text-gray-500 mb-3">{description}</p>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={localValue}
              onChange={handleChange}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BudgetForm: React.FC = () => {
  const { lastSaved } = useBudgetStore();
  
  const fields: BudgetFieldProps[] = [
    {
      label: 'Monthly Income',
      field: 'income',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Total monthly income',
    },
    {
      label: 'Monthly Bills',
      field: 'monthlyBills',
      icon: <TrendingDown className="w-5 h-5" />,
      description: 'Rent, EMI, utilities',
    },
    {
      label: 'Food',
      field: 'food',
      icon: <TrendingDown className="w-5 h-5" />,
      description: 'Groceries + dining',
    },
    {
      label: 'Transport',
      field: 'transport',
      icon: <TrendingDown className="w-5 h-5" />,
      description: 'Fuel, cab, commute',
    },
    {
      label: 'Subscriptions',
      field: 'subscriptions',
      icon: <TrendingDown className="w-5 h-5" />,
      description: 'OTT, SaaS, apps',
    },
    {
      label: 'Miscellaneous',
      field: 'miscellaneous',
      icon: <TrendingDown className="w-5 h-5" />,
      description: 'Others',
    },
  ];
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Monthly Budget</h2>
          <p className="text-sm text-gray-500 mt-1">Auto-saves every keystroke</p>
        </div>
        {lastSaved && (
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
            <Save className="w-3 h-3 text-green-600" />
            <span>Saved just now</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <BudgetField key={field.field} {...field} />
        ))}
      </div>
    </div>
  );
};

export default BudgetForm;
