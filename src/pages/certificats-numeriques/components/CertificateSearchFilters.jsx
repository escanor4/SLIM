import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CertificateSearchFilters = ({ 
  onSearch, 
  onFilterChange, 
  onClearFilters,
  totalResults 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [procedureFilter, setProcedureFilter] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'Validé', label: 'Validé' },
    { value: 'En Attente', label: 'En Attente' },
    { value: 'Expiré', label: 'Expiré' },
    { value: 'Révoqué', label: 'Révoqué' }
  ];

  const procedureOptions = [
    { value: '', label: 'Toutes les procédures' },
    { value: 'linked', label: 'Liés à une procédure' },
    { value: 'unlinked', label: 'Non liés' }
  ];

  const handleSearch = () => {
    const filters = {
      searchTerm: searchTerm?.trim(),
      dateRange,
      status: statusFilter,
      procedure: procedureFilter
    };
    onSearch(filters);
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setStatusFilter('');
    setProcedureFilter('');
    onClearFilters();
  };

  const handleQuickDateFilter = (days) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate?.setDate(endDate?.getDate() - days);
    
    const newDateRange = {
      start: startDate?.toISOString()?.split('T')?.[0],
      end: endDate?.toISOString()?.split('T')?.[0]
    };
    
    setDateRange(newDateRange);
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical p-6 mb-6">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Rechercher par ID certificat, set d'instruments, ou procédure..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10"
              onKeyPress={(e) => e?.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="primary"
            iconName="Search"
            iconPosition="left"
            onClick={handleSearch}
          >
            Rechercher
          </Button>
          
          <Button
            variant="outline"
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Filtres
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Période de stérilisation
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="date"
                label="Du"
                value={dateRange?.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
                className="flex-1"
              />
              <Input
                type="date"
                label="Au"
                value={dateRange?.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
                className="flex-1"
              />
            </div>
            
            {/* Quick Date Filters */}
            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuickDateFilter(7)}
              >
                7 derniers jours
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuickDateFilter(30)}
              >
                30 derniers jours
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuickDateFilter(90)}
              >
                3 derniers mois
              </Button>
            </div>
          </div>

          {/* Status and Procedure Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Statut de validation
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statusOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Liaison procédure
              </label>
              <select
                value={procedureFilter}
                onChange={(e) => setProcedureFilter(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {procedureOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={handleClearAll}
              >
                Effacer tout
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                iconName="Filter"
                iconPosition="left"
                onClick={handleSearch}
              >
                Appliquer les filtres
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {(searchTerm || dateRange?.start || statusFilter || procedureFilter) && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">Filtres actifs:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                Recherche: "{searchTerm}"
                <button onClick={() => setSearchTerm('')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {dateRange?.start && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                Période: {dateRange?.start} - {dateRange?.end || 'aujourd\'hui'}
                <button onClick={() => setDateRange({ start: '', end: '' })}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {statusFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                Statut: {statusOptions?.find(opt => opt?.value === statusFilter)?.label}
                <button onClick={() => setStatusFilter('')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {procedureFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                Procédure: {procedureOptions?.find(opt => opt?.value === procedureFilter)?.label}
                <button onClick={() => setProcedureFilter('')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateSearchFilters;