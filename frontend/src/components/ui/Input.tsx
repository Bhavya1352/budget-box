import React from 'react';
import { DollarSign } from 'lucide-react';

interface InputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  autoSave?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon = <DollarSign className="w-5 h-5 text-slate-400" />,
  autoSave = false,
  className = ''
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [showSaved, setShowSaved] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
    
    if (autoSave) {
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {showSaved && (
          <span className="text-xs text-success-600 animate-fade-in">
            ✓ Saved locally
          </span>
        )}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type="number"
          value={value || ''}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`input-field pl-10 ${isFocused ? 'ring-2 ring-primary-500' : ''}`}
        />
      </div>
    </div>
  );
};

export default Input;