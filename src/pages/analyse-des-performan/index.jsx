import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import TechnicianPerformanceCard from './components/TechnicianPerformanceCard';
import PerformanceMetricsChart from './components/PerformanceMetricsChart';
import InfectionRiskAnalytics from './components/InfectionRiskAnalytics';
import DepartmentMetricsDashboard from './components/DepartmentMetricsDashboard';
import ComplianceReportingInterface from './components/ComplianceReportingInterface';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalyseDesPerformances = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'LayoutDashboard' },
    { id: 'technicians', label: 'Performance Techniciens', icon: 'Users' },
    { id: 'risk', label: 'Analyse des Risques', icon: 'AlertTriangle' },
    { id: 'department', label: 'Métriques Départementales', icon: 'Building' },
    { id: 'compliance', label: 'Rapports de Conformité', icon: 'FileText' }
  ];

  const techniciansData = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Superviseur CSSD",
      overallScore: 94,
      processedInstruments: 1247,
      avgProcessingTime: 12.3,
      complianceRate: 98,
      errorCount: 2,
      efficiency: 94
    },
    {
      id: 2,
      name: "Pierre Martin",
      role: "Technicien Senior",
      overallScore: 87,
      processedInstruments: 1089,
      avgProcessingTime: 14.7,
      complianceRate: 92,
      errorCount: 5,
      efficiency: 87
    },
    {
      id: 3,
      name: "Sophie Dubois",
      role: "Technicien",
      overallScore: 82,
      processedInstruments: 956,
      avgProcessingTime: 16.2,
      complianceRate: 89,
      errorCount: 8,
      efficiency: 82
    },
    {
      id: 4,
      name: "Marc Leroy",
      role: "Technicien",
      overallScore: 76,
      processedInstruments: 834,
      avgProcessingTime: 18.5,
      complianceRate: 85,
      errorCount: 12,
      efficiency: 76
    }
  ];

  const performanceChartData = [
    { date: '2025-10-25', value: 85 },
    { date: '2025-10-26', value: 88 },
    { date: '2025-10-27', value: 82 },
    { date: '2025-10-28', value: 91 },
    { date: '2025-10-29', value: 89 },
    { date: '2025-10-30', value: 93 },
    { date: '2025-10-31', value: 87 }
  ];

  const overviewMetrics = [
    {
      title: "Performance Globale",
      value: "87.3%",
      change: "+5.2%",
      trend: "up",
      icon: "TrendingUp",
      color: "text-success"
    },
    {
      title: "Techniciens Actifs",
      value: "24",
      change: "+2",
      trend: "up",
      icon: "Users",
      color: "text-primary"
    },
    {
      title: "Alertes Actives",
      value: "7",
      change: "-3",
      trend: "down",
      icon: "AlertTriangle",
      color: "text-warning"
    },
    {
      title: "Taux de Conformité",
      value: "94.2%",
      change: "-1.1%",
      trend: "down",
      icon: "Shield",
      color: "text-accent"
    }
  ];

  const handleTechnicianDetails = (technician) => {
    setSelectedTechnician(technician);
    // Could open a modal or navigate to detailed view
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewMetrics?.map((metric, index) => (
                <div key={index} className="bg-white rounded-lg border border-border shadow-medical p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center`}>
                      <Icon name={metric?.icon} size={24} className={metric?.color} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${getTrendColor(metric?.trend)}`}>
                      <Icon name={getTrendIcon(metric?.trend)} size={16} />
                      <span>{metric?.change}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
                    <div className="text-sm text-muted-foreground">{metric?.title}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceMetricsChart
                data={performanceChartData}
                type="line"
                title="Efficacité Globale"
                metric="efficiency"
              />
              <PerformanceMetricsChart
                data={performanceChartData?.map(d => ({ ...d, value: d?.value + 200 }))}
                type="bar"
                title="Débit Quotidien"
                metric="throughput"
              />
            </div>
            {/* Top Performers */}
            <div className="bg-white rounded-lg border border-border shadow-medical p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Meilleurs Performeurs</h3>
                  <p className="text-sm text-muted-foreground">Top 3 des techniciens ce mois</p>
                </div>
                <Icon name="Award" size={20} className="text-warning" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {techniciansData?.slice(0, 3)?.map((tech, index) => (
                  <div key={tech?.id} className="text-center p-4 border border-border rounded-lg">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-warning text-white' : 
                      index === 1 ? 'bg-slate-400 text-white': 'bg-amber-600 text-white'
                    }`}>
                      <Icon name="User" size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground">{tech?.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{tech?.role}</p>
                    <div className="text-2xl font-bold text-primary">{tech?.overallScore}%</div>
                    <div className="text-xs text-muted-foreground">Score Global</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'technicians':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Performance des Techniciens</h2>
                <p className="text-muted-foreground">Analyse détaillée des performances individuelles</p>
              </div>
              <Button variant="outline" iconName="Download" iconPosition="left">
                Exporter
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {techniciansData?.map((technician) => (
                <TechnicianPerformanceCard
                  key={technician?.id}
                  technician={technician}
                  onViewDetails={handleTechnicianDetails}
                />
              ))}
            </div>
          </div>
        );

      case 'risk':
        return <InfectionRiskAnalytics />;

      case 'department':
        return <DepartmentMetricsDashboard />;

      case 'compliance':
        return <ComplianceReportingInterface />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`
        transition-all duration-300 pt-16
        ${sidebarCollapsed ? 'ml-16' : 'ml-72'}
      `}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analyse des Performances</h1>
                <p className="text-muted-foreground">Surveillance et optimisation des performances CSSD</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AnalyseDesPerformances;