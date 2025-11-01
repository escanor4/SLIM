import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
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

  // Mock data for equipment
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
      avgPressure: 2.3,
      avgCycleDuration: 48,
      alerts: [
        'Température légèrement élevée détectée',
        'Maintenance préventive recommandée'
      ]
    },
    {
      id: 'AC-003',
      name: 'Autoclave de Secours C',
      model: 'Tuttnauer 5075EA',
      status: 'Critique',
      riskScore: 89,
      icon: 'Zap',
      cyclesCompleted: 2156,
      efficiency: 76,
      uptime: 87.3,
      errorCount: 15,
      nextMaintenance: '2025-11-02T08:00:00',
      avgTemperature: 138.1,
      avgPressure: 2.5,
      avgCycleDuration: 52,
      alerts: [
        'Anomalie critique détectée dans les cycles de pression',
        'Intervention immédiate requise',
        'Efficacité en baisse constante'
      ]
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

  // Mock data for AI insights
  const aiInsights = [
    {
      id: 1,
      type: 'prediction',
      priority: 'elevee',
      title: 'Risque de Panne Prédit - Autoclave C',
      description: 'Le modèle IA prédit une probabilité de 78% de panne dans les 5 prochains jours basée sur l\'analyse des courbes de température et pression.',
      confidence: 78,
      impact: 'Élevé',
      timestamp: '2025-10-31T18:45:00',
      details: {
        analysis: [
          'Déviations répétées des paramètres de température (+3°C au-dessus de la normale)',
          'Cycles de pression irréguliers détectés dans 23% des cycles récents',
          'Augmentation progressive du temps de cycle (+15% en 2 semaines)',
          'Corrélation avec les patterns de panne historiques (similarité: 89%)'
        ],
        recommendations: [
          { action: 'Inspection immédiate des joints et valves', timeline: 'Aujourd\'hui' },
          { action: 'Calibration des capteurs de température', timeline: '2-3 jours' },
          { action: 'Remplacement préventif des composants critiques', timeline: '1 semaine' }
        ],
        affectedEquipment: ['AC-003']
      }
    },
    {
      id: 2,
      type: 'optimization',
      priority: 'moyenne',
      title: 'Optimisation des Cycles de Stérilisation',
      description: 'Analyse des patterns d\'utilisation suggère une réorganisation des cycles pour améliorer l\'efficacité énergétique de 12%.',
      confidence: 85,
      impact: 'Moyen',
      timestamp: '2025-10-31T16:30:00',
      details: {
        analysis: [
          'Pics d\'utilisation identifiés entre 8h-10h et 14h-16h',
          'Périodes de sous-utilisation détectées entre 11h-13h',
          'Consommation énergétique optimisable par regroupement des cycles',
          'Potentiel d\'économie: 450€/mois en coûts énergétiques'
        ],
        recommendations: [
          { action: 'Regrouper les cycles courts en périodes creuses', timeline: 'Cette semaine' },
          { action: 'Programmer les cycles longs pendant les heures de nuit', timeline: 'Immédiat' },
          { action: 'Ajuster les paramètres de veille automatique', timeline: '2-3 jours' }
        ],
        affectedEquipment: ['AC-001', 'AC-002']
      }
    },
    {
      id: 3,
      type: 'anomaly',
      priority: 'critique',
      title: 'Anomalie Détectée - Laveur WD-001',
      description: 'Comportement anormal détecté dans les cycles de rinçage avec une augmentation de 25% de la consommation d\'eau.',
      confidence: 92,
      impact: 'Élevé',
      timestamp: '2025-10-31T14:15:00',
      details: {
        analysis: [
          'Consommation d\'eau anormalement élevée depuis 3 jours',
          'Durée des cycles de rinçage augmentée de 8 minutes en moyenne',
          'Possible fuite ou dysfonctionnement des électrovannes',
          'Impact environnemental et financier significatif'
        ],
        recommendations: [
          { action: 'Vérification immédiate du système hydraulique', timeline: 'Aujourd\'hui' },
          { action: 'Test des électrovannes et capteurs de débit', timeline: 'Demain' },
          { action: 'Inspection des joints et raccordements', timeline: '2 jours' }
        ],
        affectedEquipment: ['WD-001']
      }
    },
    {
      id: 4,
      type: 'recommendation',
      priority: 'faible',
      title: 'Mise à Jour Firmware Recommandée',
      description: 'Nouvelle version firmware disponible pour les autoclaves Steris avec améliorations de sécurité et performance.',
      confidence: 95,
      impact: 'Faible',
      timestamp: '2025-10-31T12:00:00',
      details: {
        analysis: [
          'Version 3.2.1 disponible avec correctifs de sécurité',
          'Améliorations des algorithmes de contrôle température',
          'Nouvelles fonctionnalités de diagnostic automatique',
          'Compatibilité vérifiée avec les modèles actuels'
        ],
        recommendations: [
          { action: 'Planifier la mise à jour pendant maintenance', timeline: '1-2 semaines' },
          { action: 'Sauvegarder les paramètres actuels', timeline: 'Avant mise à jour' },
          { action: 'Former les techniciens aux nouvelles fonctionnalités', timeline: 'Après mise à jour' }
        ],
        affectedEquipment: ['AC-001', 'AC-003']
      }
    }
  ];

  // Mock data for maintenance history
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
      createdAt: '2025-10-25T14:00:00'
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
    },
    {
      id: 'MH-003',
      equipmentName: 'Séchoir Haute Performance',
      type: 'calibration',
      status: 'planifiee',
      priority: 'normale',
      description: 'Calibration annuelle des capteurs de température',
      technician: 'Pierre Durand',
      scheduledDate: '2025-11-05T14:00:00',
      duration: 1.5,
      cost: 195.00,
      partsUsed: [],
      notes: 'Calibration programmée selon planning annuel.',
      createdAt: '2025-10-20T10:00:00'
    },
    {
      id: 'MH-004',
      equipmentName: 'Autoclave Secondaire B',
      type: 'inspection',
      status: 'terminee',
      priority: 'critique',
      description: 'Inspection réglementaire annuelle - Contrôle APAVE',
      technician: 'Sophie Leroy',
      scheduledDate: '2025-10-15T10:00:00',
      completedAt: '2025-10-15T16:00:00',
      duration: 6,
      cost: 890.00,
      partsUsed: ['Certificat de conformité'],
      notes: 'Inspection réussie. Certificat de conformité délivré. Validité: 1 an.',
      createdAt: '2025-09-30T09:00:00'
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
    { id: 'insights', label: 'Insights IA', icon: 'Brain' },
    { id: 'history', label: 'Historique', icon: 'Clock' }
  ];

  const filteredEquipment = equipmentData?.filter(equipment => {
    const matchesSearch = equipment?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         equipment?.model?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || equipment?.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (equipment) => {
    setSelectedEquipment(equipment);
    // In a real app, this would navigate to a detailed view
    console.log('Viewing details for:', equipment);
  };

  const handleScheduleMaintenance = (equipment) => {
    setSelectedEquipment(equipment);
    setShowScheduler(true);
  };

  const handleScheduleComplete = (maintenanceOrder) => {
    console.log('Maintenance scheduled:', maintenanceOrder);
    setShowScheduler(false);
    setSelectedEquipment(null);
    // In a real app, this would update the backend and refresh data
  };

  const handleRefreshInsights = () => {
    console.log('Refreshing AI insights...');
    // In a real app, this would fetch new insights from the AI service
  };

  const handleExportHistory = () => {
    console.log('Exporting maintenance history...');
    // In a real app, this would generate and download a report
  };

  const handleViewHistoryDetails = (historyItem) => {
    console.log('Viewing history details:', historyItem);
    // In a real app, this would show detailed maintenance report
  };

  // Calculate summary statistics
  const totalEquipment = equipmentData?.length;
  const criticalEquipment = equipmentData?.filter(eq => eq?.status === 'Critique')?.length;
  const attentionEquipment = equipmentData?.filter(eq => eq?.status === 'Attention')?.length;
  const averageRiskScore = Math.round(equipmentData?.reduce((sum, eq) => sum + eq?.riskScore, 0) / totalEquipment);
  const totalAlerts = equipmentData?.reduce((sum, eq) => sum + (eq?.alerts?.length || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-medical">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Wrench" size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Maintenance Prédictive</h1>
                <p className="text-sm text-muted-foreground">
                  IA et maintenance préventive
                </p>
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
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{totalEquipment}</div>
                <div className="text-xs text-muted-foreground">Équipements</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={16} className="text-error" />
              </div>
              <div>
                <div className="text-2xl font-bold text-error">{criticalEquipment}</div>
                <div className="text-xs text-muted-foreground">Critiques</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={16} className="text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{attentionEquipment}</div>
                <div className="text-xs text-muted-foreground">Attention</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={16} className="text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{averageRiskScore}%</div>
                <div className="text-xs text-muted-foreground">Risque Moyen</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Bell" size={16} className="text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{totalAlerts}</div>
                <div className="text-xs text-muted-foreground">Alertes Actives</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-all duration-200
                ${activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'equipment' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted rounded-lg">
              <Input
                placeholder="Rechercher un équipement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="sm:flex-1"
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Filtrer par statut"
                className="sm:w-48"
              />
            </div>

            {/* Equipment Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEquipment?.map((equipment) => (
                <EquipmentCard
                  key={equipment?.id}
                  equipment={equipment}
                  onViewDetails={handleViewDetails}
                  onScheduleMaintenance={handleScheduleMaintenance}
                />
              ))}
            </div>

            {filteredEquipment?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Aucun équipement trouvé</h3>
                <p className="text-muted-foreground">
                  Essayez de modifier vos critères de recherche.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <PerformanceDashboard
            equipmentData={equipmentData}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        )}

        {activeTab === 'insights' && (
          <AIInsightsPanel
            insights={aiInsights}
            onRefreshInsights={handleRefreshInsights}
          />
        )}

        {activeTab === 'history' && (
          <MaintenanceHistory
            history={maintenanceHistory}
            onViewDetails={handleViewHistoryDetails}
            onExport={handleExportHistory}
          />
        )}
      </div>
      {/* Maintenance Scheduler Modal */}
      {showScheduler && (
        <MaintenanceScheduler
          equipment={selectedEquipment || equipmentData?.[0]}
          onSchedule={handleScheduleComplete}
          onClose={() => {
            setShowScheduler(false);
            setSelectedEquipment(null);
          }}
        />
      )}
    </div>
  );
};

export default MaintenancePredictive;