import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = ({ insights, onRefreshInsights }) => {
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    onRefreshInsights();
    setIsRefreshing(false);
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'prediction': return 'Brain';
      case 'optimization': return 'Zap';
      case 'anomaly': return 'AlertTriangle';
      case 'recommendation': return 'Lightbulb';
      default: return 'Info';
    }
  };

  const getInsightColor = (priority) => {
    switch (priority) {
      case 'critique': return 'border-error bg-error/5';
      case 'elevee': return 'border-warning bg-warning/5';
      case 'moyenne': return 'border-accent bg-accent/5';
      case 'faible': return 'border-muted-foreground bg-muted';
      default: return 'border-border bg-card';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critique': return 'text-error bg-error/10';
      case 'elevee': return 'text-warning bg-warning/10';
      case 'moyenne': return 'text-accent bg-accent/10';
      case 'faible': return 'text-muted-foreground bg-muted';
      default: return 'text-foreground bg-card';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Insights IA</h2>
            <p className="text-sm text-muted-foreground">
              Analyse prédictive et recommandations
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          loading={isRefreshing}
          onClick={handleRefresh}
        >
          Actualiser
        </Button>
      </div>
      {/* AI Status */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Cpu" size={16} color="white" />
          </div>
          <div>
            <div className="font-semibold text-foreground">Modèle IA Actif</div>
            <div className="text-sm text-muted-foreground">
              Dernière mise à jour: {new Date()?.toLocaleString('fr-FR')}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">94.7%</div>
            <div className="text-xs text-muted-foreground">Précision</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">1,247</div>
            <div className="text-xs text-muted-foreground">Prédictions</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">15min</div>
            <div className="text-xs text-muted-foreground">Dernière Analyse</div>
          </div>
        </div>
      </div>
      {/* Insights List */}
      <div className="space-y-3">
        {insights?.map((insight) => (
          <div
            key={insight?.id}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${getInsightColor(insight?.priority)}
              ${selectedInsight?.id === insight?.id ? 'ring-2 ring-primary' : ''}
              hover:shadow-medical
            `}
            onClick={() => setSelectedInsight(selectedInsight?.id === insight?.id ? null : insight)}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={getInsightIcon(insight?.type)} size={16} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{insight?.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(insight?.priority)}`}>
                    {insight?.priority}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{insight?.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Confiance: {insight?.confidence}%</span>
                    <span>Impact: {insight?.impact}</span>
                    <span>{new Date(insight.timestamp)?.toLocaleString('fr-FR')}</span>
                  </div>
                  
                  <Icon 
                    name={selectedInsight?.id === insight?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedInsight?.id === insight?.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                {/* Detailed Analysis */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">Analyse Détaillée</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    {insight?.details?.analysis?.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Icon name="ArrowRight" size={12} className="mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">Recommandations</h4>
                  <div className="space-y-2">
                    {insight?.details?.recommendations?.map((rec, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <span className="text-sm text-foreground">{rec?.action}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{rec?.timeline}</span>
                          <Button variant="ghost" size="xs" iconName="ExternalLink" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Affected Equipment */}
                {insight?.details?.affectedEquipment && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Équipements Concernés</h4>
                    <div className="flex flex-wrap gap-2">
                      {insight?.details?.affectedEquipment?.map((equipment, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                        >
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="primary" size="sm" iconName="CheckCircle" iconPosition="left">
                    Appliquer
                  </Button>
                  <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
                    Planifier
                  </Button>
                  <Button variant="ghost" size="sm" iconName="X" iconPosition="left">
                    Ignorer
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Learning Status */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="font-medium text-foreground">Apprentissage Continu</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Données analysées aujourd'hui</span>
            <span className="font-medium text-foreground">2,847 cycles</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nouveaux patterns détectés</span>
            <span className="font-medium text-foreground">3 anomalies</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Précision du modèle</span>
            <span className="font-medium text-success">+2.3% cette semaine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;