import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');

  const quickActions = [
    {
      id: 'scan-instrument',
      title: 'Scanner Instrument',
      description: 'Scan RFID/DataMatrix rapide',
      icon: 'Scan',
      color: 'bg-primary',
      shortcut: 'Ctrl+S',
      action: () => console.log('Scanner instrument')
    },
    {
      id: 'new-cycle',
      title: 'Nouveau Cycle',
      description: 'Démarrer un cycle de stérilisation',
      icon: 'Play',
      color: 'bg-accent',
      shortcut: 'Ctrl+N',
      action: () => console.log('Nouveau cycle')
    },
    {
      id: 'emergency-alert',
      title: 'Alerte d\'Urgence',
      description: 'Signaler un problème critique',
      icon: 'AlertTriangle',
      color: 'bg-error',
      shortcut: 'Ctrl+E',
      action: () => setShowEmergencyModal(true)
    },
    {
      id: 'maintenance-request',
      title: 'Demande Maintenance',
      description: 'Planifier une intervention',
      icon: 'Wrench',
      color: 'bg-warning',
      shortcut: 'Ctrl+M',
      action: () => console.log('Demande maintenance')
    }
  ];

  const emergencyTypes = [
    {
      id: 'equipment-failure',
      title: 'Panne Équipement',
      description: 'Autoclave, laveuse ou autre équipement défaillant',
      icon: 'AlertCircle',
      severity: 'critical'
    },
    {
      id: 'contamination-risk',
      title: 'Risque de Contamination',
      description: 'Suspicion de contamination croisée',
      icon: 'Shield',
      severity: 'high'
    },
    {
      id: 'safety-incident',
      title: 'Incident de Sécurité',
      description: 'Accident ou situation dangereuse',
      icon: 'AlertTriangle',
      severity: 'high'
    },
    {
      id: 'system-error',
      title: 'Erreur Système',
      description: 'Problème logiciel ou de traçabilité',
      icon: 'Bug',
      severity: 'medium'
    }
  ];

  const recentShortcuts = [
    {
      id: 'view-alerts',
      title: 'Voir Alertes',
      path: '/alertes',
      icon: 'Bell',
      count: 3
    },
    {
      id: 'instrument-tracking',
      title: 'Suivi Instruments',
      path: '/suivi-des-instruments',
      icon: 'Package',
      count: 156
    },
    {
      id: 'reports',
      title: 'Rapports',
      path: '/rapports',
      icon: 'FileText',
      count: 0
    },
    {
      id: 'settings',
      title: 'Paramètres',
      path: '/parametres',
      icon: 'Settings',
      count: 0
    }
  ];

  const handleEmergencySubmit = (type) => {
    console.log('Emergency alert submitted:', type);
    setShowEmergencyModal(false);
    setEmergencyType('');
    // Here you would typically send the emergency alert to the system
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-border shadow-medical p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Actions Rapides</h2>
          <p className="text-sm text-muted-foreground">
            Accès direct aux fonctions essentielles du CSSD
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="group relative p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-medical transition-all duration-200 text-left"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={action?.icon} size={20} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground mb-1">{action?.title}</h3>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <Icon name="Command" size={10} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{action?.shortcut}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Recent Shortcuts */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Raccourcis Récents</h3>
          <div className="space-y-2">
            {recentShortcuts?.map((shortcut) => (
              <button
                key={shortcut?.id}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-left"
              >
                <Icon name={shortcut?.icon} size={16} className="text-muted-foreground" />
                <span className="flex-1 text-sm text-foreground">{shortcut?.title}</span>
                {shortcut?.count > 0 && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
                    {shortcut?.count}
                  </span>
                )}
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* System Status Indicator */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Système Opérationnel</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Dernière sync:</span>
              <span className="text-xs font-medium text-foreground">
                {new Date()?.toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Alert Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-400 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowEmergencyModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-error rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={18} color="white" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Alerte d'Urgence</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="X" 
                onClick={() => setShowEmergencyModal(false)} 
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Sélectionnez le type d'urgence pour déclencher l'alerte appropriée
              </p>

              <div className="space-y-3">
                {emergencyTypes?.map((type) => (
                  <button
                    key={type?.id}
                    onClick={() => setEmergencyType(type?.id)}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${emergencyType === type?.id 
                        ? 'border-error bg-error/5' :'border-border hover:border-error/50'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <Icon name={type?.icon} size={20} className="text-error mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-foreground mb-1">{type?.title}</h3>
                        <p className="text-xs text-muted-foreground">{type?.description}</p>
                        <span className={`
                          inline-block mt-2 px-2 py-1 text-xs font-medium rounded-md
                          ${type?.severity === 'critical' ?'bg-red-100 text-red-700' 
                            : type?.severity === 'high' ?'bg-orange-100 text-orange-700' :'bg-yellow-100 text-yellow-700'
                          }
                        `}>
                          {type?.severity === 'critical' ? 'Critique' : 
                           type?.severity === 'high' ? 'Élevé' : 'Moyen'}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-border">
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => setShowEmergencyModal(false)}
              >
                Annuler
              </Button>
              <Button 
                variant="destructive" 
                fullWidth 
                disabled={!emergencyType}
                onClick={() => handleEmergencySubmit(emergencyType)}
              >
                Déclencher Alerte
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionsPanel;