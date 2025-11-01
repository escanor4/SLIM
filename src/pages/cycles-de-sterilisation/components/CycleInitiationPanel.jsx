import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CycleInitiationPanel = ({ onInitiateCycle, availableEquipment, availableInstrumentSets }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cycleData, setCycleData] = useState({
    equipment: '',
    instrumentSets: [],
    cycleType: '',
    parameters: {
      temperature: '',
      pressure: '',
      exposureTime: '',
      dryingTime: ''
    },
    operator: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const cycleTypeOptions = [
    { value: '', label: 'Sélectionner le type de cycle' },
    { value: 'standard', label: 'Cycle Standard (134°C)' },
    { value: 'prion', label: 'Cycle Prion (134°C - 18min)' },
    { value: 'textile', label: 'Cycle Textile (121°C)' },
    { value: 'plasma', label: 'Stérilisation Plasma' },
    { value: 'flash', label: 'Cycle Flash (132°C)' }
  ];

  const equipmentOptions = [
    { value: '', label: 'Sélectionner un équipement' },
    ...availableEquipment?.map(eq => ({
      value: eq?.id,
      label: `${eq?.name} - ${eq?.location} (${eq?.status})`
    }))
  ];

  const instrumentSetOptions = availableInstrumentSets?.map(set => ({
    value: set?.id,
    label: `${set?.name} (${set?.instrumentCount} instruments)`,
    description: set?.category
  }));

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setCycleData(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setCycleData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleInstrumentSetsChange = (selectedSets) => {
    setCycleData(prev => ({
      ...prev,
      instrumentSets: selectedSets
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!cycleData?.equipment) {
      newErrors.equipment = 'Veuillez sélectionner un équipement';
    }
    
    if (cycleData?.instrumentSets?.length === 0) {
      newErrors.instrumentSets = 'Veuillez sélectionner au moins un set d\'instruments';
    }
    
    if (!cycleData?.cycleType) {
      newErrors.cycleType = 'Veuillez sélectionner un type de cycle';
    }
    
    if (!cycleData?.operator) {
      newErrors.operator = 'Veuillez saisir le nom de l\'opérateur';
    }

    // Validate parameters based on cycle type
    if (cycleData?.cycleType && cycleData?.cycleType !== 'plasma') {
      if (!cycleData?.parameters?.temperature) {
        newErrors['parameters.temperature'] = 'Température requise';
      }
      if (!cycleData?.parameters?.pressure) {
        newErrors['parameters.pressure'] = 'Pression requise';
      }
    }
    
    if (!cycleData?.parameters?.exposureTime) {
      newErrors['parameters.exposureTime'] = 'Temps d\'exposition requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newCycle = {
        id: 'CYC-' + Date.now()?.toString()?.slice(-6),
        ...cycleData,
        startTime: new Date()?.toISOString(),
        status: 'en-cours',
        validation: {
          status: 'en-attente',
          chemicalIndicator: null,
          biologicalIndicator: null
        }
      };
      
      onInitiateCycle(newCycle);
      
      // Reset form
      setCycleData({
        equipment: '',
        instrumentSets: [],
        cycleType: '',
        parameters: {
          temperature: '',
          pressure: '',
          exposureTime: '',
          dryingTime: ''
        },
        operator: '',
        notes: ''
      });
      setIsExpanded(false);
    }
  };

  const getPresetParameters = (cycleType) => {
    const presets = {
      'standard': { temperature: '134', pressure: '2.1', exposureTime: '5', dryingTime: '20' },
      'prion': { temperature: '134', pressure: '2.1', exposureTime: '18', dryingTime: '20' },
      'textile': { temperature: '121', pressure: '1.1', exposureTime: '15', dryingTime: '30' },
      'plasma': { temperature: '50', pressure: '0.1', exposureTime: '45', dryingTime: '0' },
      'flash': { temperature: '132', pressure: '2.0', exposureTime: '3', dryingTime: '0' }
    };
    
    return presets?.[cycleType] || {};
  };

  const handleCycleTypeChange = (value) => {
    handleInputChange('cycleType', value);
    
    // Auto-fill parameters based on cycle type
    const presetParams = getPresetParameters(value);
    if (Object.keys(presetParams)?.length > 0) {
      setCycleData(prev => ({
        ...prev,
        parameters: presetParams
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical mb-6">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Plus" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Initier un Nouveau Cycle</h3>
            <p className="text-sm text-muted-foreground">
              Configurer et démarrer un cycle de stérilisation
            </p>
          </div>
        </div>
        
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {isExpanded && (
        <div className="p-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Equipment Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Icon name="Zap" size={16} />
                Équipement
              </h4>
              
              <Select
                label="Sélectionner l'Équipement"
                options={equipmentOptions}
                value={cycleData?.equipment}
                onChange={(value) => handleInputChange('equipment', value)}
                error={errors?.equipment}
                required
              />

              <Select
                label="Type de Cycle"
                options={cycleTypeOptions}
                value={cycleData?.cycleType}
                onChange={handleCycleTypeChange}
                error={errors?.cycleType}
                required
              />
            </div>

            {/* Instrument Sets */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Icon name="Package" size={16} />
                Sets d'Instruments
              </h4>
              
              <Select
                label="Sélectionner les Sets"
                options={instrumentSetOptions}
                value={cycleData?.instrumentSets}
                onChange={handleInstrumentSetsChange}
                error={errors?.instrumentSets}
                multiple
                searchable
                required
              />
            </div>

            {/* Parameters */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Icon name="Settings" size={16} />
                Paramètres
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Température (°C)"
                  type="number"
                  value={cycleData?.parameters?.temperature}
                  onChange={(e) => handleInputChange('parameters.temperature', e?.target?.value)}
                  error={errors?.['parameters.temperature']}
                  placeholder="134"
                />
                
                <Input
                  label="Pression (bar)"
                  type="number"
                  step="0.1"
                  value={cycleData?.parameters?.pressure}
                  onChange={(e) => handleInputChange('parameters.pressure', e?.target?.value)}
                  error={errors?.['parameters.pressure']}
                  placeholder="2.1"
                />
                
                <Input
                  label="Exposition (min)"
                  type="number"
                  value={cycleData?.parameters?.exposureTime}
                  onChange={(e) => handleInputChange('parameters.exposureTime', e?.target?.value)}
                  error={errors?.['parameters.exposureTime']}
                  placeholder="5"
                  required
                />
                
                <Input
                  label="Séchage (min)"
                  type="number"
                  value={cycleData?.parameters?.dryingTime}
                  onChange={(e) => handleInputChange('parameters.dryingTime', e?.target?.value)}
                  placeholder="20"
                />
              </div>
            </div>
          </div>

          {/* Operator and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Input
              label="Opérateur Responsable"
              type="text"
              value={cycleData?.operator}
              onChange={(e) => handleInputChange('operator', e?.target?.value)}
              error={errors?.operator}
              placeholder="Nom de l'opérateur"
              required
            />
            
            <Input
              label="Notes (Optionnel)"
              type="text"
              value={cycleData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Commentaires ou observations..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(false)}
            >
              Annuler
            </Button>
            
            <Button
              variant="primary"
              iconName="Play"
              iconPosition="left"
              onClick={handleSubmit}
            >
              Démarrer le Cycle
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CycleInitiationPanel;