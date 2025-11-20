import React, { useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { RefreshCw, Download, Cloud, CloudOff, Check, AlertCircle } from 'lucide-react';
import { Card, SyncStatusBadge, WarningCard } from './ui';

const SyncControls: React.FC = () => {
  const { syncToServer, exportData, currentBudget, isOnline } = useBudgetStore();
  const [isExporting, setIsExporting] = useState(false);
  
  const handleSync = async () => {
    if (!isOnline) {
      return;
    }
    await syncToServer();
  };
  
  const handleExport = async () => {
    setIsExporting(true);
    await exportData();
    setTimeout(() => setIsExporting(false), 1000);
  };
  
  const getSyncButtonConfig = () => {
    if (!currentBudget) {
      return {
        text: 'No Data to Sync',
        disabled: true,
        className: 'btn-secondary opacity-50 cursor-not-allowed'
      };
    }
    
    if (!isOnline) {
      return {
        text: 'Offline - Cannot Sync',
        disabled: true,
        className: 'bg-slate-100 text-slate-400 cursor-not-allowed'
      };
    }
    
    switch (currentBudget.syncStatus) {
      case 'local-only':
        return {
          text: 'Sync to Server',
          disabled: false,
          className: 'btn-primary'
        };
      case 'sync-pending':
        return {
          text: 'Syncing...',
          disabled: true,
          className: 'bg-warning-500 text-white cursor-wait'
        };
      case 'synced':
        return {
          text: 'All Synced',
          disabled: true,
          className: 'bg-success-500 text-white cursor-default'
        };
    }
  };
  
  const syncConfig = getSyncButtonConfig();
  
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Sync & Export</h3>
            <p className="text-sm text-slate-500 mt-1">Manage your data synchronization</p>
          </div>
          {currentBudget && (
            <SyncStatusBadge status={currentBudget.syncStatus} />
          )}
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleSync}
            disabled={syncConfig.disabled}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-medium transition-all duration-200 ${syncConfig.className}`}
          >
            {currentBudget?.syncStatus === 'sync-pending' ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : isOnline ? (
              <Cloud className="w-5 h-5" />
            ) : (
              <CloudOff className="w-5 h-5" />
            )}
            <span>{syncConfig.text}</span>
          </button>
          
          <button
            onClick={handleExport}
            disabled={!currentBudget || isExporting}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-medium btn-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            <span>{isExporting ? 'Exporting...' : 'Export JSON'}</span>
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Sync Status Guide</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              <span className="text-slate-600"><strong>Local Only:</strong> Saved locally, never synced to server</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-warning-500"></div>
              <span className="text-slate-600"><strong>Sync Pending:</strong> Changes waiting for network connection</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-success-500"></div>
              <span className="text-slate-600"><strong>Synced:</strong> Server and local data are aligned</span>
            </div>
          </div>
        </div>
      </Card>
      
      {!isOnline && (
        <WarningCard
          type="warning"
          title="Offline Mode"
          message="You're currently offline. All changes are being saved locally and will sync when you're back online."
        />
      )}
    </div>
  );
};

export default SyncControls;
