import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Tableau de Bord',
      path: '/tableau-de-bord',
      icon: 'LayoutDashboard',
      alertCount: 3
    },
    {
      label: 'Suivi des Instruments',
      path: '/suivi-des-instruments',
      icon: 'Stethoscope',
      alertCount: 0
    },
    {
      label: 'Cycles de Stérilisation',
      path: '/cycles-de-sterilisation',
      icon: 'Zap',
      alertCount: 1
    },
    {
      label: 'Certificats Numériques',
      path: '/certificats-numeriques',
      icon: 'Shield',
      alertCount: 0
    }
  ];

  const moreMenuItems = [
    {
      label: 'Maintenance Prédictive',
      path: '/maintenance-predictive',
      icon: 'Wrench',
      alertCount: 2
    },
    {
      label: 'Analyse des Performances',
      path: '/analyse-des-performances',
      icon: 'BarChart3',
      alertCount: 0
    }
  ];

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [activeScreen, setActiveScreen] = useState('/tableau-de-bord');

  const handleNavigation = (path) => {
    setActiveScreen(path);
    setIsMobileMenuOpen(false);
    setShowMoreMenu(false);
    // Navigation logic would be handled by React Router
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const renderNavItem = (item, isMobile = false) => {
    const isActive = activeScreen === item?.path;
    
    return (
      <button
        key={item?.path}
        onClick={() => handleNavigation(item?.path)}
        className={`
          relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${isActive 
            ? 'bg-primary text-primary-foreground shadow-medical' 
            : 'text-slate-600 hover:text-primary hover:bg-slate-100'
          }
          ${isMobile ? 'w-full justify-start' : ''}
        `}
      >
        <Icon name={item?.icon} size={18} />
        <span className={isMobile ? '' : 'hidden lg:inline'}>{item?.label}</span>
        {item?.alertCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-soft">
            {item?.alertCount}
          </span>
        )}
      </button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-white border-b border-border shadow-medical">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-foreground">SILM</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Système Intégré de Logistique Médicale</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navigationItems?.map(item => renderNavItem(item))}
          
          {/* More Menu */}
          <div className="relative">
            <button
              onClick={toggleMoreMenu}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-100 transition-all duration-200"
            >
              <Icon name="MoreHorizontal" size={18} />
              <span>Plus</span>
            </button>
            
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-border rounded-lg shadow-medical-lg z-200">
                <div className="p-2">
                  {moreMenuItems?.map(item => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`
                        relative w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                        ${activeScreen === item?.path 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-slate-600 hover:text-primary hover:bg-slate-100'
                        }
                      `}
                    >
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                      {item?.alertCount > 0 && (
                        <span className="ml-auto bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {item?.alertCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Scan Access */}
          <Button
            variant="outline"
            size="sm"
            iconName="Scan"
            iconPosition="left"
            className="hidden sm:flex"
          >
            Scanner
          </Button>

          {/* User Role Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-muted rounded-md">
            <Icon name="User" size={16} />
            <span className="text-sm font-medium text-muted-foreground">Superviseur CSSD</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-medical-lg">
          <div className="p-4 space-y-2">
            {[...navigationItems, ...moreMenuItems]?.map(item => renderNavItem(item, true))}
            
            {/* Mobile Quick Actions */}
            <div className="pt-4 border-t border-border mt-4">
              <Button
                variant="primary"
                size="sm"
                iconName="Scan"
                iconPosition="left"
                fullWidth
                className="mb-2"
              >
                Scanner un Instrument
              </Button>
              
              <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                <div className="flex items-center gap-2">
                  <Icon name="User" size={16} />
                  <span className="text-sm font-medium">Superviseur CSSD</span>
                </div>
                <Button variant="ghost" size="xs" iconName="Settings" />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;