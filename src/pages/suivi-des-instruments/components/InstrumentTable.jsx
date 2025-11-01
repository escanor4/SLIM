import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const InstrumentTable = ({ 
  instruments, 
  onViewDetails, 
  onScheduleMaintenance, 
  onViewHistory,
  selectedInstruments,
  onSelectionChange 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const statusConfig = {
    'Stérilisé': { color: 'bg-success text-success-foreground', icon: 'CheckCircle' },
    'En Cours': { color: 'bg-warning text-warning-foreground', icon: 'Clock' },
    'Maintenance': { color: 'bg-error text-error-foreground', icon: 'AlertTriangle' },
    'Disponible': { color: 'bg-primary text-primary-foreground', icon: 'Shield' },
    'En Utilisation': { color: 'bg-accent text-accent-foreground', icon: 'Activity' }
  };

  const locationConfig = {
    'Bloc Opératoire': { color: 'bg-red-100 text-red-800', icon: 'Stethoscope' },
    'Zone de Lavage': { color: 'bg-blue-100 text-blue-800', icon: 'Droplets' },
    'Stérilisation': { color: 'bg-purple-100 text-purple-800', icon: 'Zap' },
    'Stockage': { color: 'bg-green-100 text-green-800', icon: 'Package' },
    'Maintenance': { color: 'bg-orange-100 text-orange-800', icon: 'Wrench' }
  };

  const sortedInstruments = useMemo(() => {
    let sortableInstruments = [...instruments];
    if (sortConfig?.key) {
      sortableInstruments?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableInstruments;
  }, [instruments, sortConfig]);

  const paginatedInstruments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedInstruments?.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedInstruments, currentPage]);

  const totalPages = Math.ceil(sortedInstruments?.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange([...selectedInstruments, ...paginatedInstruments?.map(i => i?.id)]);
    } else {
      const currentPageIds = paginatedInstruments?.map(i => i?.id);
      onSelectionChange(selectedInstruments?.filter(id => !currentPageIds?.includes(id)));
    }
  };

  const handleSelectInstrument = (instrumentId, checked) => {
    if (checked) {
      onSelectionChange([...selectedInstruments, instrumentId]);
    } else {
      onSelectionChange(selectedInstruments?.filter(id => id !== instrumentId));
    }
  };

  const isAllSelected = paginatedInstruments?.length > 0 && 
    paginatedInstruments?.every(instrument => selectedInstruments?.includes(instrument?.id));

  const SortableHeader = ({ label, sortKey, className = "" }) => (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        <div className="flex flex-col">
          <Icon 
            name="ChevronUp" 
            size={12} 
            className={`${sortConfig?.key === sortKey && sortConfig?.direction === 'asc' ? 'text-primary' : 'text-slate-300'}`}
          />
          <Icon 
            name="ChevronDown" 
            size={12} 
            className={`${sortConfig?.key === sortKey && sortConfig?.direction === 'desc' ? 'text-primary' : 'text-slate-300'} -mt-1`}
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-medical border border-border">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <SortableHeader label="ID Instrument" sortKey="id" />
              <SortableHeader label="Nom" sortKey="name" />
              <SortableHeader label="Set" sortKey="setName" />
              <SortableHeader label="Localisation" sortKey="location" />
              <SortableHeader label="Statut" sortKey="status" />
              <SortableHeader label="Utilisations" sortKey="usageCount" />
              <SortableHeader label="Dernière Maintenance" sortKey="lastMaintenance" />
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-border">
            {paginatedInstruments?.map((instrument) => {
              const statusStyle = statusConfig?.[instrument?.status] || statusConfig?.['Disponible'];
              const locationStyle = locationConfig?.[instrument?.location] || locationConfig?.['Stockage'];
              
              return (
                <tr key={instrument?.id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedInstruments?.includes(instrument?.id)}
                      onChange={(e) => handleSelectInstrument(instrument?.id, e?.target?.checked)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{instrument?.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{instrument?.name}</div>
                    <div className="text-sm text-muted-foreground">{instrument?.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{instrument?.setName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${locationStyle?.color}`}>
                      <Icon name={locationStyle?.icon} size={12} />
                      {instrument?.location}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyle?.color}`}>
                      <Icon name={statusStyle?.icon} size={12} />
                      {instrument?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{instrument?.usageCount}</div>
                    <div className="text-xs text-muted-foreground">
                      Limite: {instrument?.maxUsage}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{instrument?.lastMaintenance}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewDetails(instrument)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Wrench"
                        onClick={() => onScheduleMaintenance(instrument)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="History"
                        onClick={() => onViewHistory(instrument)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {paginatedInstruments?.map((instrument) => {
          const statusStyle = statusConfig?.[instrument?.status] || statusConfig?.['Disponible'];
          const locationStyle = locationConfig?.[instrument?.location] || locationConfig?.['Stockage'];
          
          return (
            <div key={instrument?.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedInstruments?.includes(instrument?.id)}
                    onChange={(e) => handleSelectInstrument(instrument?.id, e?.target?.checked)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-foreground">{instrument?.name}</div>
                    <div className="text-sm text-muted-foreground">{instrument?.id}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" iconName="Eye" onClick={() => onViewDetails(instrument)} />
                  <Button variant="ghost" size="sm" iconName="MoreVertical" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Set</div>
                  <div className="font-medium">{instrument?.setName}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Utilisations</div>
                  <div className="font-medium">{instrument?.usageCount}/{instrument?.maxUsage}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${locationStyle?.color}`}>
                  <Icon name={locationStyle?.icon} size={12} />
                  {instrument?.location}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyle?.color}`}>
                  <Icon name={statusStyle?.icon} size={12} />
                  {instrument?.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, sortedInstruments?.length)} sur {sortedInstruments?.length} instruments
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            />
            <span className="text-sm font-medium">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstrumentTable;