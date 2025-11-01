import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CycleDetailsModal = ({ cycle, onClose, onGenerateCertificate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'en-cours': { color: 'bg-warning text-warning-foreground', icon: 'Clock', label: 'En Cours' },
      'termine': { color: 'bg-accent text-accent-foreground', icon: 'CheckCircle', label: 'Terminé' },
      'valide': { color: 'bg-success text-success-foreground', icon: 'Shield', label: 'Validé' },
      'echec': { color: 'bg-error text-error-foreground', icon: 'AlertCircle', label: 'Échec' },
      'en-attente': { color: 'bg-secondary text-secondary-foreground', icon: 'Pause', label: 'En Attente' }
    };

    const config = statusConfig?.[status] || statusConfig?.['en-attente'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={14} />
        {config?.label}
      </span>
    );
  };

  // Mock temperature and pressure data for visualization
  const mockCurveData = {
    temperature: [
      { time: 0, value: 20 }, { time: 5, value: 45 }, { time: 10, value: 80 },
      { time: 15, value: 120 }, { time: 20, value: 134 }, { time: 25, value: 134 },
      { time: 30, value: 134 }, { time: 35, value: 134 }, { time: 40, value: 120 },
      { time: 45, value: 80 }, { time: 50, value: 45 }, { time: 55, value: 25 }
    ],
    pressure: [
      { time: 0, value: 0 }, { time: 5, value: 0.5 }, { time: 10, value: 1.2 },
      { time: 15, value: 1.8 }, { time: 20, value: 2.1 }, { time: 25, value: 2.1 },
      { time: 30, value: 2.1 }, { time: 35, value: 2.1 }, { time: 40, value: 1.8 },
      { time: 45, value: 1.0 }, { time: 50, value: 0.3 }, { time: 55, value: 0 }
    ]
  };

  const renderCurveVisualization = (data, label, unit, color) => {
    const maxValue = Math.max(...data?.map(d => d?.value));
    const maxTime = Math.max(...data?.map(d => d?.time));
    
    return (
      <div className="bg-white border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Icon name="TrendingUp" size={16} className={color} />
          Courbe de {label}
        </h4>
        <div className="relative h-48 bg-slate-50 rounded-lg p-4">
          <svg className="w-full h-full" viewBox="0 0 400 160">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="32" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="400" height="160" fill="url(#grid)" />
            
            {/* Curve */}
            <polyline
              fill="none"
              stroke={color === 'text-red-500' ? '#ef4444' : '#3b82f6'}
              strokeWidth="2"
              points={data?.map((point, index) => 
                `${(point?.time / maxTime) * 380 + 10},${160 - (point?.value / maxValue) * 140 - 10}`
              )?.join(' ')}
            />
            
            {/* Data points */}
            {data?.map((point, index) => (
              <circle
                key={index}
                cx={(point?.time / maxTime) * 380 + 10}
                cy={160 - (point?.value / maxValue) * 140 - 10}
                r="3"
                fill={color === 'text-red-500' ? '#ef4444' : '#3b82f6'}
              />
            ))}
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
            0 min
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {maxTime} min
          </div>
          <div className="absolute top-2 left-2 text-xs text-muted-foreground">
            {maxValue} {unit}
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground text-center">
          Temps (minutes) vs {label} ({unit})
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Détails du Cycle</h2>
              <p className="text-sm text-muted-foreground">
                Cycle {cycle?.id} - {cycle?.equipment?.name}
              </p>
            </div>
            {getStatusBadge(cycle?.status)}
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'overview' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Info" size={16} />
              Vue d'Ensemble
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('parameters')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'parameters' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Settings" size={16} />
              Paramètres
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('curves')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'curves' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} />
              Courbes de Suivi
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('instruments')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'instruments' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Package" size={16} />
              Instruments
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cycle Information */}
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    Informations du Cycle
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID du Cycle:</span>
                      <span className="font-mono font-medium">{cycle?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Équipement:</span>
                      <span className="font-medium">{cycle?.equipment?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emplacement:</span>
                      <span className="font-medium">{cycle?.equipment?.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Heure de Début:</span>
                      <span className="font-medium">
                        {new Date(cycle.startTime)?.toLocaleString('fr-FR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée:</span>
                      <span className="font-medium">{formatDuration(cycle?.duration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Opérateur:</span>
                      <span className="font-medium">{cycle?.operator || 'Marie Dubois'}</span>
                    </div>
                  </div>
                </div>

                {/* Validation Status */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Shield" size={18} />
                    Statut de Validation
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Indicateur Chimique:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        cycle?.validation?.chemicalIndicator?.result === 'valide' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                      }`}>
                        {cycle?.validation?.chemicalIndicator?.result || 'En Attente'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Indicateur Biologique:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        cycle?.validation?.biologicalIndicator?.result === 'valide' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                      }`}>
                        {cycle?.validation?.biologicalIndicator?.result || 'En Attente'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-muted-foreground font-medium">Statut Global:</span>
                      {getStatusBadge(cycle?.validation?.status)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Zap" size={18} />
                    Actions Rapides
                  </h3>
                  
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      iconName="FileText"
                      iconPosition="left"
                      fullWidth
                      onClick={() => onGenerateCertificate(cycle)}
                      disabled={cycle?.validation?.status !== 'valide'}
                    >
                      Générer le Certificat
                    </Button>
                    
                    <Button
                      variant="outline"
                      iconName="Download"
                      iconPosition="left"
                      fullWidth
                    >
                      Télécharger le Rapport
                    </Button>
                    
                    <Button
                      variant="outline"
                      iconName="Printer"
                      iconPosition="left"
                      fullWidth
                    >
                      Imprimer les Détails
                    </Button>
                    
                    <Button
                      variant="outline"
                      iconName="Share"
                      iconPosition="left"
                      fullWidth
                    >
                      Partager le Cycle
                    </Button>
                  </div>
                </div>

                {/* Alerts */}
                {cycle?.status === 'echec' && (
                  <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="AlertTriangle" size={16} className="text-error" />
                      <span className="font-medium text-error">Cycle Échoué</span>
                    </div>
                    <p className="text-sm text-error/80">
                      Ce cycle a échoué et nécessite une attention immédiate. 
                      Vérifiez les paramètres et l'équipement avant de relancer.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Parameters Tab */}
          {activeTab === 'parameters' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Thermometer" size={18} />
                  Température
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cible:</span>
                    <span className="font-medium">{cycle?.parameters?.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Atteinte:</span>
                    <span className="font-medium text-success">{cycle?.parameters?.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Écart Max:</span>
                    <span className="font-medium">±0.5°C</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Gauge" size={18} />
                  Pression
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cible:</span>
                    <span className="font-medium">{cycle?.parameters?.pressure} bar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Atteinte:</span>
                    <span className="font-medium text-success">{cycle?.parameters?.pressure} bar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Écart Max:</span>
                    <span className="font-medium">±0.1 bar</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Clock" size={18} />
                  Temps
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exposition:</span>
                    <span className="font-medium">{cycle?.parameters?.exposureTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Séchage:</span>
                    <span className="font-medium">{cycle?.parameters?.dryingTime || 20} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">{formatDuration(cycle?.duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Curves Tab */}
          {activeTab === 'curves' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderCurveVisualization(mockCurveData?.temperature, 'Température', '°C', 'text-red-500')}
                {renderCurveVisualization(mockCurveData?.pressure, 'Pression', 'bar', 'text-blue-500')}
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Analyse des Courbes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Température</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Montée en température: 20 minutes</li>
                      <li>• Maintien à 134°C: 15 minutes</li>
                      <li>• Refroidissement: 20 minutes</li>
                      <li>• Écart maximum: ±0.3°C</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Pression</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Montée en pression: 20 minutes</li>
                      <li>• Maintien à 2.1 bar: 15 minutes</li>
                      <li>• Dépressurisation: 20 minutes</li>
                      <li>• Écart maximum: ±0.05 bar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instruments Tab */}
          {activeTab === 'instruments' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cycle?.instrumentSets?.map((set, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{set?.name}</h4>
                        <p className="text-sm text-muted-foreground">{set?.category}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Instruments:</span>
                        <span className="font-medium">{set?.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Code Set:</span>
                        <span className="font-mono text-xs">{set?.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Statut:</span>
                        <span className="text-success font-medium">Stérilisé</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          {cycle?.validation?.status === 'valide' && (
            <Button
              variant="primary"
              iconName="FileText"
              iconPosition="left"
              onClick={() => onGenerateCertificate(cycle)}
            >
              Générer le Certificat
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CycleDetailsModal;