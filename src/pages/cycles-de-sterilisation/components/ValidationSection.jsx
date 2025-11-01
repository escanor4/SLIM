import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ValidationSection = ({ cycle, onUpdateValidation, onClose }) => {
  const [validationData, setValidationData] = useState({
    chemicalIndicator: {
      result: cycle?.validation?.chemicalIndicator?.result || '',
      batchNumber: cycle?.validation?.chemicalIndicator?.batchNumber || '',
      expiryDate: cycle?.validation?.chemicalIndicator?.expiryDate || '',
      photo: cycle?.validation?.chemicalIndicator?.photo || null,
      notes: cycle?.validation?.chemicalIndicator?.notes || ''
    },
    biologicalIndicator: {
      result: cycle?.validation?.biologicalIndicator?.result || '',
      batchNumber: cycle?.validation?.biologicalIndicator?.batchNumber || '',
      expiryDate: cycle?.validation?.biologicalIndicator?.expiryDate || '',
      incubationTime: cycle?.validation?.biologicalIndicator?.incubationTime || '',
      photo: cycle?.validation?.biologicalIndicator?.photo || null,
      notes: cycle?.validation?.biologicalIndicator?.notes || ''
    },
    overallResult: cycle?.validation?.status || 'en-attente',
    validatedBy: cycle?.validation?.validatedBy || '',
    validationDate: cycle?.validation?.validationDate || '',
    comments: cycle?.validation?.comments || ''
  });

  const [activeTab, setActiveTab] = useState('chemical');

  const resultOptions = [
    { value: '', label: 'Sélectionner le résultat' },
    { value: 'valide', label: 'Valide (Conforme)' },
    { value: 'echec', label: 'Échec (Non Conforme)' },
    { value: 'douteux', label: 'Résultat Douteux' }
  ];

  const overallResultOptions = [
    { value: 'en-attente', label: 'En Attente de Validation' },
    { value: 'valide', label: 'Cycle Validé' },
    { value: 'echec', label: 'Cycle Échoué' },
    { value: 'partiel', label: 'Validation Partielle' }
  ];

  const handleInputChange = (section, field, value) => {
    setValidationData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));
  };

  const handleOverallChange = (field, value) => {
    setValidationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (section, file) => {
    // Simulate photo upload
    const photoUrl = URL.createObjectURL(file);
    handleInputChange(section, 'photo', photoUrl);
  };

  const calculateOverallResult = () => {
    const chemResult = validationData?.chemicalIndicator?.result;
    const bioResult = validationData?.biologicalIndicator?.result;
    
    if (chemResult === 'valide' && bioResult === 'valide') {
      return 'valide';
    } else if (chemResult === 'echec' || bioResult === 'echec') {
      return 'echec';
    } else if (chemResult === 'valide' || bioResult === 'valide') {
      return 'partiel';
    }
    return 'en-attente';
  };

  const handleSubmit = () => {
    const updatedValidation = {
      ...validationData,
      overallResult: calculateOverallResult(),
      validationDate: new Date()?.toISOString(),
      validatedBy: validationData?.validatedBy || 'Marie Dubois'
    };
    
    onUpdateValidation(cycle?.id, updatedValidation);
  };

  const getResultBadge = (result) => {
    const config = {
      'valide': { color: 'bg-success text-success-foreground', icon: 'CheckCircle', label: 'Valide' },
      'echec': { color: 'bg-error text-error-foreground', icon: 'XCircle', label: 'Échec' },
      'douteux': { color: 'bg-warning text-warning-foreground', icon: 'AlertTriangle', label: 'Douteux' },
      'en-attente': { color: 'bg-secondary text-secondary-foreground', icon: 'Clock', label: 'En Attente' }
    };
    
    const resultConfig = config?.[result] || config?.['en-attente'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${resultConfig?.color}`}>
        <Icon name={resultConfig?.icon} size={12} />
        {resultConfig?.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Validation du Cycle</h2>
            <p className="text-sm text-muted-foreground">
              Cycle {cycle?.id} - {cycle?.equipment?.name}
            </p>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('chemical')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'chemical' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name="TestTube" size={16} />
                Indicateur Chimique
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('biological')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'biological' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name="Microscope" size={16} />
                Indicateur Biologique
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'summary' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name="FileCheck" size={16} />
                Résumé
              </div>
            </button>
          </div>

          <div className="p-6">
            {/* Chemical Indicator Tab */}
            {activeTab === 'chemical' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="TestTube" size={24} className="text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Indicateur Chimique</h3>
                    <p className="text-sm text-muted-foreground">
                      Validation des paramètres de température et de pression
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Select
                      label="Résultat de l'Indicateur"
                      options={resultOptions}
                      value={validationData?.chemicalIndicator?.result}
                      onChange={(value) => handleInputChange('chemicalIndicator', 'result', value)}
                      required
                    />
                    
                    <Input
                      label="Numéro de Lot"
                      type="text"
                      value={validationData?.chemicalIndicator?.batchNumber}
                      onChange={(e) => handleInputChange('chemicalIndicator', 'batchNumber', e?.target?.value)}
                      placeholder="Saisir le numéro de lot"
                    />
                    
                    <Input
                      label="Date d'Expiration"
                      type="date"
                      value={validationData?.chemicalIndicator?.expiryDate}
                      onChange={(e) => handleInputChange('chemicalIndicator', 'expiryDate', e?.target?.value)}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Photo de l'Indicateur
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                        {validationData?.chemicalIndicator?.photo ? (
                          <div className="space-y-2">
                            <img 
                              src={validationData?.chemicalIndicator?.photo} 
                              alt="Indicateur chimique montrant le résultat de stérilisation avec changement de couleur"
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              iconName="Trash2"
                              onClick={() => handleInputChange('chemicalIndicator', 'photo', null)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Icon name="Camera" size={32} className="mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Ajouter une photo</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => e?.target?.files?.[0] && handlePhotoUpload('chemicalIndicator', e?.target?.files?.[0])}
                              className="hidden"
                              id="chemical-photo"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('chemical-photo')?.click()}
                            >
                              Choisir une Photo
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Input
                      label="Notes"
                      type="text"
                      value={validationData?.chemicalIndicator?.notes}
                      onChange={(e) => handleInputChange('chemicalIndicator', 'notes', e?.target?.value)}
                      placeholder="Observations particulières..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Biological Indicator Tab */}
            {activeTab === 'biological' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Microscope" size={24} className="text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Indicateur Biologique</h3>
                    <p className="text-sm text-muted-foreground">
                      Validation de l'efficacité de stérilisation
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Select
                      label="Résultat de l'Indicateur"
                      options={resultOptions}
                      value={validationData?.biologicalIndicator?.result}
                      onChange={(value) => handleInputChange('biologicalIndicator', 'result', value)}
                      required
                    />
                    
                    <Input
                      label="Numéro de Lot"
                      type="text"
                      value={validationData?.biologicalIndicator?.batchNumber}
                      onChange={(e) => handleInputChange('biologicalIndicator', 'batchNumber', e?.target?.value)}
                      placeholder="Saisir le numéro de lot"
                    />
                    
                    <Input
                      label="Date d'Expiration"
                      type="date"
                      value={validationData?.biologicalIndicator?.expiryDate}
                      onChange={(e) => handleInputChange('biologicalIndicator', 'expiryDate', e?.target?.value)}
                    />
                    
                    <Input
                      label="Temps d'Incubation (heures)"
                      type="number"
                      value={validationData?.biologicalIndicator?.incubationTime}
                      onChange={(e) => handleInputChange('biologicalIndicator', 'incubationTime', e?.target?.value)}
                      placeholder="24"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Photo de l'Indicateur
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                        {validationData?.biologicalIndicator?.photo ? (
                          <div className="space-y-2">
                            <img 
                              src={validationData?.biologicalIndicator?.photo} 
                              alt="Indicateur biologique après incubation montrant l'absence de croissance microbienne"
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              iconName="Trash2"
                              onClick={() => handleInputChange('biologicalIndicator', 'photo', null)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Icon name="Camera" size={32} className="mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Ajouter une photo</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => e?.target?.files?.[0] && handlePhotoUpload('biologicalIndicator', e?.target?.files?.[0])}
                              className="hidden"
                              id="biological-photo"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('biological-photo')?.click()}
                            >
                              Choisir une Photo
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Input
                      label="Notes"
                      type="text"
                      value={validationData?.biologicalIndicator?.notes}
                      onChange={(e) => handleInputChange('biologicalIndicator', 'notes', e?.target?.value)}
                      placeholder="Observations particulières..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Summary Tab */}
            {activeTab === 'summary' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="FileCheck" size={24} className="text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Résumé de Validation</h3>
                    <p className="text-sm text-muted-foreground">
                      Vue d'ensemble des résultats de validation
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Results Summary */}
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-3">Résultats des Indicateurs</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Indicateur Chimique:</span>
                          {getResultBadge(validationData?.chemicalIndicator?.result)}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Indicateur Biologique:</span>
                          {getResultBadge(validationData?.biologicalIndicator?.result)}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-sm font-medium text-foreground">Résultat Global:</span>
                          {getResultBadge(calculateOverallResult())}
                        </div>
                      </div>
                    </div>
                    
                    <Select
                      label="Statut Final de Validation"
                      options={overallResultOptions}
                      value={validationData?.overallResult}
                      onChange={(value) => handleOverallChange('overallResult', value)}
                    />
                  </div>
                  
                  {/* Validation Details */}
                  <div className="space-y-4">
                    <Input
                      label="Validé par"
                      type="text"
                      value={validationData?.validatedBy}
                      onChange={(e) => handleOverallChange('validatedBy', e?.target?.value)}
                      placeholder="Nom du validateur"
                    />
                    
                    <Input
                      label="Commentaires de Validation"
                      type="text"
                      value={validationData?.comments}
                      onChange={(e) => handleOverallChange('comments', e?.target?.value)}
                      placeholder="Commentaires généraux sur la validation..."
                    />
                    
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">Informations du Cycle</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ID Cycle:</span>
                          <span className="font-medium">{cycle?.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Équipement:</span>
                          <span className="font-medium">{cycle?.equipment?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date de Début:</span>
                          <span className="font-medium">
                            {new Date(cycle.startTime)?.toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            iconName="Save"
            iconPosition="left"
            onClick={handleSubmit}
          >
            Enregistrer la Validation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ValidationSection;