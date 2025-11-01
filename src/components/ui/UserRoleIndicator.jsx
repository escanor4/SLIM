import React, { useState } from 'react';
import Icon from '../AppIcon';


const UserRoleIndicator = ({ 
  currentUser = {
    name: 'Marie Dubois',
    role: 'Superviseur CSSD',
    department: 'Stérilisation Centrale',
    avatar: null,
    permissions: ['read', 'write', 'admin']
  },
  availableRoles = [],
  onRoleSwitch,
  showRoleSwitch = false,
  compact = false,
  className = ''
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roleConfig = {
    'Superviseur CSSD': {
      icon: 'UserCheck',
      color: 'bg-primary',
      badge: 'SUP'
    },
    'Technicien CSSD': {
      icon: 'User',
      color: 'bg-accent',
      badge: 'TECH'
    },
    'Personnel OR': {
      icon: 'Stethoscope',
      color: 'bg-success',
      badge: 'OR'
    },
    'Responsable Conformité': {
      icon: 'Shield',
      color: 'bg-warning',
      badge: 'CONF'
    },
    'Maintenance': {
      icon: 'Wrench',
      color: 'bg-secondary',
      badge: 'MAINT'
    }
  };

  const currentRoleConfig = roleConfig?.[currentUser?.role] || roleConfig?.['Technicien CSSD'];

  const handleRoleSwitch = (newRole) => {
    if (onRoleSwitch) {
      onRoleSwitch(newRole);
    }
    setShowRoleMenu(false);
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className={`w-8 h-8 ${currentRoleConfig?.color} rounded-full flex items-center justify-center`}>
          <Icon name={currentRoleConfig?.icon} size={16} color="white" />
        </div>
        <div className="hidden sm:block">
          <div className="text-sm font-medium text-foreground">{currentUser?.name}</div>
          <div className="text-xs text-muted-foreground">{currentRoleConfig?.badge}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => showRoleSwitch && setShowRoleMenu(!showRoleMenu)}
        className={`
          flex items-center gap-3 p-3 rounded-lg transition-all duration-200
          ${showRoleSwitch 
            ? 'hover:bg-slate-100 cursor-pointer' :'cursor-default'
          }
          bg-white border border-border shadow-medical
        `}
      >
        {/* Avatar */}
        <div className={`w-10 h-10 ${currentRoleConfig?.color} rounded-full flex items-center justify-center flex-shrink-0`}>
          {currentUser?.avatar ? (
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Icon name={currentRoleConfig?.icon} size={20} color="white" />
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-left min-w-0">
          <div className="text-sm font-medium text-foreground truncate">
            {currentUser?.name}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {currentUser?.role}
          </div>
          <div className="text-xs text-slate-400 truncate">
            {currentUser?.department}
          </div>
        </div>

        {/* Role Badge */}
        <div className="flex flex-col items-end gap-1">
          <span className={`
            px-2 py-1 text-xs font-medium rounded-md
            ${currentRoleConfig?.color} text-white
          `}>
            {currentRoleConfig?.badge}
          </span>
          
          {showRoleSwitch && (
            <Icon 
              name={showRoleMenu ? "ChevronUp" : "ChevronDown"} 
              size={14} 
              className="text-muted-foreground"
            />
          )}
        </div>
      </button>
      {/* Role Switch Menu */}
      {showRoleMenu && showRoleSwitch && availableRoles?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-medical-lg z-200">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b border-border">
              Changer de rôle
            </div>
            {availableRoles?.map((role) => {
              const roleConf = roleConfig?.[role] || roleConfig?.['Technicien CSSD'];
              const isCurrentRole = role === currentUser?.role;
              
              return (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role)}
                  disabled={isCurrentRole}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200
                    ${isCurrentRole 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'hover:bg-slate-100 text-foreground'
                    }
                  `}
                >
                  <div className={`w-6 h-6 ${roleConf?.color} rounded-full flex items-center justify-center`}>
                    <Icon name={roleConf?.icon} size={12} color="white" />
                  </div>
                  <span className="flex-1 text-left">{role}</span>
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded
                    ${roleConf?.color} text-white
                  `}>
                    {roleConf?.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Overlay */}
      {showRoleMenu && (
        <div 
          className="fixed inset-0 z-100"
          onClick={() => setShowRoleMenu(false)}
        />
      )}
    </div>
  );
};

export default UserRoleIndicator;