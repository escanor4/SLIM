import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EquipmentCard = ({ equipment, onViewDetails, onScheduleMaintenance }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Optimal': return 'text-success bg-success/10 border-success/20';
      case 'Attention': return 'text-warning bg-warning/10 border-warning/20';
      case 'Critique': return 'text-error bg-error/10 border-error/20';
      case 'Maintenance': return 'text-secondary bg-secondary/10 border-secondary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-error';
    if (score >= 60) return 'text-warning';
    if (score >= 40) return 'text-accent';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical hover:shadow-medical-lg transition-all duration-200">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={equipment?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{equipment?.name}</h3>
                <p className="text-sm text-muted-foreground">{equipment?.model}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(equipment?.status)}`}>
                {equipment?.status}
              </span>
              <span className="text-xs text-muted-foreground">
                ID: {equipment?.id}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-2xl font-bold ${getRiskScoreColor(equipment?.riskScore)}`}>
              {equipment?.riskScore}%
            </div>
            <div className="text-xs text-muted-foreground">Score de Risque</div>
          </div>
        </div>
      </div>
      {/* Metrics */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{equipment?.cyclesCompleted}</div>
            <div className="text-xs text-muted-foreground">Cycles Réalisés</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{equipment?.efficiency}%</div>
            <div className="text-xs text-muted-foreground">Efficacité</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{equipment?.uptime}%</div>
            <div className="text-xs text-muted-foreground">Temps de Fonct.</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{equipment?.errorCount}</div>
            <div className="text-xs text-muted-foreground">Erreurs</div>
          </div>
        </div>

        {/* Next Maintenance */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Prochaine Maintenance</span>
          </div>
          <span className={`text-sm font-medium ${
            new Date(equipment.nextMaintenance) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
              ? 'text-warning' :'text-muted-foreground'
          }`}>
            {new Date(equipment.nextMaintenance)?.toLocaleDateString('fr-FR')}
          </span>
        </div>

        {/* Performance Indicators */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Température Moyenne</span>
            <span className="font-medium text-foreground">{equipment?.avgTemperature}°C</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pression Moyenne</span>
            <span className="font-medium text-foreground">{equipment?.avgPressure} bar</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Durée Cycle Moy.</span>
            <span className="font-medium text-foreground">{equipment?.avgCycleDuration} min</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(equipment)}
            className="flex-1"
          >
            Détails
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconName="Wrench"
            iconPosition="left"
            onClick={() => onScheduleMaintenance(equipment)}
            className="flex-1"
          >
            Planifier
          </Button>
        </div>
      </div>
      {/* Alerts */}
      {equipment?.alerts && equipment?.alerts?.length > 0 && (
        <div className="p-4 border-t border-border bg-warning/5">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Alertes Actives</span>
          </div>
          <div className="space-y-1">
            {equipment?.alerts?.slice(0, 2)?.map((alert, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                • {alert}
              </div>
            ))}
            {equipment?.alerts?.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{equipment?.alerts?.length - 2} autres alertes
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentCard;