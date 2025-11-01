import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FacilityMap from './components/FacilityMap';
import MetricsCards from './components/MetricsCards';
import CriticalAlertsPanel from './components/CriticalAlertsPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import QuickActionsPanel from './components/QuickActionsPanel';
import QuickScanAccess from '../../components/ui/QuickScanAccess';

const TableauDeBord = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleScanComplete = (scanResult) => {
    console.log('Scan completed:', scanResult);
    // Handle scan result - update state, show notification, etc.
  };

  const handleScanError = (error) => {
    console.error('Scan error:', error);
    // Handle scan error - show error message, retry options, etc.
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`
        pt-16 transition-all duration-300
        ${sidebarCollapsed ? 'ml-16' : 'ml-72'}
      `}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Tableau de Bord CSSD</h1>
                <p className="text-muted-foreground">
                  Vue d'ensemble en temps réel des opérations de stérilisation • 
                  <span className="ml-2 text-sm">
                    {new Date()?.toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </p>
              </div>
              
              {/* Real-time Status Indicator */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-success/10 text-success rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Système Opérationnel</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Dernière mise à jour: {new Date()?.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <MetricsCards />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Facility Map */}
            <div className="xl:col-span-2 space-y-6">
              <FacilityMap />
            </div>

            {/* Right Column - Alerts and Quick Actions */}
            <div className="space-y-6">
              <CriticalAlertsPanel />
              <QuickActionsPanel />
            </div>
          </div>

          {/* Bottom Section - Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <RecentActivityFeed />
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-border shadow-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">87%</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Efficacité Opérationnelle</h3>
                  <p className="text-xs text-muted-foreground">Objectif: 85%</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border shadow-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-success">99.2%</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Conformité Réglementaire</h3>
                  <p className="text-xs text-muted-foreground">Objectif: 99%</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '99.2%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border shadow-medical p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">2.1h</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Temps Moyen de Cycle</h3>
                  <p className="text-xs text-muted-foreground">Objectif: 2.5h</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Floating Quick Scan Access */}
      <QuickScanAccess 
        onScanComplete={handleScanComplete}
        onScanError={handleScanError}
        isFloating={true}
      />
    </div>
  );
};

export default TableauDeBord;