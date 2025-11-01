import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CertificateTable = ({ 
  certificates, 
  onViewDetails, 
  onDownloadPDF, 
  onLinkProcedure, 
  onViewAuditTrail,
  selectedCertificates,
  onSelectCertificate,
  onSelectAll
}) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Validé': { color: 'bg-success text-success-foreground', icon: 'CheckCircle' },
      'En Attente': { color: 'bg-warning text-warning-foreground', icon: 'Clock' },
      'Expiré': { color: 'bg-error text-error-foreground', icon: 'AlertCircle' },
      'Révoqué': { color: 'bg-secondary text-secondary-foreground', icon: 'XCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.['En Attente'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        {status}
      </span>
    );
  };

  const getProcedureLinkStatus = (isLinked) => {
    return isLinked ? (
      <span className="inline-flex items-center gap-1 text-success text-xs">
        <Icon name="Link" size={12} />
        Lié
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
        <Icon name="Unlink" size={12} />
        Non lié
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Certificats Numériques</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {certificates?.length} certificat{certificates?.length > 1 ? 's' : ''}
            </span>
            {selectedCertificates?.length > 0 && (
              <span className="text-sm font-medium text-primary">
                {selectedCertificates?.length} sélectionné{selectedCertificates?.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedCertificates?.length === certificates?.length && certificates?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-2">
                  ID Certificat
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('instrumentSet')}
              >
                <div className="flex items-center gap-2">
                  Set d'Instruments
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Date Stérilisation
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                Statut
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                Procédure
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {certificates?.map((certificate) => (
              <tr key={certificate?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCertificates?.includes(certificate?.id)}
                    onChange={() => onSelectCertificate(certificate?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="font-mono text-sm text-foreground">{certificate?.id}</div>
                  <div className="text-xs text-muted-foreground">
                    Cycle: {certificate?.cycleId}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium text-foreground">{certificate?.instrumentSet}</div>
                  <div className="text-xs text-muted-foreground">
                    {certificate?.instrumentCount} instrument{certificate?.instrumentCount > 1 ? 's' : ''}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground">{certificate?.sterilizationDate}</div>
                  <div className="text-xs text-muted-foreground">{certificate?.sterilizationTime}</div>
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(certificate?.status)}
                </td>
                <td className="px-4 py-4">
                  {getProcedureLinkStatus(certificate?.isLinkedToProcedure)}
                  {certificate?.procedureName && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {certificate?.procedureName}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Eye"
                      onClick={() => onViewDetails(certificate)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Download"
                      onClick={() => onDownloadPDF(certificate)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Link"
                      onClick={() => onLinkProcedure(certificate)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="History"
                      onClick={() => onViewAuditTrail(certificate)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {certificates?.map((certificate) => (
          <div key={certificate?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCertificates?.includes(certificate?.id)}
                  onChange={() => onSelectCertificate(certificate?.id)}
                  className="rounded border-border"
                />
                <div>
                  <div className="font-mono text-sm font-medium text-foreground">
                    {certificate?.id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Cycle: {certificate?.cycleId}
                  </div>
                </div>
              </div>
              {getStatusBadge(certificate?.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <div className="text-sm font-medium text-foreground">
                  {certificate?.instrumentSet}
                </div>
                <div className="text-xs text-muted-foreground">
                  {certificate?.instrumentCount} instrument{certificate?.instrumentCount > 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stérilisation:</span>
                <span className="text-foreground">
                  {certificate?.sterilizationDate} {certificate?.sterilizationTime}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Procédure:</span>
                {getProcedureLinkStatus(certificate?.isLinkedToProcedure)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewDetails(certificate)}
                className="flex-1"
              >
                Voir
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Download"
                onClick={() => onDownloadPDF(certificate)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Link"
                onClick={() => onLinkProcedure(certificate)}
              />
            </div>
          </div>
        ))}
      </div>
      {certificates?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Aucun certificat trouvé
          </h3>
          <p className="text-muted-foreground">
            Aucun certificat ne correspond aux critères de recherche actuels.
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificateTable;