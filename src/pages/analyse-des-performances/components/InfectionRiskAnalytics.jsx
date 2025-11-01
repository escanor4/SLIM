import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const InfectionRiskAnalytics = () => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState(null);

  const riskDistribution = [
    { name: 'Faible', value: 68, color: '#059669', count: 342 },
    { name: 'Modéré', value: 24, color: '#D97706', count: 120 },
    { name: 'Élevé', value: 8, color: '#DC2626', count: 40 }
  ];

  const riskFactors = [
    { factor: 'Délai de Nettoyage', impact: 35, color: '#DC2626' },
    { factor: 'Déviation Paramètres', impact: 28, color: '#D97706' },
    { factor: 'Performance Technicien', impact: 22, color: '#0EA5E9' },
    { factor: 'Équipement Défaillant', impact: 15, color: '#64748B' }
  ];

  const recentAlerts = [
    {
      id: 1,
      instrumentSet: "SET-CARDIO-001",
      riskLevel: "Élevé",
      factors: ["Délai de nettoyage > 4h", "Température sous-optimale"],
      timestamp: "2025-10-31T18:30:00",
      technician: "Pierre Martin",
      status: "En Cours"
    },
    {
      id: 2,
      instrumentSet: "SET-ORTHO-045",
      riskLevel: "Modéré",
      factors: ["Performance technicien", "Pression légèrement basse"],
      timestamp: "2025-10-31T16:15:00",
      technician: "Sophie Dubois",
      status: "Résolu"
    },
    {
      id: 3,
      instrumentSet: "SET-NEURO-012",
      riskLevel: "Élevé",
      factors: ["Équipement défaillant", "Cycle interrompu"],
      timestamp: "2025-10-31T14:45:00",
      technician: "Marc Leroy",
      status: "Escaladé"
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'Faible': return 'text-success';
      case 'Modéré': return 'text-warning';
      case 'Élevé': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBg = (level) => {
    switch (level) {
      case 'Faible': return 'bg-success/10';
      case 'Modéré': return 'bg-warning/10';
      case 'Élevé': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Résolu': return 'text-success';
      case 'En Cours': return 'text-warning';
      case 'Escaladé': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Distribution Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg border border-border shadow-medical p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Distribution des Risques IRI</h3>
              <p className="text-sm text-muted-foreground">Répartition des niveaux de risque</p>
            </div>
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Pourcentage']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {riskDistribution?.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-sm font-medium">{item?.name}</span>
                </div>
                <div className="text-lg font-bold" style={{ color: item?.color }}>
                  {item?.count}
                </div>
                <div className="text-xs text-muted-foreground">{item?.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-white rounded-lg border border-border shadow-medical p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Facteurs de Risque</h3>
              <p className="text-sm text-muted-foreground">Impact sur l'IRI</p>
            </div>
            <Icon name="AlertTriangle" size={20} className="text-warning" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskFactors} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" stroke="#64748B" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="factor" 
                  stroke="#64748B" 
                  fontSize={12}
                  width={120}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Impact']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="impact" 
                  fill="#DC2626"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent High-Risk Alerts */}
      <div className="bg-white rounded-lg border border-border shadow-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Alertes Récentes à Risque Élevé</h3>
            <p className="text-sm text-muted-foreground">Instruments nécessitant une attention immédiate</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="AlertCircle" size={20} className="text-error" />
            <span className="text-sm font-medium text-error">{recentAlerts?.length} alertes actives</span>
          </div>
        </div>

        <div className="space-y-4">
          {recentAlerts?.map((alert) => (
            <div key={alert?.id} className="border border-border rounded-lg p-4 hover:shadow-medical transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBg(alert?.riskLevel)} ${getRiskColor(alert?.riskLevel)}`}>
                    {alert?.riskLevel}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{alert?.instrumentSet}</h4>
                    <p className="text-sm text-muted-foreground">
                      Technicien: {alert?.technician} • {new Date(alert.timestamp)?.toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert?.status)}`}>
                  {alert?.status}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Facteurs de risque identifiés:</p>
                <div className="flex flex-wrap gap-2">
                  {alert?.factors?.map((factor, index) => (
                    <span key={index} className="px-2 py-1 bg-error/10 text-error text-xs rounded-md">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4">
                <button className="flex items-center gap-2 px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                  <Icon name="Eye" size={14} />
                  Voir Détails
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm text-success hover:bg-success/10 rounded-md transition-colors duration-200">
                  <Icon name="CheckCircle" size={14} />
                  Marquer Résolu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfectionRiskAnalytics;