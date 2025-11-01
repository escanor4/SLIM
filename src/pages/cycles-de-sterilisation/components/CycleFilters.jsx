import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CycleFilters = ({ onFiltersChange, resultCounts }) => {
  const [filters, setFilters] = useState({
    equipment: '',
    status: '',
    dateRange: {
      start: '',
      end: ''
    },
    validationStatus: '',
    cycleId: ''
  });

  const equipmentOptions = [
    { value: '', label: 'Tous les équipements' },
    { value: 'autoclave-1', label: 'Autoclave A1 - Salle 1' },
    { value: 'autoclave-2', label: 'Autoclave A2 - Salle 1' },
    { value: 'autoclave-3', label: 'Autoclave B1 - Salle 2' },
    { value: 'plasma-1', label: 'Stérilisateur Plasma P1' },
    { value: 'plasma-2', label: 'Stérilisateur Plasma P2' }
  ];

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'en-cours', label: 'En Cours' },
    { value: 'termine', label: 'Terminé' },
    { value: 'valide', label: 'Validé' },
    { value: 'echec', label: 'Échec' },
    { value: 'en-attente', label: 'En Attente' }
  ];

  const validationOptions = [
    { value: '', label: 'Toutes les validations' },
    { value: 'valide', label: 'Validé' },
    { value: 'echec', label: 'Échec' },
    { value: 'en-attente', label: 'En Attente de Validation' },
    { value: 'partiel', label: 'Validation Partielle' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (type, value) => {
    const newDateRange = { ...filters?.dateRange, [type]: value };
    const newFilters = { ...filters, dateRange: newDateRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      equipment: '',
      status: '',
      dateRange: { start: '', end: '' },
      validationStatus: '',
      cycleId: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    typeof value === 'string' ? value !== '' : 
    typeof value === 'object' ? Object.values(value)?.some(v => v !== '') : 
    false
  );

  return (
    <div className="bg-white rounded-lg border border-border p-6 mb-6 shadow-medical">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filtres de Recherche</h3>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={clearFilters}
          >
            Effacer les Filtres
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
        {/* Equipment Filter */}
        <Select
          label="Équipement"
          options={equipmentOptions}
          value={filters?.equipment}
          onChange={(value) => handleFilterChange('equipment', value)}
          placeholder="Sélectionner..."
        />

        {/* Status Filter */}
        <Select
          label="Statut du Cycle"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Sélectionner..."
        />

        {/* Validation Status Filter */}
        <Select
          label="Statut de Validation"
          options={validationOptions}
          value={filters?.validationStatus}
          onChange={(value) => handleFilterChange('validationStatus', value)}
          placeholder="Sélectionner..."
        />

        {/* Date Range Start */}
        <Input
          label="Date de Début"
          type="date"
          value={filters?.dateRange?.start}
          onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
        />

        {/* Date Range End */}
        <Input
          label="Date de Fin"
          type="date"
          value={filters?.dateRange?.end}
          onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
        />
      </div>
      {/* Search by Cycle ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          label="Recherche par ID de Cycle"
          type="text"
          placeholder="Saisir l'ID du cycle..."
          value={filters?.cycleId}
          onChange={(e) => handleFilterChange('cycleId', e?.target?.value)}
        />
      </div>
      {/* Result Counts */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          <strong>Résultats:</strong>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-md">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-primary">
              Total: {resultCounts?.total}
            </span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-md">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-success">
              Validés: {resultCounts?.validated}
            </span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-warning/10 rounded-md">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-sm font-medium text-warning">
              En Cours: {resultCounts?.inProgress}
            </span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-error/10 rounded-md">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span className="text-sm font-medium text-error">
              Échecs: {resultCounts?.failed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleFilters;