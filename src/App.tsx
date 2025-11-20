import React, { useEffect } from 'react';
import { useBudgetStore } from './store/budgetStore';
import Header from './components/Header';
import BudgetForm from './components/BudgetForm';
import Dashboard from './components/Dashboard';
import SyncControls from './components/SyncControls';

function App() {
  const { initializeBudget, setOnlineStatus } = useBudgetStore();
  
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to BudgetBox</h2>
          <p className="text-gray-600">Your offline-first personal budgeting companion that never loses data.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <BudgetForm />
          </div>
          <div>
            <SyncControls />
          </div>
        </div>
        
        <Dashboard />
        
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>BudgetBox - Offline-First Personal Budgeting App</p>
          <p className="mt-2">Built with React, TypeScript, Tailwind CSS, Zustand & IndexedDB</p>
          <p className="mt-4 text-xs">Demo User: hire-me@sarthukmail.org</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
