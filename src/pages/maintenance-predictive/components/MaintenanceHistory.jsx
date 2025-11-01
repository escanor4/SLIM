import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MaintenanceHistory = ({ history, onViewDetails, onExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'Tous les Statuts' },
    { value: 'planifiee', label: 'Planifiée' },
    { value: 'en_cours', label: 'En Cours' },
    { value: 'terminee', label: 'Terminée' },
    { value: 'annulee', label: 'Annulée' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Tous les Types' },
    { value: 'preventive', label: 'Préventive' },
    { value: 'corrective', label: 'Corrective' },
    { value: 'calibration', label: 'Calibration' },
    { value: 'inspection', label: 'Inspection' },
    { value: 'upgrade', label: 'Mise à Niveau' }
  ];

  const filteredHistory = history?.filter(item => {
    const matchesSearch = item?.equipmentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.technician?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item?.status === statusFilter;
    const matchesType = typeFilter === 'all' || item?.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'planifiee': return 'Calendar';
      case 'en_cours': return 'Clock';
      case 'terminee': return 'CheckCircle';
      case 'annulee': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planifiee': return 'text-accent bg-accent/10 border-accent/20';
      case 'en_cours': return 'text-warning bg-warning/10 border-warning/20';
      case 'terminee': return 'text-success bg-success/10 border-success/20';
      case 'annulee': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'preventive': return 'Shield';
      case 'corrective': return 'Wrench';
      case 'calibration': return 'Settings';
      case 'inspection': return 'Search';
      case 'upgrade': return 'ArrowUp';
      default: return 'Tool';
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Historique de Maintenance</h2>
          <p className="text-sm text-muted-foreground">
            {filteredHistory?.length} intervention{filteredHistory?.length > 1 ? 's' : ''} trouvée{filteredHistory?.length > 1 ? 's' : ''}
          </p>
        </div>
        
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={onExport}
        >
          Exporter
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
        <Input
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="md:col-span-2"
        />
        
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Statut"
        />
        
        <Select
          options={typeOptions}
          value={typeFilter}
          onChange={setTypeFilter}
          placeholder="Type"
        />
      </div>
      {/* History List */}
      <div className="space-y-3">
        {filteredHistory?.map((item) => (
          <div
            key={item?.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-medical transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              {/* Type Icon */}
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={getTypeIcon(item?.type)} size={20} className="text-primary" />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{item?.equipmentName}</h3>
                    <p className="text-sm text-muted-foreground">{item?.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(item?.status)}`}>
                      <Icon name={getStatusIcon(item?.status)} size={12} className="inline mr-1" />
                      {item?.status?.replace('_', ' ')}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(item?.priority)}`}>
                      {item?.priority}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Technicien:</span>
                    <div className="font-medium text-foreground">{item?.technician}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <div className="font-medium text-foreground">
                      {new Date(item.scheduledDate)?.toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Durée:</span>
                    <div className="font-medium text-foreground">{item?.duration}h</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Coût:</span>
                    <div className="font-medium text-foreground">{item?.cost?.toFixed(2)}€</div>
                  </div>
                </div>

                {/* Parts Used */}
                {item?.partsUsed && item?.partsUsed?.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs text-muted-foreground">Pièces utilisées:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item?.partsUsed?.map((part, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                        >
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {item?.notes && (
                  <div className="mb-3 p-2 bg-muted rounded-md">
                    <span className="text-xs text-muted-foreground">Notes:</span>
                    <p className="text-sm text-foreground mt-1">{item?.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>Créé le {new Date(item.createdAt)?.toLocaleDateString('fr-FR')}</span>
                    {item?.completedAt && (
                      <>
                        <span>•</span>
                        <span>Terminé le {new Date(item.completedAt)?.toLocaleDateString('fr-FR')}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Eye"
                      onClick={() => onViewDetails(item)}
                    >
                      Détails
                    </Button>
                    {item?.status === 'terminee' && (
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Download"
                      >
                        Rapport
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredHistory?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Aucun résultat trouvé</h3>
          <p className="text-muted-foreground">
            Essayez de modifier vos critères de recherche ou filtres.
          </p>
        </div>
      )}
    </div>
  );
};

export default MaintenanceHistory;