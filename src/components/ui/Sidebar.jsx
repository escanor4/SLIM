import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // initialize from current location so active state stays in sync with URL
  const [activeScreen, setActiveScreen] = useState(location.pathname || '/tableau-de-bord');

  const navigationItems = [
    {
      label: 'Tableau de Bord',
      path: '/tableau-de-bord',
      icon: 'LayoutDashboard',
      alertCount: 3,
      description: 'Vue d\'ensemble temps réel'
    },
    {
      label: 'Suivi des Instruments',
      path: '/suivi-des-instruments',
      icon: 'Stethoscope',
      alertCount: 0,
      description: 'Traçabilité RFID/Datamatrix'
    },
    {
      label: 'Cycles de Stérilisation',
      path: '/cycles-de-sterilisation',
      icon: 'Zap',
      alertCount: 1,
      description: 'Gestion des autoclaves'
    },
    {
      label: 'Certificats Numériques',
      path: '/certificats-numeriques',
      icon: 'Shield',
      alertCount: 0,
      description: 'Conformité réglementaire'
    },
    {
      label: 'Maintenance Prédictive',
      path: '/maintenance-predictive',
      icon: 'Wrench',
      alertCount: 2,
      description: 'IA et maintenance préventive'
    },
    {
      label: 'Analyse des Performances',
      path: '/analyse-des-performances',
      icon: 'BarChart3',
      alertCount: 0,
      description: 'Métriques et KPI'
    }
  ];

  // Minimal fix: actually navigate using the router
  const handleNavigation = (path) => {
    setActiveScreen(path);
    navigate(path);
  };

  const renderNavItem = (item) => {
    const isActive = activeScreen === item?.path;
    
    return (
      <div key={item?.path} className="relative group">
        <button
          onClick={() => handleNavigation(item?.path)}
          className={`
            relative flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${isActive 
              ? 'bg-primary text-primary-foreground shadow-medical' 
              : 'text-slate-600 hover:text-primary hover:bg-slate-100'
            }
          `}
        >
          <Icon name={item?.icon} size={18} />
          {!isCollapsed && <div className="flex flex-col items-start">
            <span className="truncate">{item?.label}</span>
            <span className="text-xs text-muted-foreground">{item?.description}</span>
          </div>}
          {item?.alertCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-soft">
              {item?.alertCount}
            </span>
          )}
        </button>
      </div>
    );
  };

  return (
    <aside
      className={`
      fixed left-0 top-16 bottom-0 z-100 bg-white border-r border-border shadow-medical transition-all duration-300
      ${isCollapsed ? 'w-16' : 'w-72'}
    `}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
              <p className="text-sm text-muted-foreground">Modules CSSD</p>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            onClick={onToggleCollapse}
            className="flex-shrink-0"
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems?.map(renderNavItem)}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border space-y-3">
          {!isCollapsed ? (
            <>
              <Button
                variant="primary"
                size="sm"
                iconName="Scan"
                iconPosition="left"
                fullWidth
              >
                Scanner Instrument
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                fullWidth
              >
                Nouveau Cycle
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <Button
                variant="primary"
                size="icon"
                iconName="Scan"
                className="w-full"
              />
              <Button
                variant="outline"
                size="icon"
                iconName="Plus"
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  Marie Dubois
                </div>
                <div className="text-xs text-muted-foreground">
                  Superviseur CSSD
                </div>
              </div>
              <Button variant="ghost" size="xs" iconName="Settings" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;