import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetricsChart = ({ data, type = 'line', title, metric }) => {
  const formatTooltip = (value, name) => {
    if (name === 'efficiency') return [`${value}%`, 'Efficacité'];
    if (name === 'throughput') return [value, 'Débit'];
    if (name === 'compliance') return [`${value}%`, 'Conformité'];
    if (name === 'errorRate') return [`${value}%`, 'Taux d\'Erreur'];
    return [value, name];
  };

  const getMetricColor = (metricType) => {
    switch (metricType) {
      case 'efficiency': return '#2563EB';
      case 'throughput': return '#059669';
      case 'compliance': return '#0EA5E9';
      case 'errorRate': return '#DC2626';
      default: return '#2563EB';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">Évolution sur 30 jours</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-success" />
          <span className="text-sm font-medium text-success">+5.2%</span>
        </div>
      </div>
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => new Date(value)?.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => metric === 'throughput' ? value : `${value}%`}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(value) => new Date(value)?.toLocaleDateString('fr-FR')}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={getMetricColor(metric)}
                strokeWidth={2}
                dot={{ fill: getMetricColor(metric), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: getMetricColor(metric), strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => new Date(value)?.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => metric === 'throughput' ? value : `${value}%`}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(value) => new Date(value)?.toLocaleDateString('fr-FR')}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill={getMetricColor(metric)}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">
            {metric === 'throughput' ? '1,247' : '87.3%'}
          </div>
          <div className="text-xs text-muted-foreground">Moyenne</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-success">
            {metric === 'throughput' ? '1,456' : '94.2%'}
          </div>
          <div className="text-xs text-muted-foreground">Maximum</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-warning">
            {metric === 'throughput' ? '892' : '78.1%'}
          </div>
          <div className="text-xs text-muted-foreground">Minimum</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsChart;