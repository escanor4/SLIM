import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCards = () => {
  const metricsData = [
    {
      id: 'active-cycles',
      title: 'Cycles Actifs',
      value: '8',
      subtitle: '3 en cours, 5 en attente',
      icon: 'Zap',
      color: 'bg-accent',
      trend: { value: '+12%', isPositive: true },
      details: [
        { label: 'Autoclave A1', status: 'En cours - 15 min restantes' },
        { label: 'Autoclave B2', status: 'En cours - 8 min restantes' },
        { label: 'Autoclave C3', status: 'En cours - 22 min restantes' }
      ]
    },
    {
      id: 'maintenance-required',
      title: 'Maintenance Requise',
      value: '4',
      subtitle: '2 urgentes, 2 préventives',
      icon: 'Wrench',
      color: 'bg-warning',
      trend: { value: '+2', isPositive: false },
      details: [
        { label: 'Autoclave A1', status: 'Maintenance préventive - 150h' },
        { label: 'Laveuse L2', status: 'Urgent - Erreur capteur' }
      ]
    },
    {
      id: 'high-risk-alerts',
      title: 'Alertes IRI Élevé',
      value: '3',
      subtitle: 'Risque infectieux détecté',
      icon: 'AlertTriangle',
      color: 'bg-error',
      trend: { value: '-1', isPositive: true },
      details: [
        { label: 'Set Orthopédie B', status: 'IRI: 8.2 - Délai lavage' },
        { label: 'Set Cardiologie A', status: 'IRI: 7.8 - Paramètres cycle' }
      ]
    },
    {
      id: 'daily-throughput',
      title: 'Débit Journalier',
      value: '156',
      subtitle: 'instruments traités aujourd\'hui',
      icon: 'TrendingUp',
      color: 'bg-success',
      trend: { value: '+8%', isPositive: true },
      details: [
        { label: 'Objectif quotidien', status: '180 instruments' },
        { label: 'Moyenne 7 jours', status: '164 instruments/jour' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData?.map((metric) => (
        <div key={metric?.id} className="bg-white rounded-lg border border-border shadow-medical p-6 hover:shadow-medical-lg transition-all duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} color="white" />
            </div>
            <div className={`
              flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
              ${metric?.trend?.isPositive 
                ? 'bg-success/10 text-success' :'bg-error/10 text-error'
              }
            `}>
              <Icon 
                name={metric?.trend?.isPositive ? "TrendingUp" : "TrendingDown"} 
                size={12} 
              />
              <span>{metric?.trend?.value}</span>
            </div>
          </div>

          {/* Main Value */}
          <div className="mb-2">
            <div className="text-3xl font-bold text-foreground">{metric?.value}</div>
            <div className="text-sm text-muted-foreground">{metric?.subtitle}</div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-foreground mb-3">{metric?.title}</h3>

          {/* Details */}
          <div className="space-y-2">
            {metric?.details?.slice(0, 2)?.map((detail, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">{detail?.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{detail?.status}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button className="w-full mt-4 py-2 text-xs font-medium text-primary hover:bg-primary/5 rounded-md transition-colors">
            Voir Détails
          </button>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;