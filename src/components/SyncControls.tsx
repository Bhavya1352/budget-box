import React from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { RefreshCw, Download, Upload } from 'lucide-react';

const SyncControls: React.FC = () => {
  const { syncToServer, exportData, currentBudget, isOnline } = useBudgetStore();
  
  const handleSync = async () => {
    if (!isOnline) {
      alert('Cannot sync while offline. Please check your internet connection.');
      return;
    }
    await syncToServer();
  };
  
  const getSyncButtonText = () => {
    if (!currentBudget) return 'Sync';
    
    switch (currentBudget.syncStatus) {
      case 'local-only':
        return 'Sync to Server';
      case 'sync-pending':
        return 'Syncing...';
      case 'synced':
        return 'Synced ✓';
    }
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sync & Export</h3>
      
      <div className="space-y-3">
        <button
          onClick={handleSync}
          disabled={!isOnline || currentBudget?.syncStatus === 'synced'}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
            isOnline && currentBudget?.syncStatus !== 'synced'
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${currentBudget?.syncStatus === 'sync-pending' ? 'animate-spin' : ''}`} />
          {getSyncButtonText()}
        </button>
        
        <button
          onClick={exportData}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export JSON
        </button>
        
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Sync Status Meanings:</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600"><strong>Local Only:</strong> Saved locally, never synced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600"><strong>Sync Pending:</strong> Waiting for network</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600"><strong>Synced:</strong> Server & local aligned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncControls;
