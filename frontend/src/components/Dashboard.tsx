import React from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Percent, DollarSign, Target, Calendar, Flame, PiggyBank } from 'lucide-react';
import { Card, MetricCard, WarningCard } from './ui';

const COLORS = ['#2563eb', '#7c3aed', '#dc2626', '#ea580c', '#16a34a', '#0891b2'];

const Dashboard: React.FC = () => {
  const { calculateAnalytics, currentBudget } = useBudgetStore();
  const analytics = calculateAnalytics();
  
  if (!analytics || !currentBudget) {
    return (
      <Card className="p-12 text-center animate-fade-in">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Data Yet</h3>
          <p className="text-slate-500">Add your budget information to see beautiful analytics and insights.</p>
        </div>
      </Card>
    );
  }
  
  const { burnRate, savingsPotential, totalExpenses, categoryBreakdown, anomalyWarnings, aiSuggestions } = analytics;
  
  const monthEndPrediction = currentBudget.categories.income - totalExpenses;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Analytics Dashboard</h2>
          <p className="text-slate-500 mt-1">Your financial insights at a glance</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          <span>Current Month</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="🔥 Burn Rate"
          value={`${burnRate.toFixed(1)}%`}
          subtitle="of income spent"
          icon={<Flame className="w-5 h-5" />}
          color={burnRate > 80 ? 'danger' : burnRate > 60 ? 'warning' : 'success'}
          trend={burnRate > 70 ? 'up' : 'neutral'}
        />
        
        <MetricCard
          title="💸 Savings Potential"
          value={`₹${Math.abs(savingsPotential).toLocaleString()}`}
          subtitle={savingsPotential >= 0 ? 'can save' : 'deficit'}
          icon={<PiggyBank className="w-5 h-5" />}
          color={savingsPotential >= 0 ? 'success' : 'danger'}
          trend={savingsPotential >= 0 ? 'up' : 'down'}
        />
        
        <MetricCard
          title="📅 Month-End Prediction"
          value={`₹${Math.abs(monthEndPrediction).toLocaleString()}`}
          subtitle={monthEndPrediction >= 0 ? 'surplus expected' : 'deficit expected'}
          icon={<Target className="w-5 h-5" />}
          color={monthEndPrediction >= 0 ? 'success' : 'danger'}
          trend={monthEndPrediction >= 0 ? 'up' : 'down'}
        />
        
        <MetricCard
          title="💰 Total Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          subtitle="this month"
          icon={<DollarSign className="w-5 h-5" />}
          color="primary"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryBreakdown.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              🍰 <span>Category Breakdown</span>
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                  outerRadius={90}
                  innerRadius={30}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={3}
                  stroke="#ffffff"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  labelFormatter={(label) => `Category: ${label}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
        
        {categoryBreakdown.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              📊 <span>Expense Distribution</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  stroke="#cbd5e1"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  stroke="#cbd5e1"
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#2563eb" 
                  radius={[4, 4, 0, 0]}
                  stroke="#1d4ed8"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {anomalyWarnings.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              ⚠️ <span>Anomaly Warnings</span>
            </h3>
            {anomalyWarnings.map((warning, index) => (
              <WarningCard
                key={index}
                type="warning"
                title="Budget Alert"
                message={warning}
              />
            ))}
          </div>
        )}
        
        {aiSuggestions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              💡 <span>Smart Suggestions</span>
            </h3>
            {aiSuggestions.map((suggestion, index) => (
              <WarningCard
                key={index}
                type="info"
                title="Recommendation"
                message={suggestion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
