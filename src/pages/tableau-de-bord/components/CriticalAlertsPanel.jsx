import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CriticalAlertsPanel = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const alertsData = [
    {
      id: 'ALT-001',
      title: 'Autoclave A1 - Température Anormale',
      description: 'Température de stérilisation en dessous du seuil requis (132°C mesuré vs 134°C requis)',
      severity: 'critical',
      category: 'equipment',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      location: 'Zone de Stérilisation - Autoclave A1',
      affectedInstruments: ['SET-ST-001', 'SET-ST-002', 'SET-ST-003'],
      actionRequired: 'Arrêt immédiat du cycle et maintenance technique',
      technician: 'Marie Dubois',
      status: 'active'
    },
    {
      id: 'ALT-002',
      title: 'IRI Élevé - Set Orthopédie B',
      description: 'Indice de Risque Infectieux critique détecté (8.2/10) - Délai de lavage dépassé',
      severity: 'high',
      category: 'compliance',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      location: 'Zone de Lavage - Poste 3',
      affectedInstruments: ['SET-OR-B-001'],
      actionRequired: 'Retraitement complet requis avant stérilisation',
      technician: 'Jean Martin',
      status: 'in-progress'
    },
    {
      id: 'ALT-003',
      title: 'Maintenance Préventive Échue',
      description: 'Laveuse L2 a dépassé l\'intervalle de maintenance préventive (2000h atteintes)',
      severity: 'medium',
      category: 'maintenance',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      location: 'Zone de Lavage - Laveuse L2',
      affectedInstruments: [],
      actionRequired: 'Planifier maintenance dans les 24h',
      technician: null,
      status: 'pending'
    },
    {
      id: 'ALT-004',
      title: 'Certificat Numérique - Échec Génération',
      description: 'Impossible de générer le certificat de stérilisation pour le cycle ST-2024-1031-08',
      severity: 'high',
      category: 'compliance',
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      location: 'Système Central',
      affectedInstruments: ['SET-GYN-001', 'SET-GYN-002'],
      actionRequired: 'Vérification manuelle et re-génération du certificat',
      technician: 'Sophie Laurent',
      status: 'resolved'
    }
  ];

  const severityConfig = {
    critical: {
      label: 'Critique',
      color: 'bg-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: 'AlertCircle'
    },
    high: {
      label: 'Élevé',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: 'AlertTriangle'
    },
    medium: {
      label: 'Moyen',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: 'Info'
    }
  };

  const categoryConfig = {
    equipment: { label: 'Équipement', icon: 'Wrench' },
    compliance: { label: 'Conformité', icon: 'Shield' },
    maintenance: { label: 'Maintenance', icon: 'Settings' }
  };

  const statusConfig = {
    active: { label: 'Actif', color: 'bg-red-100 text-red-700' },
    'in-progress': { label: 'En Cours', color: 'bg-yellow-100 text-yellow-700' },
    pending: { label: 'En Attente', color: 'bg-blue-100 text-blue-700' },
    resolved: { label: 'Résolu', color: 'bg-green-100 text-green-700' }
  };

  const filteredAlerts = filterSeverity === 'all' 
    ? alertsData 
    : alertsData?.filter(alert => alert?.severity === filterSeverity);

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp?.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `il y a ${hours}h ${minutes % 60}min`;
    return `il y a ${minutes}min`;
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Alertes Critiques</h2>
            <p className="text-sm text-muted-foreground">
              Notifications prioritaires nécessitant une action immédiate
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">
                {alertsData?.filter(a => a?.status === 'active')?.length} actives
              </span>
            </div>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filterSeverity === 'all' ?'bg-primary text-primary-foreground' :'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Toutes ({alertsData?.length})
          </button>
          {Object.entries(severityConfig)?.map(([severity, config]) => {
            const count = alertsData?.filter(a => a?.severity === severity)?.length;
            return (
              <button
                key={severity}
                onClick={() => setFilterSeverity(severity)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filterSeverity === severity 
                    ? `${config?.color} text-white` 
                    : `${config?.bgColor} ${config?.textColor} hover:opacity-80`
                }`}
              >
                {config?.label}({count})
                              </button>
            );
          })}
        </div>
      </div>
      {/* Alerts List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-3" />
            <p className="text-muted-foreground">Aucune alerte pour ce niveau de sévérité</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredAlerts?.map((alert) => {
              const severityConf = severityConfig?.[alert?.severity];
              const categoryConf = categoryConfig?.[alert?.category];
              const statusConf = statusConfig?.[alert?.status];
              
              return (
                <div
                  key={alert?.id}
                  className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                    selectedAlert === alert?.id ? 'bg-slate-50' : ''
                  }`}
                  onClick={() => setSelectedAlert(selectedAlert === alert?.id ? null : alert?.id)}
                >
                  <div className="flex items-start gap-3">
                    {/* Severity Indicator */}
                    <div className={`w-8 h-8 ${severityConf?.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Icon name={severityConf?.icon} size={16} color="white" />
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-foreground mb-1">{alert?.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{alert?.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusConf?.color}`}>
                            {statusConf?.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(alert?.timestamp)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name={categoryConf?.icon} size={12} />
                          <span>{categoryConf?.label}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={12} />
                          <span>{alert?.location}</span>
                        </div>
                        {alert?.affectedInstruments?.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Icon name="Package" size={12} />
                            <span>{alert?.affectedInstruments?.length} instruments</span>
                          </div>
                        )}
                      </div>

                      {/* Expanded Details */}
                      {selectedAlert === alert?.id && (
                        <div className="mt-4 p-3 bg-slate-50 rounded-md border border-border">
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-xs font-medium text-foreground mb-1">Action Requise</h4>
                              <p className="text-xs text-muted-foreground">{alert?.actionRequired}</p>
                            </div>
                            
                            {alert?.affectedInstruments?.length > 0 && (
                              <div>
                                <h4 className="text-xs font-medium text-foreground mb-1">Instruments Affectés</h4>
                                <div className="flex flex-wrap gap-1">
                                  {alert?.affectedInstruments?.map((instrument) => (
                                    <span key={instrument} className="px-2 py-1 bg-white text-xs rounded border">
                                      {instrument}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {alert?.technician && (
                              <div>
                                <h4 className="text-xs font-medium text-foreground mb-1">Technicien Assigné</h4>
                                <p className="text-xs text-muted-foreground">{alert?.technician}</p>
                              </div>
                            )}

                            <div className="flex gap-2 pt-2">
                              <Button variant="primary" size="xs">
                                Traiter
                              </Button>
                              <Button variant="outline" size="xs">
                                Assigner
                              </Button>
                              <Button variant="ghost" size="xs">
                                Détails
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-slate-50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {filteredAlerts?.length} alerte{filteredAlerts?.length > 1 ? 's' : ''} affichée{filteredAlerts?.length > 1 ? 's' : ''}
          </span>
          <Button variant="outline" size="xs">
            Voir Toutes les Alertes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CriticalAlertsPanel;