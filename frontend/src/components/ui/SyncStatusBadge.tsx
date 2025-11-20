import React from 'react';
import { Cloud, CloudOff, Loader2, Check } from 'lucide-react';
import Badge from './Badge';

interface SyncStatusBadgeProps {
  status: 'local-only' | 'sync-pending' | 'synced';
  className?: string;
}

const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({ status, className = '' }) => {
  const statusConfig = {
    'local-only': {
      icon: <CloudOff className="w-3 h-3" />,
      text: 'Local Only',
      variant: 'local' as const
    },
    'sync-pending': {
      icon: <Loader2 className="w-3 h-3 animate-spin" />,
      text: 'Sync Pending',
      variant: 'pending' as const
    },
    'synced': {
      icon: <Check className="w-3 h-3" />,
      text: 'Synced',
      variant: 'synced' as const
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 ${className}`}>
      {config.icon}
      <span>{config.text}</span>
    </Badge>
  );
};

export default SyncStatusBadge;