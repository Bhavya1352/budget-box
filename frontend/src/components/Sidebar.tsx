import React from 'react';
import { BarChart3, PlusCircle, Settings, RefreshCw, X } from 'lucide-react';

interface SidebarProps {
  activeTab: 'home' | 'form' | 'dashboard' | 'sync';
  onTabChange: (tab: 'home' | 'form' | 'dashboard' | 'sync') => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const menuItems = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Welcome & overview'
    },
    {
      id: 'form' as const,
      label: 'Budget Form',
      icon: <PlusCircle className="w-5 h-5" />,
      description: 'Add & edit monthly budget'
    },
    {
      id: 'dashboard' as const,
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'View insights & charts'
    },
    {
      id: 'sync' as const,
      label: 'Sync & Export',
      icon: <RefreshCw className="w-5 h-5" />,
      description: 'Manage data sync'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-80 bg-white border-r border-slate-200 shadow-soft
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 lg:hidden">
            <h2 className="text-lg font-semibold text-slate-900">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200
                    ${activeTab === item.id 
                      ? 'bg-primary-50 text-primary-700 border-2 border-primary-200 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-2 border-transparent'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-lg
                    ${activeTab === item.id 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-slate-100 text-slate-500'
                    }
                  `}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.label}</h3>
                    <p className="text-xs opacity-75 mt-1">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </nav>
          
          {/* Footer */}
          <div className="p-6 border-t border-slate-200">
            <button className="w-full flex items-center gap-3 p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
            
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>BudgetBox</strong> - Offline-first personal finance manager. 
                All data is saved locally and syncs when online.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;