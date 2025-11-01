import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkOperationsPanel = ({ 
  selectedCertificates, 
  onBulkDownload, 
  onBulkLink, 
  onBulkExport,
  onClearSelection 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  if (selectedCertificates?.length === 0) return null;

  const handleBulkDownload = async () => {
    setIsProcessing(true);
    try {
      await onBulkDownload(selectedCertificates);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkLink = async () => {
    setIsProcessing(true);
    try {
      await onBulkLink(selectedCertificates);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkExport = async (format) => {
    setIsProcessing(true);
    try {
      await onBulkExport(selectedCertificates, format);
    } finally {
      setIsProcessing(false);
      setShowExportOptions(false);
    }
  };

  const exportFormats = [
    { id: 'pdf', label: 'PDF Consolidé', icon: 'FileText', description: 'Un seul fichier PDF avec tous les certificats' },
    { id: 'zip', label: 'Archive ZIP', icon: 'Archive', description: 'Fichiers PDF individuels dans une archive' },
    { id: 'excel', label: 'Rapport Excel', icon: 'FileSpreadsheet', description: 'Tableau récapitulatif avec liens vers les PDFs' },
    { id: 'csv', label: 'Export CSV', icon: 'Database', description: 'Données tabulaires pour analyse' }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-300">
      <div className="bg-white border border-border rounded-lg shadow-medical-lg p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="CheckSquare" size={16} color="white" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                {selectedCertificates?.length} certificat{selectedCertificates?.length > 1 ? 's' : ''} sélectionné{selectedCertificates?.length > 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-muted-foreground">
                Opérations en lot disponibles
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={handleBulkDownload}
            disabled={isProcessing}
            loading={isProcessing}
          >
            Télécharger Tout
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Link"
            iconPosition="left"
            onClick={handleBulkLink}
            disabled={isProcessing}
          >
            Lier aux Procédures
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="FileExport"
              iconPosition="left"
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={isProcessing}
            >
              Exporter
            </Button>

            {showExportOptions && (
              <div className="absolute bottom-full left-0 mb-2 w-80 bg-white border border-border rounded-lg shadow-medical-lg z-400">
                <div className="p-3">
                  <h4 className="font-medium text-foreground mb-3">Options d'Export</h4>
                  <div className="space-y-2">
                    {exportFormats?.map(format => (
                      <button
                        key={format?.id}
                        onClick={() => handleBulkExport(format?.id)}
                        className="w-full flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors text-left"
                        disabled={isProcessing}
                      >
                        <Icon name={format?.icon} size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground">{format?.label}</div>
                          <div className="text-xs text-muted-foreground">{format?.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            onClick={() => {/* Additional options */}}
            disabled={isProcessing}
          />
        </div>

        {/* Progress Indicator */}
        {isProcessing && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Traitement en cours...
            </div>
          </div>
        )}
      </div>
      {/* Overlay for export options */}
      {showExportOptions && (
        <div 
          className="fixed inset-0 z-300"
          onClick={() => setShowExportOptions(false)}
        />
      )}
    </div>
  );
};

export default BulkOperationsPanel;