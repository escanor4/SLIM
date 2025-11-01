import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InstrumentDetailsModal = ({ instrument, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !instrument) return null;

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'Eye' },
    { id: 'history', label: 'Historique', icon: 'History' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
    { id: 'certificates', label: 'Certificats', icon: 'Shield' }
  ];

  const sterilizationHistory = [
    {
      id: 'STER-2024-1031-001',
      date: '31/10/2024 14:30',
      cycle: 'Cycle Standard 134°C',
      technician: 'Marie Dubois',
      status: 'Validé',
      temperature: '134°C',
      pressure: '2.1 bar',
      duration: '15 min'
    },
    {
      id: 'STER-2024-1030-045',
      date: '30/10/2024 09:15',
      cycle: 'Cycle Standard 134°C',
      technician: 'Pierre Martin',
      status: 'Validé',
      temperature: '134°C',
      pressure: '2.1 bar',
      duration: '15 min'
    },
    {
      id: 'STER-2024-1029-023',
      date: '29/10/2024 16:45',
      cycle: 'Cycle Standard 134°C',
      technician: 'Sophie Laurent',
      status: 'Validé',
      temperature: '134°C',
      pressure: '2.1 bar',
      duration: '15 min'
    }
  ];

  const maintenanceHistory = [
    {
      id: 'MAINT-2024-1025-001',
      date: '25/10/2024',
      type: 'Maintenance Préventive',
      technician: 'Service Technique',
      description: 'Vérification de l\'articulation et nettoyage approfondi',
      status: 'Terminé',
      nextDue: '25/01/2025'
    },
    {
      id: 'MAINT-2024-0925-003',
      date: '25/09/2024',
      type: 'Inspection Visuelle',
      technician: 'Marie Dubois',
      description: 'Contrôle de l\'état général et des surfaces',
      status: 'Terminé',
      nextDue: '25/12/2024'
    }
  ];

  const certificates = [
    {
      id: 'CERT-2024-1031-001',
      date: '31/10/2024 14:30',
      type: 'Certificat de Stérilisation',
      status: 'Valide',
      expiryDate: '07/11/2024',
      downloadUrl: '#'
    },
    {
      id: 'CERT-2024-1030-045',
      date: '30/10/2024 09:15',
      type: 'Certificat de Stérilisation',
      status: 'Expiré',
      expiryDate: '06/11/2024',
      downloadUrl: '#'
    }
  ];

  const statusConfig = {
    'Stérilisé': { color: 'bg-success text-success-foreground', icon: 'CheckCircle' },
    'En Cours': { color: 'bg-warning text-warning-foreground', icon: 'Clock' },
    'Maintenance': { color: 'bg-error text-error-foreground', icon: 'AlertTriangle' },
    'Disponible': { color: 'bg-primary text-primary-foreground', icon: 'Shield' }
  };

  const currentStatus = statusConfig?.[instrument?.status] || statusConfig?.['Disponible'];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">ID Instrument</label>
            <div className="text-lg font-semibold text-foreground">{instrument?.id}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nom</label>
            <div className="text-lg font-medium text-foreground">{instrument?.name}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Catégorie</label>
            <div className="text-foreground">{instrument?.category}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Set d'Instruments</label>
            <div className="text-foreground">{instrument?.setName}</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Statut Actuel</label>
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStatus?.color}`}>
              <Icon name={currentStatus?.icon} size={16} />
              {instrument?.status}
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Localisation</label>
            <div className="text-foreground">{instrument?.location}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Utilisations</label>
            <div className="text-foreground">
              {instrument?.usageCount} / {instrument?.maxUsage}
              <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(instrument?.usageCount / instrument?.maxUsage) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Dernière Maintenance</label>
            <div className="text-foreground">{instrument?.lastMaintenance}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        <Button variant="primary" iconName="Wrench" iconPosition="left">
          Programmer Maintenance
        </Button>
        <Button variant="outline" iconName="MapPin" iconPosition="left">
          Mettre à Jour Localisation
        </Button>
        <Button variant="outline" iconName="Download" iconPosition="left">
          Exporter Données
        </Button>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Historique de Stérilisation</h4>
      {sterilizationHistory?.map((record) => (
        <div key={record?.id} className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-foreground">{record?.id}</div>
            <span className="text-sm px-2 py-1 bg-success/10 text-success rounded-md">
              {record?.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Date:</span> {record?.date}
            </div>
            <div>
              <span className="text-muted-foreground">Technicien:</span> {record?.technician}
            </div>
            <div>
              <span className="text-muted-foreground">Cycle:</span> {record?.cycle}
            </div>
            <div>
              <span className="text-muted-foreground">Durée:</span> {record?.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Historique de Maintenance</h4>
      {maintenanceHistory?.map((record) => (
        <div key={record?.id} className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-foreground">{record?.type}</div>
            <span className="text-sm px-2 py-1 bg-success/10 text-success rounded-md">
              {record?.status}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Date:</span> {record?.date}
            </div>
            <div>
              <span className="text-muted-foreground">Technicien:</span> {record?.technician}
            </div>
            <div>
              <span className="text-muted-foreground">Description:</span> {record?.description}
            </div>
            <div>
              <span className="text-muted-foreground">Prochaine maintenance:</span> {record?.nextDue}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Certificats de Stérilisation</h4>
      {certificates?.map((cert) => (
        <div key={cert?.id} className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-foreground">{cert?.id}</div>
            <span className={`text-sm px-2 py-1 rounded-md ${
              cert?.status === 'Valide' ?'bg-success/10 text-success' :'bg-error/10 text-error'
            }`}>
              {cert?.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <span className="text-muted-foreground">Date d'émission:</span> {cert?.date}
            </div>
            <div>
              <span className="text-muted-foreground">Date d'expiration:</span> {cert?.expiryDate}
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Télécharger
          </Button>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'history': return renderHistory();
      case 'maintenance': return renderMaintenance();
      case 'certificates': return renderCertificates();
      default: return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{instrument?.name}</h2>
            <p className="text-sm text-muted-foreground">{instrument?.id}</p>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetailsModal;