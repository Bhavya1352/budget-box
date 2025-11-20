import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'local' | 'pending' | 'synced' | 'offline';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'local', className = '' }) => {
  const variantClasses = {
    local: 'status-local',
    pending: 'status-pending',
    synced: 'status-synced',
    offline: 'bg-danger-100 text-danger-700'
  };

  return (
    <span className={`status-badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;