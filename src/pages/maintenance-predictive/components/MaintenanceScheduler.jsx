import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MaintenanceScheduler = ({ equipment, onSchedule, onClose }) => {
  const [formData, setFormData] = useState({
    type: '',
    priority: 'normale',
    scheduledDate: '',
    estimatedDuration: '',
    assignedTechnician: '',
    description: '',
    partsRequired: []
  });

  const maintenanceTypes = [
    { value: 'preventive', label: 'Maintenance Préventive' },
    { value: 'corrective', label: 'Maintenance Corrective' },
    { value: 'calibration', label: 'Calibration' },
    { value: 'inspection', label: 'Inspection Réglementaire' },
    { value: 'upgrade', label: 'Mise à Niveau' }
  ];

  const priorityOptions = [
    { value: 'faible', label: 'Faible' },
    { value: 'normale', label: 'Normale' },
    { value: 'elevee', label: 'Élevée' },
    { value: 'critique', label: 'Critique' }
  ];

  const technicianOptions = [
    { value: 'tech1', label: 'Jean Dupont - Technicien Senior' },
    { value: 'tech2', label: 'Marie Martin - Spécialiste Autoclaves' },
    { value: 'tech3', label: 'Pierre Durand - Technicien Biomédical' },
    { value: 'tech4', label: 'Sophie Leroy - Responsable Maintenance' }
  ];

  const availableParts = [
    { id: 'joint1', name: 'Joint de Porte Principal', stock: 5, price: 45.50 },
    { id: 'capteur1', name: 'Capteur de Température', stock: 3, price: 125.00 },
    { id: 'valve1', name: 'Valve de Sécurité', stock: 2, price: 89.90 },
    { id: 'filtre1', name: 'Filtre à Air HEPA', stock: 8, price: 67.30 },
    { id: 'pompe1', name: 'Pompe à Vide', stock: 1, price: 450.00 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePartToggle = (partId) => {
    setFormData(prev => ({
      ...prev,
      partsRequired: prev?.partsRequired?.includes(partId)
        ? prev?.partsRequired?.filter(id => id !== partId)
        : [...prev?.partsRequired, partId]
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const maintenanceOrder = {
      id: 'MO-' + Date.now(),
      equipmentId: equipment?.id,
      equipmentName: equipment?.name,
      ...formData,
      createdAt: new Date()?.toISOString(),
      status: 'planifiee',
      estimatedCost: calculateEstimatedCost()
    };

    onSchedule(maintenanceOrder);
  };

  const calculateEstimatedCost = () => {
    const partsCost = formData?.partsRequired?.reduce((total, partId) => {
      const part = availableParts?.find(p => p?.id === partId);
      return total + (part ? part?.price : 0);
    }, 0);
    
    const laborCost = parseFloat(formData?.estimatedDuration || 0) * 65; // 65€/heure
    return partsCost + laborCost;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critique': return 'text-error';
      case 'elevee': return 'text-warning';
      case 'normale': return 'text-accent';
      case 'faible': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Planifier une Maintenance</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {equipment?.name} - {equipment?.model}
              </p>
            </div>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Type de Maintenance"
              options={maintenanceTypes}
              value={formData?.type}
              onChange={(value) => handleInputChange('type', value)}
              required
            />
            
            <Select
              label="Priorité"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date Prévue"
              type="datetime-local"
              value={formData?.scheduledDate}
              onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
              required
            />
            
            <Input
              label="Durée Estimée (heures)"
              type="number"
              step="0.5"
              min="0.5"
              placeholder="Ex: 2.5"
              value={formData?.estimatedDuration}
              onChange={(e) => handleInputChange('estimatedDuration', e?.target?.value)}
              required
            />
          </div>

          <Select
            label="Technicien Assigné"
            options={technicianOptions}
            value={formData?.assignedTechnician}
            onChange={(value) => handleInputChange('assignedTechnician', value)}
            searchable
            required
          />

          <Input
            label="Description des Travaux"
            type="text"
            placeholder="Décrivez les travaux à effectuer..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            required
          />

          {/* Parts Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Pièces Requises
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
              {availableParts?.map((part) => (
                <div key={part?.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData?.partsRequired?.includes(part?.id)}
                      onChange={() => handlePartToggle(part?.id)}
                      className="rounded border-border"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">{part?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Stock: {part?.stock} • {part?.price?.toFixed(2)}€
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    part?.stock > 5 ? 'bg-success/10 text-success' :
                    part?.stock > 0 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
                  }`}>
                    {part?.stock > 0 ? 'Disponible' : 'Rupture'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Estimation */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Estimation des Coûts</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Main d'œuvre ({formData?.estimatedDuration || 0}h × 65€)</span>
                <span className="font-medium text-foreground">
                  {((parseFloat(formData?.estimatedDuration) || 0) * 65)?.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pièces détachées</span>
                <span className="font-medium text-foreground">
                  {formData?.partsRequired?.reduce((total, partId) => {
                    const part = availableParts?.find(p => p?.id === partId);
                    return total + (part ? part?.price : 0);
                  }, 0)?.toFixed(2)}€
                </span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-foreground">Total Estimé</span>
                <span className="text-primary">{calculateEstimatedCost()?.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
            >
              Planifier la Maintenance
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceScheduler;