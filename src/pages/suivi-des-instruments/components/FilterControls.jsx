import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  totalInstruments,
  filteredCount 
}) => {
  const locationOptions = [
    { value: '', label: 'Toutes les localisations' },
    { value: 'Bloc Opératoire', label: 'Bloc Opératoire' },
    { value: 'Zone de Lavage', label: 'Zone de Lavage' },
    { value: 'Stérilisation', label: 'Stérilisation' },
    { value: 'Stockage', label: 'Stockage' },
    { value: 'Maintenance', label: 'Maintenance' }
  ];

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'Stérilisé', label: 'Stérilisé' },
    { value: 'En Cours', label: 'En Cours' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Disponible', label: 'Disponible' },
    { value: 'En Utilisation', label: 'En Utilisation' }
  ];

  const maintenanceOptions = [
    { value: '', label: 'Toutes les maintenances' },
    { value: 'due', label: 'Maintenance due' },
    { value: 'overdue', label: 'Maintenance en retard' },
    { value: 'recent', label: 'Maintenance récente' }
  ];

  const categoryOptions = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'Instruments de Base', label: 'Instruments de Base' },
    { value: 'Instruments Spécialisés', label: 'Instruments Spécialisés' },
    { value: 'Équipement Électronique', label: 'Équipement Électronique' },
    { value: 'Instruments Optiques', label: 'Instruments Optiques' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-white rounded-lg shadow-medical border border-border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Filtres de Recherche</h3>
          <p className="text-sm text-muted-foreground">
            {filteredCount} sur {totalInstruments} instruments affichés
          </p>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Effacer les filtres
          </Button>
        )}
      </div>
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Rechercher par ID, nom, ou set d'instruments..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Localisation"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
          placeholder="Sélectionner..."
        />

        <Select
          label="Statut"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Sélectionner..."
        />

        <Select
          label="Catégorie"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          placeholder="Sélectionner..."
        />

        <Select
          label="Maintenance"
          options={maintenanceOptions}
          value={filters?.maintenance}
          onChange={(value) => onFilterChange('maintenance', value)}
          placeholder="Sélectionner..."
        />
      </div>
      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Date de début"
          value={filters?.startDate}
          onChange={(e) => onFilterChange('startDate', e?.target?.value)}
        />
        <Input
          type="date"
          label="Date de fin"
          value={filters?.endDate}
          onChange={(e) => onFilterChange('endDate', e?.target?.value)}
        />
      </div>
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground">Filtres rapides:</span>
        <Button
          variant={filters?.quickFilter === 'maintenance-due' ? 'primary' : 'outline'}
          size="sm"
          iconName="AlertTriangle"
          iconPosition="left"
          onClick={() => onFilterChange('quickFilter', 
            filters?.quickFilter === 'maintenance-due' ? '' : 'maintenance-due'
          )}
        >
          Maintenance due
        </Button>
        <Button
          variant={filters?.quickFilter === 'high-usage' ? 'primary' : 'outline'}
          size="sm"
          iconName="TrendingUp"
          iconPosition="left"
          onClick={() => onFilterChange('quickFilter', 
            filters?.quickFilter === 'high-usage' ? '' : 'high-usage'
          )}
        >
          Usage élevé
        </Button>
        <Button
          variant={filters?.quickFilter === 'recently-sterilized' ? 'primary' : 'outline'}
          size="sm"
          iconName="Shield"
          iconPosition="left"
          onClick={() => onFilterChange('quickFilter', 
            filters?.quickFilter === 'recently-sterilized' ? '' : 'recently-sterilized'
          )}
        >
          Récemment stérilisé
        </Button>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <span className="text-sm font-medium text-muted-foreground">Filtres actifs:</span>
          {Object.entries(filters)?.map(([key, value]) => {
            if (!value || key === 'quickFilter') return null;
            
            let label = value;
            if (key === 'location') label = `Localisation: ${value}`;
            if (key === 'status') label = `Statut: ${value}`;
            if (key === 'category') label = `Catégorie: ${value}`;
            if (key === 'maintenance') label = `Maintenance: ${value}`;
            if (key === 'search') label = `Recherche: "${value}"`;
            if (key === 'startDate') label = `Depuis: ${value}`;
            if (key === 'endDate') label = `Jusqu'à: ${value}`;
            
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md"
              >
                {label}
                <button
                  onClick={() => onFilterChange(key, '')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterControls;