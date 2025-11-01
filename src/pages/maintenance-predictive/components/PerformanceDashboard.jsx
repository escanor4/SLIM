import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceDashboard = ({ equipmentData, timeRange, onTimeRangeChange }) => {
  const [selectedMetric, setSelectedMetric] = useState('efficiency');

  const timeRangeOptions = [
    { value: '7d', label: '7 Jours' },
    { value: '30d', label: '30 Jours' },
    { value: '90d', label: '90 Jours' },
    { value: '1y', label: '1 Année' }
  ];

  const metrics = {
    efficiency: {
      label: 'Efficacité',
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      data: [92, 94, 89, 96, 93, 91, 95]
    },
    uptime: {
      label: 'Temps de Fonctionnement',
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      data: [98, 97, 99, 96, 98, 99, 97]
    },
    temperature: {
      label: 'Température Moyenne',
      icon: 'Thermometer',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      data: [134, 135, 133, 136, 134, 135, 134]
    },
    pressure: {
      label: 'Pression Moyenne',
      icon: 'Gauge',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      data: [2.1, 2.2, 2.0, 2.3, 2.1, 2.2, 2.1]
    }
  };

  const performanceAlerts = [
    {
      id: 1,
      type: 'warning',
      equipment: 'Autoclave A-001',
      message: 'Température légèrement élevée détectée',
      timestamp: '2025-10-31T18:30:00',
      severity: 'Moyenne'
    },
    {
      id: 2,
      type: 'info',
      equipment: 'Autoclave B-002',
      message: 'Maintenance préventive recommandée dans 5 jours',
      timestamp: '2025-10-31T16:15:00',
      severity: 'Faible'
    },
    {
      id: 3,
      type: 'error',
      equipment: 'Autoclave C-003',
      message: 'Anomalie détectée dans les cycles de pression',
      timestamp: '2025-10-31T14:45:00',
      severity: 'Élevée'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const renderSimpleChart = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <div className="flex items-end gap-1 h-16">
        {data?.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`flex-1 ${color} rounded-t-sm transition-all duration-300 hover:opacity-80`}
              style={{ height: `${Math.max(height, 10)}%` }}
              title={`Jour ${index + 1}: ${value}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Tableau de Performance</h2>
          <p className="text-sm text-muted-foreground">
            Analyse des performances en temps réel
          </p>
        </div>
        
        <div className="flex gap-2">
          {timeRangeOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={timeRange === option?.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onTimeRangeChange(option?.value)}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(metrics)?.map(([key, metric]) => (
          <div
            key={key}
            className={`
              p-4 rounded-lg border cursor-pointer transition-all duration-200
              ${selectedMetric === key 
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }
            `}
            onClick={() => setSelectedMetric(key)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 ${metric?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={metric?.icon} size={16} className={metric?.color} />
              </div>
              <div className="text-right">
                <div className={`text-lg font-semibold ${metric?.color}`}>
                  {metric?.data?.[metric?.data?.length - 1]}
                  {key === 'temperature' ? '°C' : key === 'pressure' ? ' bar' : '%'}
                </div>
                <div className="text-xs text-muted-foreground">Actuel</div>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="text-sm font-medium text-foreground">{metric?.label}</div>
            </div>
            
            {renderSimpleChart(metric?.data, metric?.bgColor)}
          </div>
        ))}
      </div>
      {/* Detailed Chart View */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Analyse Détaillée - {metrics?.[selectedMetric]?.label}
          </h3>
          <div className="flex items-center gap-2">
            <Icon name={metrics?.[selectedMetric]?.icon} size={16} className={metrics?.[selectedMetric]?.color} />
            <span className="text-sm text-muted-foreground">Derniers 7 jours</span>
          </div>
        </div>
        
        <div className="h-48 flex items-end gap-4">
          {metrics?.[selectedMetric]?.data?.map((value, index) => {
            const max = Math.max(...metrics?.[selectedMetric]?.data);
            const min = Math.min(...metrics?.[selectedMetric]?.data);
            const range = max - min || 1;
            const height = ((value - min) / range) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="text-xs text-muted-foreground mb-2">
                  {value}
                  {selectedMetric === 'temperature' ? '°C' : selectedMetric === 'pressure' ? 'bar' : '%'}
                </div>
                <div
                  className={`w-full ${metrics?.[selectedMetric]?.bgColor} rounded-t-md transition-all duration-500`}
                  style={{ height: `${Math.max(height, 10)}%` }}
                />
                <div className="text-xs text-muted-foreground mt-2">
                  J{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Performance Alerts */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Alertes de Performance</h3>
            <Button variant="outline" size="sm" iconName="Settings">
              Configurer
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {performanceAlerts?.map((alert) => (
            <div key={alert?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`
                  w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0
                  ${getAlertColor(alert?.type)}
                `}>
                  <Icon name={getAlertIcon(alert?.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{alert?.equipment}</span>
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded
                      ${alert?.severity === 'Élevée' ? 'bg-error/10 text-error' :
                        alert?.severity === 'Moyenne'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {alert?.severity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert?.message}</p>
                  <div className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp)?.toLocaleString('fr-FR')}
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button variant="ghost" size="xs" iconName="Eye" />
                  <Button variant="ghost" size="xs" iconName="X" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;