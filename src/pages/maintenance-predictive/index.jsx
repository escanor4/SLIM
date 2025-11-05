import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import EquipmentCard from './components/EquipmentCard';
import MaintenanceScheduler from './components/MaintenanceScheduler';
import PerformanceDashboard from './components/PerformanceDashboard';
import AIInsightsPanel from './components/AIInsightsPanel';
import MaintenanceHistory from './components/MaintenanceHistory';

const MaintenancePredictive = () => {
  const [activeTab, setActiveTab] = useState('equipment');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  // Keep sidebar state consistent with other pages
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for equipment (kept as in original file)
  const equipmentData = [
    {
      id: 'AC-001',
      name: 'Autoclave Principal A',
      model: 'Steris Amsco Century V116',
      status: 'Optimal',
      riskScore: 23,
      icon: 'Zap',
      cyclesCompleted: 1247,
      efficiency: 94,
      uptime: 98.5,
      errorCount: 2,
      nextMaintenance: '2025-11-15T09:00:00',
      avgTemperature: 134.2,
      avgPressure: 2.1,
      avgCycleDuration: 45,
      alerts: []
    },
    {
      id: 'AC-002',
      name: 'Autoclave Secondaire B',
      model: 'Getinge GSS67H',
      status: 'Attention',
      riskScore: 67,
      icon: 'Zap',
      cyclesCompleted: 892,
      efficiency: 89,
      uptime: 95.2,
      errorCount: 8,
      nextMaintenance: '2025-11-08T14:00:00',
      avgTemperature: 135.8,
      avgPressure: 2.0,
      avgCycleDuration: 48,
      alerts: ['Excess vibration detected']
    },
    {
      id: 'WD-001',
      name: 'Laveur-Désinfecteur Principal',
      model: 'Miele PG 8583',
      status: 'Optimal',
      riskScore: 31,
      icon: 'Droplets',
      cyclesCompleted: 3421,
      efficiency: 96,
      uptime: 99.1,
      errorCount: 1,
      nextMaintenance: '2025-12-01T10:00:00',
      avgTemperature: 93.5,
      avgPressure: 1.2,
      avgCycleDuration: 35,
      alerts: []
    },
    {
      id: 'WD-002',
      name: 'Laveur-Désinfecteur Secondaire',
      model: 'Belimed WD290',
      status: 'Maintenance',
      riskScore: 0,
      icon: 'Droplets',
      cyclesCompleted: 1876,
      efficiency: 0,
      uptime: 0,
      errorCount: 0,
      nextMaintenance: '2025-11-01T09:00:00',
      avgTemperature: 0,
      avgPressure: 0,
      avgCycleDuration: 0,
      alerts: ['Maintenance programmée en cours']
    },
    {
      id: 'DRY-001',
      name: 'Séchoir Haute Performance',
      model: 'Steris Reliance 444',
      status: 'Attention',
      riskScore: 54,
      icon: 'Wind',
      cyclesCompleted: 987,
      efficiency: 91,
      uptime: 94.7,
      errorCount: 5,
      nextMaintenance: '2025-11-20T13:00:00',
      avgTemperature: 85.3,
      avgPressure: 0.8,
      avgCycleDuration: 25,
      alerts: [
        'Filtre HEPA nécessite un remplacement',
        'Légère baisse d\'efficacité observée'
      ]
    }
  ];

  // Mock maintenance history and AI insights etc... (kept from original file)
  const maintenanceHistory = [
    {
      id: 'MH-001',
      equipmentName: 'Autoclave Principal A',
      type: 'preventive',
      status: 'terminee',
      priority: 'normale',
      description: 'Maintenance préventive trimestrielle - Vérification générale',
      technician: 'Jean Dupont',
      scheduledDate: '2025-10-28T09:00:00',
      completedAt: '2025-10-28T11:30:00',
      duration: 2.5,
      cost: 287.50,
      partsUsed: ['Joint de porte', 'Filtre à air'],
      notes: 'Maintenance effectuée sans problème. Tous les paramètres dans les normes.',
      createdAt: '2025-09-30T09:00:00'
    },
    {
      id: 'MH-002',
      equipmentName: 'Laveur-Désinfecteur Secondaire',
      type: 'corrective',
      status: 'en_cours',
      priority: 'elevee',
      description: 'Réparation suite à dysfonctionnement pompe de vidange',
      technician: 'Marie Martin',
      scheduledDate: '2025-10-31T08:00:00',
      duration: 4,
      cost: 650.00,
      partsUsed: ['Pompe de vidange', 'Joint torique'],
      notes: 'Remplacement de la pompe en cours. Livraison des pièces confirmée.',
      createdAt: '2025-10-30T16:30:00'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les Statuts' },
    { value: 'Optimal', label: 'Optimal' },
    { value: 'Attention', label: 'Attention' },
    { value: 'Critique', label: 'Critique' },
    { value: 'Maintenance', label: 'Maintenance' }
  ];

  const tabs = [
    { id: 'equipment', label: 'Équipements', icon: 'Zap' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'ai', label: 'Insights IA', icon: 'Brain' },
    { id: 'history', label: 'Historique', icon: 'Clock' }
  ];

  // Helper handlers (kept as in original file)
  const onViewDetails = (eq) => {
    setSelectedEquipment(eq);
    // optionally open a modal or do other actions
  };

  const onScheduleMaintenance = (eq) => {
    setSelectedEquipment(eq);
    setShowScheduler(true);
  };

  const filteredEquipment = equipmentData.filter(eq => {
    if (statusFilter !== 'all' && eq.status !== statusFilter) return false;
    if (searchTerm && !eq.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Use shared Header and Sidebar to keep navigation visible on this route */}
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className={`
        transition-all duration-300 pt-16
        ${sidebarCollapsed ? 'ml-16' : 'ml-72'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header (moved inside main so shared Header stays visible) */}
          <div className="bg-white border-b border-border shadow-medical rounded-md mb-6">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Wrench" size={20} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Maintenance Prédictive</h1>
                  <p className="text-sm text-muted-foreground">Surveillance proactive et planification</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Scan"
                  iconPosition="left"
                  size="sm"
                >
                  Scanner Équipement
                </Button>
                <Button
                  variant="primary"
                  iconName="Plus"
                  iconPosition="left"
                  size="sm"
                  onClick={() => setShowScheduler(true)}
                >
                  Nouvelle Maintenance
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} color="white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Équipements surveillés</div>
                  <div className="text-2xl font-semibold">{equipmentData.length}</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} color="white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Alertes actives</div>
                  <div className="text-2xl font-semibold">
                    {equipmentData.reduce((sum, eq) => sum + (eq.alerts?.length || 0), 0)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={20} color="white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Score moyen de risque</div>
                  <div className="text-2xl font-semibold">
                    {Math.round(equipmentData.reduce((sum, eq) => sum + eq.riskScore, 0) / equipmentData.length)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters & Tabs */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Rechercher un équipement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(val) => setStatusFilter(val)}
                />
                <Select
                  options={[
                    { value: '7d', label: '7 derniers jours' },
                    { value: '30d', label: '30 derniers jours' },
                    { value: '90d', label: '90 derniers jours' }
                  ]}
                  value={timeRange}
                  onChange={(val) => setTimeRange(val)}
                />
              </div>

              <div className="flex items-center gap-2">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === t.id ? 'bg-primary text-primary-foreground' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <Icon name={t.icon} size={16} /> <span className="ml-2 hidden sm:inline">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content by tab */}
          <div>
            {activeTab === 'equipment' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEquipment.map(eq => (
                  <EquipmentCard
                    key={eq.id}
                    equipment={eq}
                    onViewDetails={onViewDetails}
                    onScheduleMaintenance={onScheduleMaintenance}
                  />
                ))}
              </div>
            )}

            {activeTab === 'performance' && (
              <PerformanceDashboard />
            )}

            {activeTab === 'ai' && (
              <AIInsightsPanel />
            )}

            {activeTab === 'history' && (
              <MaintenanceHistory history={maintenanceHistory} />
            )}
          </div>
        </div>
      </main>

      {/* Scheduler modal */}
      {showScheduler && (
        <MaintenanceScheduler
          equipment={selectedEquipment}
          onClose={() => setShowScheduler(false)}
        />
      )}
    </div>
  );
};

export default MaintenancePredictive;