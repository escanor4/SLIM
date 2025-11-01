import React from 'react';
import Icon from '../AppIcon';

const AlertNotificationBadge = ({ 
  count = 0, 
  type = 'default', 
  size = 'default',
  showIcon = true,
  className = '',
  onClick 
}) => {
  if (count === 0) return null;

  const sizeClasses = {
    sm: 'h-4 w-4 text-xs',
    default: 'h-5 w-5 text-xs',
    lg: 'h-6 w-6 text-sm'
  };

  const typeClasses = {
    default: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
    maintenance: 'bg-amber-500 text-white',
    compliance: 'bg-purple-600 text-white'
  };

  const iconMap = {
    default: 'Bell',
    success: 'CheckCircle',
    warning: 'AlertTriangle',
    error: 'AlertCircle',
    maintenance: 'Wrench',
    compliance: 'Shield'
  };

  const displayCount = count > 99 ? '99+' : count?.toString();

  return (
    <div 
      className={`
        relative inline-flex items-center justify-center rounded-full font-medium
        ${sizeClasses?.[size]}
        ${typeClasses?.[type]}
        ${count > 0 ? 'animate-pulse-soft' : ''}
        ${onClick ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {showIcon && count <= 9 ? (
        <Icon name={iconMap?.[type]} size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />
      ) : (
        <span className="font-semibold">{displayCount}</span>
      )}
    </div>
  );
};

export default AlertNotificationBadge;