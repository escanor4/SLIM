import React from 'react';
import Icon from '../../../components/AppIcon';

const TechnicianPerformanceCard = ({ technician, onViewDetails }) => {
  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceBg = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 75) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical p-6 hover:shadow-medical-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{technician?.name}</h3>
            <p className="text-sm text-muted-foreground">{technician?.role}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceBg(technician?.overallScore)} ${getPerformanceColor(technician?.overallScore)}`}>
          {technician?.overallScore}%
        </div>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{technician?.processedInstruments}</div>
          <div className="text-xs text-muted-foreground">Instruments Traités</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{technician?.avgProcessingTime}min</div>
          <div className="text-xs text-muted-foreground">Temps Moyen</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${getPerformanceColor(technician?.complianceRate)}`}>
            {technician?.complianceRate}%
          </div>
          <div className="text-xs text-muted-foreground">Conformité</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-error">{technician?.errorCount}</div>
          <div className="text-xs text-muted-foreground">Erreurs</div>
        </div>
      </div>
      {/* Performance Indicators */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Efficacité</span>
          <span className={getPerformanceColor(technician?.efficiency)}>{technician?.efficiency}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${technician?.efficiency >= 90 ? 'bg-success' : technician?.efficiency >= 75 ? 'bg-warning' : 'bg-error'}`}
            style={{ width: `${technician?.efficiency}%` }}
          />
        </div>
      </div>
      {/* Action Button */}
      <button
        onClick={() => onViewDetails(technician)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
      >
        <Icon name="BarChart3" size={16} />
        <span>Voir Détails</span>
      </button>
    </div>
  );
};

export default TechnicianPerformanceCard;