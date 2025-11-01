import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CertificateDetailsModal = ({ 
  certificate, 
  onClose, 
  onDownloadPDF, 
  onLinkProcedure 
}) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!certificate) return null;

  const tabs = [
    { id: 'details', label: 'Détails', icon: 'FileText' },
    { id: 'validation', label: 'Validation', icon: 'CheckCircle' },
    { id: 'traceability', label: 'Traçabilité', icon: 'Link' },
    { id: 'audit', label: 'Audit', icon: 'History' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Validé': 'text-success',
      'En Attente': 'text-warning',
      'Expiré': 'text-error',
      'Révoqué': 'text-secondary'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Certificat Numérique
            </h2>
            <p className="text-sm text-muted-foreground font-mono">
              {certificate?.id}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => onDownloadPDF(certificate)}
            >
              Télécharger PDF
            </Button>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Certificate Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    Informations Générales
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID Certificat:</span>
                      <span className="font-mono text-foreground">{certificate?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cycle de Stérilisation:</span>
                      <span className="font-mono text-foreground">{certificate?.cycleId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Set d'Instruments:</span>
                      <span className="text-foreground">{certificate?.instrumentSet}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nombre d'Instruments:</span>
                      <span className="text-foreground">{certificate?.instrumentCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Statut:</span>
                      <span className={`font-medium ${getStatusColor(certificate?.status)}`}>
                        {certificate?.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    Paramètres de Stérilisation
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="text-foreground">{certificate?.sterilizationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Heure:</span>
                      <span className="text-foreground">{certificate?.sterilizationTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Température:</span>
                      <span className="text-foreground">{certificate?.temperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pression:</span>
                      <span className="text-foreground">{certificate?.pressure} bar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée:</span>
                      <span className="text-foreground">{certificate?.duration} min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Signature */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Signature Numérique</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Signé par:</span>
                    <span className="ml-2 text-foreground">{certificate?.signedBy}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date de signature:</span>
                    <span className="ml-2 text-foreground">{certificate?.signedAt}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-muted-foreground">Empreinte SHA-256:</span>
                    <span className="ml-2 font-mono text-xs text-foreground break-all">
                      {certificate?.digitalSignature}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">
                Résultats de Validation
              </h3>

              {/* Validation Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Beaker" size={20} className="text-primary" />
                    <h4 className="font-medium text-foreground">Indicateur Chimique</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Résultat:</span>
                      <span className={`font-medium ${
                        certificate?.validation?.chemical === 'Conforme' ? 'text-success' : 'text-error'
                      }`}>
                        {certificate?.validation?.chemical}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lot:</span>
                      <span className="text-foreground">{certificate?.validation?.chemicalLot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expiration:</span>
                      <span className="text-foreground">{certificate?.validation?.chemicalExpiry}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Bug" size={20} className="text-primary" />
                    <h4 className="font-medium text-foreground">Indicateur Biologique</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Résultat:</span>
                      <span className={`font-medium ${
                        certificate?.validation?.biological === 'Négatif' ? 'text-success' : 'text-error'
                      }`}>
                        {certificate?.validation?.biological}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lot:</span>
                      <span className="text-foreground">{certificate?.validation?.biologicalLot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Incubation:</span>
                      <span className="text-foreground">{certificate?.validation?.incubationTime}h</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Gauge" size={20} className="text-primary" />
                    <h4 className="font-medium text-foreground">Paramètres Physiques</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Résultat:</span>
                      <span className={`font-medium ${
                        certificate?.validation?.physical === 'Conforme' ? 'text-success' : 'text-error'
                      }`}>
                        {certificate?.validation?.physical}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tolérance T°:</span>
                      <span className="text-foreground">±2°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tolérance P:</span>
                      <span className="text-foreground">±0.1 bar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Validation Status */}
              <div className={`
                rounded-lg p-4 border-2
                ${certificate?.status === 'Validé' ?'bg-success/10 border-success/20' :'bg-error/10 border-error/20'
                }
              `}>
                <div className="flex items-center gap-2">
                  <Icon 
                    name={certificate?.status === 'Validé' ? 'CheckCircle' : 'AlertCircle'} 
                    size={20} 
                    className={certificate?.status === 'Validé' ? 'text-success' : 'text-error'} 
                  />
                  <h4 className={`font-medium ${
                    certificate?.status === 'Validé' ? 'text-success' : 'text-error'
                  }`}>
                    Validation {certificate?.status === 'Validé' ? 'Réussie' : 'Échouée'}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {certificate?.status === 'Validé' ?'Tous les indicateurs de stérilisation sont conformes aux normes requises.' :'Un ou plusieurs indicateurs ne sont pas conformes. Vérification requise.'
                  }
                </p>
              </div>
            </div>
          )}

          {activeTab === 'traceability' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">
                Traçabilité Patient
              </h3>

              {certificate?.isLinkedToProcedure ? (
                <div className="space-y-4">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Link" size={20} className="text-success" />
                      <h4 className="font-medium text-success">Procédure Liée</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Procédure:</span>
                        <span className="ml-2 text-foreground">{certificate?.procedureName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="ml-2 text-foreground">{certificate?.procedureDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Chirurgien:</span>
                        <span className="ml-2 text-foreground">{certificate?.surgeon}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Salle d'Opération:</span>
                        <span className="ml-2 text-foreground">{certificate?.operatingRoom}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ID Patient:</span>
                        <span className="ml-2 font-mono text-foreground">{certificate?.patientId}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Lié le:</span>
                        <span className="ml-2 text-foreground">{certificate?.linkedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-3">Historique de Traçabilité</h4>
                    <div className="space-y-2 text-sm">
                      {certificate?.traceabilityHistory?.map((event, index) => (
                        <div key={index} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                          <div className="flex-1">
                            <span className="text-foreground">{event?.action}</span>
                            <span className="text-muted-foreground ml-2">par {event?.user}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{event?.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="Unlink" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    Aucune Procédure Liée
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Ce certificat n'est pas encore lié à une procédure chirurgicale.
                  </p>
                  <Button
                    variant="primary"
                    iconName="Link"
                    iconPosition="left"
                    onClick={() => onLinkProcedure(certificate)}
                  >
                    Lier à une Procédure
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">
                Journal d'Audit
              </h3>

              <div className="space-y-4">
                {certificate?.auditTrail?.map((entry, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon name={entry?.icon} size={16} className="text-primary" />
                        <h4 className="font-medium text-foreground">{entry?.action}</h4>
                      </div>
                      <span className="text-xs text-muted-foreground">{entry?.timestamp}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{entry?.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Utilisateur: {entry?.user}</span>
                      <span>IP: {entry?.ipAddress}</span>
                      <span>Session: {entry?.sessionId}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-muted-foreground">
            Certificat généré le {certificate?.generatedAt} par {certificate?.generatedBy}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button
              variant="primary"
              iconName="Download"
              iconPosition="left"
              onClick={() => onDownloadPDF(certificate)}
            >
              Télécharger PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetailsModal;