import React, { useEffect, useState } from 'react';
import { useBudgetStore } from './store/budgetStore';
import Header from './components/Header';
import BudgetForm from './components/BudgetForm';
import Dashboard from './components/Dashboard';
import SyncControls from './components/SyncControls';
import Sidebar from './components/Sidebar';
import Homepage from './components/Homepage';

type TabType = 'home' | 'form' | 'dashboard' | 'sync';

function App() {
  const { initializeBudget, setOnlineStatus } = useBudgetStore();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    initializeBudget();
    
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [initializeBudget, setOnlineStatus]);
  
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Homepage onGetStarted={() => setActiveTab('form')} />;
      case 'form':
        return (
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">Monthly Budget</h1>
              <p className="text-slate-600 max-w-2xl">Add your income and expenses to get started with budgeting insights.</p>
            </div>
            <BudgetForm />
          </div>
        );
      case 'dashboard':
        return <Dashboard />;
      case 'sync':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">Sync & Export</h1>
              <p className="text-slate-600">Manage your data synchronization and export options.</p>
            </div>
            <SyncControls />
          </div>
        );
      default:
        return null;
    }
  };
  
  if (activeTab === 'home') {
    return (
      <div className="min-h-screen">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onMenuToggle={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
          
          <footer className="mt-16 border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-gradient">BudgetBox</h3>
                </div>
                <p className="text-sm text-slate-600 mb-2">Offline-First Personal Budgeting App</p>
                <p className="text-xs text-slate-500">Built with React, TypeScript, Tailwind CSS, Zustand & IndexedDB</p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-400">Demo Login: hire-me@anshumat.org | Password: HireMe@2025!</p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
