import React from 'react';
import { Wallet, WifiOff, Wifi, CloudOff, CloudUpload, Check } from 'lucide-react';
import { useBudgetStore } from '../store/budgetStore';

const Header: React.FC = () => {
  const { isOnline, currentBudget } = useBudgetStore();
  
  const getSyncIcon = () => {
    if (!currentBudget) return null;
    
    switch (currentBudget.syncStatus) {
      case 'local-only':
        return <CloudOff className="w-4 h-4" />;
      case 'sync-pending':
        return <CloudUpload className="w-4 h-4 animate-pulse" />;
      case 'synced':
        return <Check className="w-4 h-4" />;
    }
  };
  
  const getSyncText = () => {
    if (!currentBudget) return '';
    
    switch (currentBudget.syncStatus) {
      case 'local-only':
        return 'Local Only';
      case 'sync-pending':
        return 'Sync Pending';
      case 'synced':
        return 'Synced';
    }
  };
  
  const getSyncColor = () => {
    if (!currentBudget) return 'text-gray-500';
    
    switch (currentBudget.syncStatus) {
      case 'local-only':
        return 'text-yellow-500';
      case 'sync-pending':
        return 'text-blue-500';
      case 'synced':
        return 'text-green-500';
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BudgetBox</h1>
              <p className="text-xs text-gray-500">Offline-First Budgeting</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getSyncColor()} border-current bg-opacity-10`}>
              {getSyncIcon()}
              <span className="text-xs font-medium">{getSyncText()}</span>
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isOnline ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-xs font-medium">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
