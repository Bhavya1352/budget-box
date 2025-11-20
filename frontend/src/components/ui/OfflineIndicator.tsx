import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
  className?: string;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success-500' : 'bg-danger-500'} animate-pulse-soft`} />
      <div className="flex items-center gap-1 text-xs font-medium">
        {isOnline ? (
          <>
            <Wifi className="w-3 h-3 text-success-600" />
            <span className="text-success-600">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3 text-danger-600" />
            <span className="text-danger-600">Offline</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;