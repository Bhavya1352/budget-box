import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import Card from './Card';

interface WarningCardProps {
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  className?: string;
}

const WarningCard: React.FC<WarningCardProps> = ({ type, title, message, className = '' }) => {
  const config = {
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      bgColor: 'bg-warning-50 border-warning-200',
      iconColor: 'text-warning-600',
      titleColor: 'text-warning-800',
      textColor: 'text-warning-700'
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      bgColor: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
      titleColor: 'text-primary-800',
      textColor: 'text-primary-700'
    },
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      bgColor: 'bg-success-50 border-success-200',
      iconColor: 'text-success-600',
      titleColor: 'text-success-800',
      textColor: 'text-success-700'
    }
  };

  const { icon, bgColor, iconColor, titleColor, textColor } = config[type];

  return (
    <Card className={`${bgColor} border ${className}`}>
      <div className="flex gap-3 p-4">
        <div className={`flex-shrink-0 ${iconColor}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${titleColor} mb-1`}>{title}</h4>
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
      </div>
    </Card>
  );
};

export default WarningCard;