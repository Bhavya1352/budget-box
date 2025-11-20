import React from 'react';
import { Wallet, Settings, User, Menu } from 'lucide-react';
import { OfflineIndicator, SyncStatusBadge } from './ui';
import { useBudgetStore } from '../store/budgetStore';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { isOnline, currentBudget } = useBudgetStore();
  const syncStatus = currentBudget?.syncStatus || 'local-only';
  
  return (
    <header className="bg-white shadow-soft border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button 
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-soft">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold font-display text-gradient">BudgetBox</h1>
                <p className="text-xs text-slate-500">Offline-First Finance Manager</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <SyncStatusBadge status={syncStatus} />
            <OfflineIndicator isOnline={isOnline} />
            
            <div className="hidden sm:flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
