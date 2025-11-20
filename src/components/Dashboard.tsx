import React from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Percent, DollarSign } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

const Dashboard: React.FC = () => {
  const { calculateAnalytics, currentBudget } = useBudgetStore();
  const analytics = calculateAnalytics();
  
  if (!analytics || !currentBudget) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Add budget data to see analytics</p>
      </div>
    );
  }
  
  const { burnRate, savingsPotential, totalExpenses, categoryBreakdown, anomalyWarnings, aiSuggestions } = analytics;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Percent className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Burn Rate</span>
          </div>
          <p className="text-3xl font-bold">{burnRate.toFixed(1)}%</p>
          <p className="text-xs opacity-75 mt-1">of income spent</p>
        </div>
        
        <div className={`rounded-xl p-5 text-white shadow-lg ${savingsPotential >= 0 ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>
          <div className="flex items-center gap-3 mb-2">
            {savingsPotential >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span className="text-sm font-medium opacity-90">Savings Potential</span>
          </div>
          <p className="text-3xl font-bold">₹{Math.abs(savingsPotential).toFixed(0)}</p>
          <p className="text-xs opacity-75 mt-1">{savingsPotential >= 0 ? 'can save' : 'deficit'}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Total Expenses</span>
          </div>
          <p className="text-3xl font-bold">₹{totalExpenses.toFixed(0)}</p>
          <p className="text-xs opacity-75 mt-1">this month</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Income</span>
          </div>
          <p className="text-3xl font-bold">₹{currentBudget.categories.income.toFixed(0)}</p>
          <p className="text-xs opacity-75 mt-1">monthly</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryBreakdown.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.percentage.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `₹${value.toFixed(0)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {categoryBreakdown.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-15} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => `₹${value.toFixed(0)}`} />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {anomalyWarnings.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Anomaly Warnings</h3>
          </div>
          <ul className="space-y-2">
            {anomalyWarnings.map((warning, index) => (
              <li key={index} className="text-sm text-red-800 flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {aiSuggestions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">AI Suggestions</h3>
          </div>
          <ul className="space-y-2">
            {aiSuggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                <span className="mt-0.5">{suggestion.split(' ')[0]}</span>
                <span>{suggestion.substring(suggestion.indexOf(' ') + 1)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
