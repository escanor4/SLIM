import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CycleTable = ({ cycles, onViewDetails, onGenerateCertificate, onViewValidation }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (cycleId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(cycleId)) {
      newExpanded?.delete(cycleId);
    } else {
      newExpanded?.add(cycleId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'en-cours': {
        color: 'bg-warning text-warning-foreground',
        icon: 'Clock',
        label: 'En Cours'
      },
      'termine': {
        color: 'bg-accent text-accent-foreground',
        icon: 'CheckCircle',
        label: 'Terminé'
      },
      'valide': {
        color: 'bg-success text-success-foreground',
        icon: 'Shield',
        label: 'Validé'
      },
      'echec': {
        color: 'bg-error text-error-foreground',
        icon: 'AlertCircle',
        label: 'Échec'
      },
      'en-attente': {
        color: 'bg-secondary text-secondary-foreground',
        icon: 'Pause',
        label: 'En Attente'
      }
    };

    const config = statusConfig?.[status] || statusConfig?.['en-attente'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        {config?.label}
      </span>
    );
  };

  const getValidationBadge = (validation) => {
    const validationConfig = {
      'valide': {
        color: 'bg-success text-success-foreground',
        icon: 'CheckCircle2',
        label: 'Validé'
      },
      'echec': {
        color: 'bg-error text-error-foreground',
        icon: 'XCircle',
        label: 'Échec'
      },
      'en-attente': {
        color: 'bg-warning text-warning-foreground',
        icon: 'Clock',
        label: 'En Attente'
      },
      'partiel': {
        color: 'bg-accent text-accent-foreground',
        icon: 'AlertTriangle',
        label: 'Partiel'
      }
    };

    const config = validationConfig?.[validation] || validationConfig?.['en-attente'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        {config?.label}
      </span>
    );
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Hash" size={16} />
                  ID Cycle
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={16} />
                  Équipement
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Package" size={16} />
                  Sets d'Instruments
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  Heure de Début
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Timer" size={16} />
                  Durée
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Activity" size={16} />
                  Statut
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={16} />
                  Validation
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cycles?.map((cycle) => (
              <React.Fragment key={cycle?.id}>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName={expandedRows?.has(cycle?.id) ? "ChevronDown" : "ChevronRight"}
                        onClick={() => toggleRowExpansion(cycle?.id)}
                      />
                      <span className="font-mono text-sm font-medium text-primary">
                        {cycle?.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-foreground">{cycle?.equipment?.name}</div>
                      <div className="text-sm text-muted-foreground">{cycle?.equipment?.location}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{cycle?.instrumentSets?.length}</span>
                      <span className="text-sm text-muted-foreground">sets</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-foreground">
                        {new Date(cycle.startTime)?.toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(cycle.startTime)?.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground">
                      {formatDuration(cycle?.duration)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(cycle?.status)}
                  </td>
                  <td className="px-4 py-3">
                    {getValidationBadge(cycle?.validation?.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Eye"
                        onClick={() => onViewDetails(cycle)}
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="FileText"
                        onClick={() => onGenerateCertificate(cycle)}
                        disabled={cycle?.validation?.status !== 'valide'}
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Shield"
                        onClick={() => onViewValidation(cycle)}
                      />
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row Content */}
                {expandedRows?.has(cycle?.id) && (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 bg-slate-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Parameters */}
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Paramètres du Cycle</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Température:</span>
                              <span className="font-medium">{cycle?.parameters?.temperature}°C</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Pression:</span>
                              <span className="font-medium">{cycle?.parameters?.pressure} bar</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Temps d'exposition:</span>
                              <span className="font-medium">{cycle?.parameters?.exposureTime} min</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Instrument Sets */}
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Sets d'Instruments</h4>
                          <div className="space-y-1">
                            {cycle?.instrumentSets?.slice(0, 3)?.map((set, index) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">{set?.name}</span>
                                <span className="text-muted-foreground ml-2">({set?.count} instruments)</span>
                              </div>
                            ))}
                            {cycle?.instrumentSets?.length > 3 && (
                              <div className="text-sm text-muted-foreground">
                                +{cycle?.instrumentSets?.length - 3} autres sets
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {cycles?.map((cycle) => (
          <div key={cycle?.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-medium text-primary">{cycle?.id}</span>
              <div className="flex items-center gap-2">
                {getStatusBadge(cycle?.status)}
                {getValidationBadge(cycle?.validation?.status)}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">{cycle?.equipment?.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon name="Package" size={16} className="text-muted-foreground" />
                <span className="text-sm">{cycle?.instrumentSets?.length} sets d'instruments</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  {new Date(cycle.startTime)?.toLocaleDateString('fr-FR')} à {' '}
                  {new Date(cycle.startTime)?.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon name="Timer" size={16} className="text-muted-foreground" />
                <span className="text-sm">{formatDuration(cycle?.duration)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewDetails(cycle)}
              >
                Détails
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="FileText"
                iconPosition="left"
                onClick={() => onGenerateCertificate(cycle)}
                disabled={cycle?.validation?.status !== 'valide'}
              >
                Certificat
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CycleTable;