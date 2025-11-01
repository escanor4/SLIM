import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DepartmentMetricsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('throughput');

  const periods = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '90 jours' }
  ];

  const metrics = [
    { value: 'throughput', label: 'Débit', icon: 'Activity' },
    { value: 'utilization', label: 'Utilisation', icon: 'Gauge' },
    { value: 'compliance', label: 'Conformité', icon: 'Shield' },
    { value: 'efficiency', label: 'Efficacité', icon: 'Zap' }
  ];

  const departmentStats = [
    {
      title: "Débit Quotidien",
      value: "1,247",
      unit: "instruments",
      change: "+12.3%",
      trend: "up",
      icon: "Activity",
      color: "text-primary"
    },
    {
      title: "Taux d\'Utilisation",
      value: "87.4%",
      unit: "équipements",
      change: "+5.7%",
      trend: "up",
      icon: "Gauge",
      color: "text-success"
    },
    {
      title: "Conformité Globale",
      value: "94.2%",
      unit: "cycles",
      change: "-1.2%",
      trend: "down",
      icon: "Shield",
      color: "text-warning"
    },
    {
      title: "Efficacité Moyenne",
      value: "89.6%",
      unit: "performance",
      change: "+8.1%",
      trend: "up",
      icon: "Zap",
      color: "text-accent"
    }
  ];

  const throughputData = [
    { date: '2025-10-25', value: 1156, target: 1200 },
    { date: '2025-10-26', value: 1203, target: 1200 },
    { date: '2025-10-27', value: 1089, target: 1200 },
    { date: '2025-10-28', value: 1267, target: 1200 },
    { date: '2025-10-29', value: 1345, target: 1200 },
    { date: '2025-10-30', value: 1298, target: 1200 },
    { date: '2025-10-31', value: 1247, target: 1200 }
  ];

  const equipmentUtilization = [
    { equipment: 'Autoclave A1', utilization: 94, capacity: 100 },
    { equipment: 'Autoclave A2', utilization: 87, capacity: 100 },
    { equipment: 'Autoclave B1', utilization: 92, capacity: 100 },
    { equipment: 'Laveuse L1', utilization: 78, capacity: 100 },
    { equipment: 'Laveuse L2', utilization: 85, capacity: 100 },
    { equipment: 'Séchoir S1', utilization: 71, capacity: 100 }
  ];

  const shiftComparison = [
    { shift: 'Matin (6h-14h)', throughput: 456, efficiency: 92, compliance: 96 },
    { shift: 'Après-midi (14h-22h)', throughput: 523, efficiency: 88, compliance: 94 },
    { shift: 'Nuit (22h-6h)', throughput: 268, efficiency: 85, compliance: 91 }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Métriques Départementales</h2>
          <p className="text-muted-foreground">Vue d'ensemble des performances CSSD</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {periods?.map(period => (
              <option key={period?.value} value={period?.value}>{period?.label}</option>
            ))}
          </select>
          
          <Button variant="outline" iconName="Download" iconPosition="left">
            Exporter
          </Button>
        </div>
      </div>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departmentStats?.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-border shadow-medical p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${getTrendColor(stat?.trend)}`}>
                <Icon name={getTrendIcon(stat?.trend)} size={16} />
                <span>{stat?.change}</span>
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat?.unit}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Throughput Trend */}
        <div className="bg-white rounded-lg border border-border shadow-medical p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Évolution du Débit</h3>
              <p className="text-sm text-muted-foreground">Instruments traités vs objectif</p>
            </div>
            <Icon name="Activity" size={20} className="text-primary" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748B"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value)?.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'value' ? 'Réalisé' : 'Objectif']}
                  labelFormatter={(value) => new Date(value)?.toLocaleDateString('fr-FR')}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stackId="1"
                  stroke="#94A3B8" 
                  fill="#94A3B8"
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stackId="2"
                  stroke="#2563EB" 
                  fill="#2563EB"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Equipment Utilization */}
        <div className="bg-white rounded-lg border border-border shadow-medical p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Utilisation des Équipements</h3>
              <p className="text-sm text-muted-foreground">Taux d'utilisation par équipement</p>
            </div>
            <Icon name="Gauge" size={20} className="text-success" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentUtilization} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" domain={[0, 100]} stroke="#64748B" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="equipment" 
                  stroke="#64748B" 
                  fontSize={12}
                  width={80}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Utilisation']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="utilization" 
                  fill="#059669"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Shift Comparison */}
      <div className="bg-white rounded-lg border border-border shadow-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Comparaison par Équipe</h3>
            <p className="text-sm text-muted-foreground">Performance par période de travail</p>
          </div>
          <Icon name="Clock" size={20} className="text-accent" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Équipe</th>
                <th className="text-center py-3 px-4 font-medium text-foreground">Débit</th>
                <th className="text-center py-3 px-4 font-medium text-foreground">Efficacité</th>
                <th className="text-center py-3 px-4 font-medium text-foreground">Conformité</th>
                <th className="text-center py-3 px-4 font-medium text-foreground">Performance</th>
              </tr>
            </thead>
            <tbody>
              {shiftComparison?.map((shift, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4 font-medium text-foreground">{shift?.shift}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-lg font-semibold text-foreground">{shift?.throughput}</div>
                    <div className="text-xs text-muted-foreground">instruments</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className={`text-lg font-semibold ${shift?.efficiency >= 90 ? 'text-success' : shift?.efficiency >= 85 ? 'text-warning' : 'text-error'}`}>
                      {shift?.efficiency}%
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className={`text-lg font-semibold ${shift?.compliance >= 95 ? 'text-success' : shift?.compliance >= 90 ? 'text-warning' : 'text-error'}`}>
                      {shift?.compliance}%
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {shift?.efficiency >= 90 && shift?.compliance >= 95 ? (
                        <Icon name="TrendingUp" size={16} className="text-success" />
                      ) : (
                        <Icon name="Minus" size={16} className="text-warning" />
                      )}
                      <span className="text-sm font-medium">
                        {shift?.efficiency >= 90 && shift?.compliance >= 95 ? 'Excellent' : 
                         shift?.efficiency >= 85 && shift?.compliance >= 90 ? 'Bon' : 'À améliorer'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentMetricsDashboard;