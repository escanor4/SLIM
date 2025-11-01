import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const CertificateGenerationPanel = ({ 
  onGenerateCertificate, 
  availableCycles,
  isGenerating = false 
}) => {
  const [selectedCycle, setSelectedCycle] = useState('');
  const [showCycleDetails, setShowCycleDetails] = useState(false);
  const [validationResults, setValidationResults] = useState({
    chemicalIndicator: '',
    biologicalIndicator: '',
    physicalParameters: ''
  });

  const handleGenerateCertificate = () => {
    if (!selectedCycle) return;
    
    const cycleData = availableCycles?.find(cycle => cycle?.id === selectedCycle);
    const certificateData = {
      cycleId: selectedCycle,
      cycleData,
      validationResults,
      generatedAt: new Date()?.toISOString(),
      generatedBy: 'Marie Dubois'
    };
    
    onGenerateCertificate(certificateData);
  };

  const selectedCycleData = availableCycles?.find(cycle => cycle?.id === selectedCycle);

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Génération de Certificat
          </h3>
          <p className="text-sm text-muted-foreground">
            Créer un certificat numérique à partir d'un cycle validé
          </p>
        </div>
      </div>
      {/* Cycle Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Sélectionner un cycle de stérilisation
          </label>
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isGenerating}
          >
            <option value="">Choisir un cycle...</option>
            {availableCycles?.map(cycle => (
              <option key={cycle?.id} value={cycle?.id}>
                {cycle?.id} - {cycle?.instrumentSet} ({cycle?.completedAt})
              </option>
            ))}
          </select>
        </div>

        {/* Cycle Details */}
        {selectedCycleData && (
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Détails du Cycle</h4>
              <Button
                variant="ghost"
                size="sm"
                iconName={showCycleDetails ? "ChevronUp" : "ChevronDown"}
                onClick={() => setShowCycleDetails(!showCycleDetails)}
              >
                {showCycleDetails ? 'Masquer' : 'Afficher'}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">ID Cycle:</span>
                <span className="ml-2 font-mono">{selectedCycleData?.id}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Set d'Instruments:</span>
                <span className="ml-2">{selectedCycleData?.instrumentSet}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Température:</span>
                <span className="ml-2">{selectedCycleData?.temperature}°C</span>
              </div>
              <div>
                <span className="text-muted-foreground">Durée:</span>
                <span className="ml-2">{selectedCycleData?.duration} min</span>
              </div>
            </div>

            {showCycleDetails && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pression:</span>
                    <span className="ml-2">{selectedCycleData?.pressure} bar</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Technicien:</span>
                    <span className="ml-2">{selectedCycleData?.technician}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Autoclave:</span>
                    <span className="ml-2">{selectedCycleData?.autoclave}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Statut:</span>
                    <span className="ml-2 text-success">Validé</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Validation Results */}
        {selectedCycle && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Résultats de Validation</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Indicateur Chimique
                </label>
                <select
                  value={validationResults?.chemicalIndicator}
                  onChange={(e) => setValidationResults(prev => ({
                    ...prev,
                    chemicalIndicator: e?.target?.value
                  }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Conforme">Conforme</option>
                  <option value="Non Conforme">Non Conforme</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Indicateur Biologique
                </label>
                <select
                  value={validationResults?.biologicalIndicator}
                  onChange={(e) => setValidationResults(prev => ({
                    ...prev,
                    biologicalIndicator: e?.target?.value
                  }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Négatif">Négatif (Conforme)</option>
                  <option value="Positif">Positif (Non Conforme)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Paramètres Physiques
                </label>
                <select
                  value={validationResults?.physicalParameters}
                  onChange={(e) => setValidationResults(prev => ({
                    ...prev,
                    physicalParameters: e?.target?.value
                  }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Conforme">Conforme</option>
                  <option value="Non Conforme">Non Conforme</option>
                </select>
              </div>
            </div>

            {/* Validation Status Summary */}
            {Object.values(validationResults)?.some(result => result) && (
              <div className="bg-muted/30 rounded-lg p-4">
                <h5 className="font-medium text-foreground mb-2">Résumé de Validation</h5>
                <div className="space-y-2 text-sm">
                  {validationResults?.chemicalIndicator && (
                    <div className="flex items-center justify-between">
                      <span>Indicateur Chimique:</span>
                      <span className={`font-medium ${
                        validationResults?.chemicalIndicator === 'Conforme' 
                          ? 'text-success' :'text-error'
                      }`}>
                        {validationResults?.chemicalIndicator}
                      </span>
                    </div>
                  )}
                  {validationResults?.biologicalIndicator && (
                    <div className="flex items-center justify-between">
                      <span>Indicateur Biologique:</span>
                      <span className={`font-medium ${
                        validationResults?.biologicalIndicator === 'Négatif' 
                          ? 'text-success' :'text-error'
                      }`}>
                        {validationResults?.biologicalIndicator}
                      </span>
                    </div>
                  )}
                  {validationResults?.physicalParameters && (
                    <div className="flex items-center justify-between">
                      <span>Paramètres Physiques:</span>
                      <span className={`font-medium ${
                        validationResults?.physicalParameters === 'Conforme' 
                          ? 'text-success' :'text-error'
                      }`}>
                        {validationResults?.physicalParameters}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Generation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Le certificat sera signé numériquement et horodaté
          </div>
          
          <Button
            variant="primary"
            iconName="FileText"
            iconPosition="left"
            onClick={handleGenerateCertificate}
            disabled={!selectedCycle || isGenerating || !Object.values(validationResults)?.every(result => result)}
            loading={isGenerating}
          >
            {isGenerating ? 'Génération...' : 'Générer le Certificat'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerationPanel;