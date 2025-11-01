import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkOperations = ({ 
  selectedInstruments, 
  onBulkOperation, 
  onClearSelection 
}) => {
  const [selectedOperation, setSelectedOperation] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const operationOptions = [
    { value: '', label: 'Sélectionner une action...' },
    { value: 'schedule-maintenance', label: 'Programmer la maintenance' },
    { value: 'update-location', label: 'Mettre à jour la localisation' },
    { value: 'mark-sterilized', label: 'Marquer comme stérilisé' },
    { value: 'export-data', label: 'Exporter les données' },
    { value: 'generate-report', label: 'Générer un rapport' },
    { value: 'assign-set', label: 'Assigner à un set' }
  ];

  const operationConfig = {
    'schedule-maintenance': {
      icon: 'Wrench',
      color: 'bg-warning text-warning-foreground',
      title: 'Programmer la Maintenance',
      description: 'Programmer la maintenance pour les instruments sélectionnés'
    },
    'update-location': {
      icon: 'MapPin',
      color: 'bg-primary text-primary-foreground',
      title: 'Mettre à Jour la Localisation',
      description: 'Changer la localisation des instruments sélectionnés'
    },
    'mark-sterilized': {
      icon: 'Shield',
      color: 'bg-success text-success-foreground',
      title: 'Marquer comme Stérilisé',
      description: 'Marquer les instruments comme stérilisés'
    },
    'export-data': {
      icon: 'Download',
      color: 'bg-accent text-accent-foreground',
      title: 'Exporter les Données',
      description: 'Exporter les données des instruments sélectionnés'
    },
    'generate-report': {
      icon: 'FileText',
      color: 'bg-secondary text-secondary-foreground',
      title: 'Générer un Rapport',
      description: 'Créer un rapport pour les instruments sélectionnés'
    },
    'assign-set': {
      icon: 'Package',
      color: 'bg-purple-600 text-white',
      title: 'Assigner à un Set',
      description: 'Assigner les instruments à un set spécifique'
    }
  };

  const handleExecuteOperation = () => {
    if (!selectedOperation) return;
    
    setShowConfirmation(true);
  };

  const confirmOperation = () => {
    onBulkOperation(selectedOperation, selectedInstruments);
    setShowConfirmation(false);
    setSelectedOperation('');
  };

  const cancelOperation = () => {
    setShowConfirmation(false);
  };

  if (selectedInstruments?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-medical border border-border p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Icon name="CheckSquare" size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Aucun Instrument Sélectionné</h3>
          <p className="text-sm text-muted-foreground">
            Sélectionnez des instruments dans le tableau pour effectuer des actions en lot
          </p>
        </div>
      </div>
    );
  }

  const currentConfig = operationConfig?.[selectedOperation];

  return (
    <>
      <div className="bg-white rounded-lg shadow-medical border border-border p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Actions en Lot</h3>
            <p className="text-sm text-muted-foreground">
              {selectedInstruments?.length} instrument{selectedInstruments?.length > 1 ? 's' : ''} sélectionné{selectedInstruments?.length > 1 ? 's' : ''}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearSelection}
          >
            Désélectionner tout
          </Button>
        </div>

        {/* Operation Selection */}
        <div className="space-y-4">
          <Select
            label="Action à effectuer"
            options={operationOptions}
            value={selectedOperation}
            onChange={setSelectedOperation}
            placeholder="Choisir une action..."
          />

          {currentConfig && (
            <div className="p-4 bg-slate-50 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${currentConfig?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={currentConfig?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{currentConfig?.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentConfig?.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Execute Button */}
          <Button
            variant="primary"
            fullWidth
            iconName="Play"
            iconPosition="left"
            onClick={handleExecuteOperation}
            disabled={!selectedOperation}
          >
            Exécuter l'Action
          </Button>
        </div>

        {/* Selected Instruments Preview */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Instruments Sélectionnés</h4>
          <div className="max-h-32 overflow-y-auto space-y-2">
            {selectedInstruments?.slice(0, 10)?.map((instrumentId) => (
              <div key={instrumentId} className="flex items-center gap-2 text-sm">
                <Icon name="Check" size={14} className="text-success" />
                <span className="text-foreground">{instrumentId}</span>
              </div>
            ))}
            {selectedInstruments?.length > 10 && (
              <div className="text-sm text-muted-foreground">
                ... et {selectedInstruments?.length - 10} autre{selectedInstruments?.length - 10 > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-400 flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={cancelOperation} />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Confirmer l'Action</h2>
              <Button variant="ghost" size="sm" iconName="X" onClick={cancelOperation} />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 ${currentConfig?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={currentConfig?.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">
                    {currentConfig?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Êtes-vous sûr de vouloir effectuer cette action sur {selectedInstruments?.length} instrument{selectedInstruments?.length > 1 ? 's' : ''} ?
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Action:</strong> {currentConfig?.description}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={cancelOperation}
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  iconName="Check"
                  iconPosition="left"
                  onClick={confirmOperation}
                >
                  Confirmer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkOperations;