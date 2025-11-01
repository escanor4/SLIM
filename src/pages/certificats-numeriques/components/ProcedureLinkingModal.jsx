import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProcedureLinkingModal = ({ 
  certificate, 
  onClose, 
  onLinkProcedure,
  availableProcedures = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [linkingMode, setLinkingMode] = useState('existing'); // 'existing' | 'manual'

  if (!certificate) return null;

  const filteredProcedures = availableProcedures?.filter(procedure =>
    procedure?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    procedure?.patientId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    procedure?.surgeon?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleLinkProcedure = async () => {
    setIsLinking(true);
    
    try {
      const linkData = linkingMode === 'existing' 
        ? selectedProcedure
        : {
            patientId: patientId?.trim(),
            name: 'Procédure Manuelle',
            date: new Date()?.toISOString()?.split('T')?.[0],
            surgeon: 'À Définir',
            operatingRoom: 'À Définir'
          };
      
      await onLinkProcedure(certificate, linkData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la liaison:', error);
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Lier à une Procédure
            </h2>
            <p className="text-sm text-muted-foreground">
              Certificat: {certificate?.id} - {certificate?.instrumentSet}
            </p>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Mode Selection */}
        <div className="p-6 border-b border-border">
          <div className="flex gap-4">
            <button
              onClick={() => setLinkingMode('existing')}
              className={`
                flex-1 p-4 rounded-lg border-2 transition-all duration-200
                ${linkingMode === 'existing' ?'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                }
              `}
            >
              <Icon name="Search" size={24} className="mx-auto mb-2" />
              <div className="font-medium">Procédure Existante</div>
              <div className="text-xs text-muted-foreground">
                Rechercher dans les procédures programmées
              </div>
            </button>

            <button
              onClick={() => setLinkingMode('manual')}
              className={`
                flex-1 p-4 rounded-lg border-2 transition-all duration-200
                ${linkingMode === 'manual' ?'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                }
              `}
            >
              <Icon name="Edit" size={24} className="mx-auto mb-2" />
              <div className="font-medium">Saisie Manuelle</div>
              <div className="text-xs text-muted-foreground">
                Saisir manuellement l'ID patient
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {linkingMode === 'existing' ? (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="text"
                  placeholder="Rechercher par nom de procédure, ID patient, ou chirurgien..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="pl-10"
                />
              </div>

              {/* Procedures List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredProcedures?.length > 0 ? (
                  filteredProcedures?.map(procedure => (
                    <button
                      key={procedure?.id}
                      onClick={() => setSelectedProcedure(procedure)}
                      className={`
                        w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
                        ${selectedProcedure?.id === procedure?.id
                          ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{procedure?.name}</h4>
                        <span className={`
                          px-2 py-1 text-xs rounded-md
                          ${procedure?.status === 'Programmée' ?'bg-warning/20 text-warning' :'bg-success/20 text-success'
                          }
                        `}>
                          {procedure?.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span>Patient: </span>
                          <span className="font-mono">{procedure?.patientId}</span>
                        </div>
                        <div>
                          <span>Date: </span>
                          <span>{procedure?.date}</span>
                        </div>
                        <div>
                          <span>Chirurgien: </span>
                          <span>{procedure?.surgeon}</span>
                        </div>
                        <div>
                          <span>Salle: </span>
                          <span>{procedure?.operatingRoom}</span>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h4 className="font-medium text-foreground mb-2">
                      Aucune procédure trouvée
                    </h4>
                    <p className="text-muted-foreground">
                      {searchTerm 
                        ? 'Aucune procédure ne correspond à votre recherche.' :'Aucune procédure disponible pour le moment.'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Input
                  label="ID Patient"
                  type="text"
                  placeholder="Saisir l'ID du patient..."
                  value={patientId}
                  onChange={(e) => setPatientId(e?.target?.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  L'ID patient sera utilisé pour créer un lien de traçabilité.
                </p>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-warning mb-1">Saisie Manuelle</div>
                    <div className="text-muted-foreground">
                      Cette option crée un lien de traçabilité basique. Pour une traçabilité complète, 
                      il est recommandé de lier à une procédure existante dans le système.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {linkingMode === 'existing' 
              ? selectedProcedure 
                ? `Procédure sélectionnée: ${selectedProcedure?.name}`
                : 'Sélectionnez une procédure pour continuer'
              : patientId?.trim()
                ? `ID Patient: ${patientId?.trim()}`
                : 'Saisissez un ID patient pour continuer'
            }
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              iconName="Link"
              iconPosition="left"
              onClick={handleLinkProcedure}
              disabled={
                isLinking || 
                (linkingMode === 'existing' && !selectedProcedure) ||
                (linkingMode === 'manual' && !patientId?.trim())
              }
              loading={isLinking}
            >
              {isLinking ? 'Liaison...' : 'Lier la Procédure'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcedureLinkingModal;