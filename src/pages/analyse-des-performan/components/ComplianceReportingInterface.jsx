import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceReportingInterface = () => {
  const [selectedReportType, setSelectedReportType] = useState('audit');
  const [dateRange, setDateRange] = useState({ start: '2025-10-01', end: '2025-10-31' });
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'audit',
      title: 'Rapport d\'Audit Complet',
      description: 'Documentation complète pour audit réglementaire',
      icon: 'FileText',
      estimatedTime: '5-10 min'
    },
    {
      id: 'compliance',
      title: 'Conformité Mensuelle',
      description: 'Synthèse des indicateurs de conformité',
      icon: 'Shield',
      estimatedTime: '2-3 min'
    },
    {
      id: 'performance',
      title: 'Performance Opérationnelle',
      description: 'Métriques d\'efficacité et de productivité',
      icon: 'BarChart3',
      estimatedTime: '3-5 min'
    },
    {
      id: 'traceability',
      title: 'Traçabilité des Instruments',
      description: 'Historique complet des cycles de stérilisation',
      icon: 'Search',
      estimatedTime: '10-15 min'
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: "Audit Trimestriel Q3 2025",
      type: "Audit Complet",
      generatedDate: "2025-10-30T14:30:00",
      generatedBy: "Marie Dubois",
      status: "Complété",
      fileSize: "2.4 MB",
      downloadCount: 12
    },
    {
      id: 2,
      title: "Conformité Octobre 2025",
      type: "Conformité Mensuelle",
      generatedDate: "2025-10-31T09:15:00",
      generatedBy: "Pierre Martin",
      status: "Complété",
      fileSize: "1.8 MB",
      downloadCount: 8
    },
    {
      id: 3,
      title: "Performance Semaine 43",
      type: "Performance Opérationnelle",
      generatedDate: "2025-10-28T16:45:00",
      generatedBy: "Sophie Dubois",
      status: "En Cours",
      fileSize: "0.9 MB",
      downloadCount: 3
    }
  ];

  const complianceMetrics = [
    {
      metric: "Taux de Conformité Global",
      value: "94.2%",
      target: "≥95%",
      status: "warning",
      trend: "stable"
    },
    {
      metric: "Cycles Validés",
      value: "1,247/1,289",
      target: "100%",
      status: "success",
      trend: "up"
    },
    {
      metric: "Documentation Complète",
      value: "98.7%",
      target: "≥98%",
      status: "success",
      trend: "up"
    },
    {
      metric: "Alertes Résolues",
      value: "89/92",
      target: "100%",
      status: "warning",
      trend: "down"
    }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Handle successful generation
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'success': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Generation Section */}
      <div className="bg-white rounded-lg border border-border shadow-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Génération de Rapports</h3>
            <p className="text-sm text-muted-foreground">Créer des rapports de conformité personnalisés</p>
          </div>
          <Icon name="FileText" size={20} className="text-primary" />
        </div>

        {/* Report Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {reportTypes?.map((type) => (
            <div
              key={type?.id}
              onClick={() => setSelectedReportType(type?.id)}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${selectedReportType === type?.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${selectedReportType === type?.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                `}>
                  <Icon name={type?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{type?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{type?.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>Temps estimé: {type?.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Date Range Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date de Début</label>
            <input
              type="date"
              value={dateRange?.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date de Fin</label>
            <input
              type="date"
              value={dateRange?.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Période sélectionnée: {new Date(dateRange.start)?.toLocaleDateString('fr-FR')} - {new Date(dateRange.end)?.toLocaleDateString('fr-FR')}
          </div>
          <Button
            variant="primary"
            loading={isGenerating}
            iconName="Download"
            iconPosition="left"
            onClick={handleGenerateReport}
          >
            {isGenerating ? 'Génération...' : 'Générer le Rapport'}
          </Button>
        </div>
      </div>
      {/* Compliance Metrics Overview */}
      <div className="bg-white rounded-lg border border-border shadow-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Indicateurs de Conformité</h3>
            <p className="text-sm text-muted-foreground">Métriques clés pour la période actuelle</p>
          </div>
          <Icon name="Shield" size={20} className="text-success" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {complianceMetrics?.map((metric, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusBg(metric?.status)} ${getStatusColor(metric?.status)}`}>
                  {metric?.status === 'success' ? 'Conforme' : metric?.status === 'warning' ? 'Attention' : 'Non-conforme'}
                </div>
                <Icon 
                  name={metric?.trend === 'up' ? 'TrendingUp' : metric?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={16} 
                  className={metric?.trend === 'up' ? 'text-success' : metric?.trend === 'down' ? 'text-error' : 'text-muted-foreground'}
                />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
              <div className="text-sm text-muted-foreground mb-1">{metric?.metric}</div>
              <div className="text-xs text-muted-foreground">Objectif: {metric?.target}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Reports */}
      <div className="bg-white rounded-lg border border-border shadow-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Rapports Récents</h3>
            <p className="text-sm text-muted-foreground">Historique des rapports générés</p>
          </div>
          <Button variant="outline" iconName="Archive" iconPosition="left">
            Voir Tout
          </Button>
        </div>

        <div className="space-y-4">
          {recentReports?.map((report) => (
            <div key={report?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-medical transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{report?.title}</h4>
                  <p className="text-sm text-muted-foreground">{report?.type}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span>Généré par {report?.generatedBy}</span>
                    <span>{new Date(report.generatedDate)?.toLocaleDateString('fr-FR')}</span>
                    <span>{report?.fileSize}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  report?.status === 'Complété' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                }`}>
                  {report?.status}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Download" size={12} />
                  <span>{report?.downloadCount}</span>
                </div>
                <Button variant="ghost" size="sm" iconName="Download">
                  Télécharger
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceReportingInterface;