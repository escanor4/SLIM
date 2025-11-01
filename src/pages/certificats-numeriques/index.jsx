import React, { useState, useEffect } from 'react';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickScanAccess from '../../components/ui/QuickScanAccess';
import CertificateTable from './components/CertificateTable';
import CertificateSearchFilters from './components/CertificateSearchFilters';
import CertificateGenerationPanel from './components/CertificateGenerationPanel';
import CertificateDetailsModal from './components/CertificateDetailsModal';
import BulkOperationsPanel from './components/BulkOperationsPanel';
import ProcedureLinkingModal from './components/ProcedureLinkingModal';

const CertificatsNumeriques = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showLinkingModal, setShowLinkingModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState('list'); // 'list' | 'generation'

  // Mock data for certificates
  const mockCertificates = [
    {
      id: "CERT-2024-001234",
      cycleId: "CYC-20241031-001",
      instrumentSet: "Set Chirurgie Générale A",
      instrumentCount: 12,
      sterilizationDate: "31/10/2024",
      sterilizationTime: "14:30",
      status: "Validé",
      isLinkedToProcedure: true,
      procedureName: "Appendicectomie Laparoscopique",
      procedureDate: "31/10/2024",
      surgeon: "Dr. Martin Dubois",
      operatingRoom: "Bloc 3",
      patientId: "PAT-789456",
      linkedAt: "31/10/2024 16:45",
      temperature: 134,
      pressure: 2.1,
      duration: 18,
      signedBy: "Marie Dubois",
      signedAt: "31/10/2024 15:15",
      generatedAt: "31/10/2024 15:15",
      generatedBy: "Marie Dubois",
      digitalSignature: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      validation: {
        chemical: "Conforme",
        chemicalLot: "CHM-2024-456",
        chemicalExpiry: "15/12/2024",
        biological: "Négatif",
        biologicalLot: "BIO-2024-789",
        incubationTime: 48,
        physical: "Conforme"
      },
      traceabilityHistory: [
        {
          action: "Certificat généré",
          user: "Marie Dubois",
          timestamp: "31/10/2024 15:15"
        },
        {
          action: "Lié à la procédure PAT-789456",
          user: "Dr. Martin Dubois",
          timestamp: "31/10/2024 16:45"
        }
      ],
      auditTrail: [
        {
          action: "Génération du certificat",
          description: "Certificat créé automatiquement après validation du cycle CYC-20241031-001",
          user: "Marie Dubois",
          timestamp: "31/10/2024 15:15:23",
          ipAddress: "192.168.1.45",
          sessionId: "sess_abc123",
          icon: "FileText"
        },
        {
          action: "Signature numérique",
          description: "Certificat signé numériquement avec empreinte SHA-256",
          user: "Système SILM",
          timestamp: "31/10/2024 15:15:25",
          ipAddress: "192.168.1.45",
          sessionId: "sess_abc123",
          icon: "Shield"
        }
      ]
    },
    {
      id: "CERT-2024-001233",
      cycleId: "CYC-20241031-002",
      instrumentSet: "Set Orthopédie B",
      instrumentCount: 8,
      sterilizationDate: "31/10/2024",
      sterilizationTime: "12:15",
      status: "Validé",
      isLinkedToProcedure: false,
      temperature: 134,
      pressure: 2.0,
      duration: 20,
      signedBy: "Pierre Martin",
      signedAt: "31/10/2024 13:00",
      generatedAt: "31/10/2024 13:00",
      generatedBy: "Pierre Martin",
      digitalSignature: "b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567",
      validation: {
        chemical: "Conforme",
        chemicalLot: "CHM-2024-457",
        chemicalExpiry: "20/12/2024",
        biological: "Négatif",
        biologicalLot: "BIO-2024-790",
        incubationTime: 48,
        physical: "Conforme"
      },
      traceabilityHistory: [
        {
          action: "Certificat généré",
          user: "Pierre Martin",
          timestamp: "31/10/2024 13:00"
        }
      ],
      auditTrail: [
        {
          action: "Génération du certificat",
          description: "Certificat créé automatiquement après validation du cycle CYC-20241031-002",
          user: "Pierre Martin",
          timestamp: "31/10/2024 13:00:15",
          ipAddress: "192.168.1.46",
          sessionId: "sess_def456",
          icon: "FileText"
        }
      ]
    },
    {
      id: "CERT-2024-001232",
      cycleId: "CYC-20241030-015",
      instrumentSet: "Set Cardiologie Premium",
      instrumentCount: 15,
      sterilizationDate: "30/10/2024",
      sterilizationTime: "16:45",
      status: "En Attente",
      isLinkedToProcedure: false,
      temperature: 134,
      pressure: 2.1,
      duration: 22,
      signedBy: "Sophie Laurent",
      signedAt: "30/10/2024 17:30",
      generatedAt: "30/10/2024 17:30",
      generatedBy: "Sophie Laurent",
      digitalSignature: "c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678",
      validation: {
        chemical: "Conforme",
        chemicalLot: "CHM-2024-458",
        chemicalExpiry: "25/12/2024",
        biological: "En Cours",
        biologicalLot: "BIO-2024-791",
        incubationTime: 24,
        physical: "Conforme"
      },
      traceabilityHistory: [
        {
          action: "Certificat généré",
          user: "Sophie Laurent",
          timestamp: "30/10/2024 17:30"
        }
      ],
      auditTrail: [
        {
          action: "Génération du certificat",
          description: "Certificat créé - En attente de validation biologique",
          user: "Sophie Laurent",
          timestamp: "30/10/2024 17:30:42",
          ipAddress: "192.168.1.47",
          sessionId: "sess_ghi789",
          icon: "Clock"
        }
      ]
    }
  ];

  // Mock data for available cycles
  const mockAvailableCycles = [
    {
      id: "CYC-20241031-003",
      instrumentSet: "Set Neurochirurgie A",
      completedAt: "31/10/2024 18:30",
      temperature: 134,
      pressure: 2.1,
      duration: 25,
      technician: "Marie Dubois",
      autoclave: "Autoclave-02"
    },
    {
      id: "CYC-20241031-004",
      instrumentSet: "Set Ophtalmologie B",
      completedAt: "31/10/2024 19:15",
      temperature: 134,
      pressure: 2.0,
      duration: 18,
      technician: "Pierre Martin",
      autoclave: "Autoclave-01"
    }
  ];

  // Mock data for available procedures
  const mockAvailableProcedures = [
    {
      id: "PROC-001",
      name: "Arthroplastie Genou Droit",
      patientId: "PAT-123456",
      date: "01/11/2024",
      surgeon: "Dr. Claire Moreau",
      operatingRoom: "Bloc 1",
      status: "Programmée"
    },
    {
      id: "PROC-002",
      name: "Cholécystectomie Laparoscopique",
      patientId: "PAT-654321",
      date: "01/11/2024",
      surgeon: "Dr. Jean Dupont",
      operatingRoom: "Bloc 2",
      status: "Programmée"
    },
    {
      id: "PROC-003",
      name: "Craniotomie Frontale",
      patientId: "PAT-987654",
      date: "02/11/2024",
      surgeon: "Dr. Michel Bernard",
      operatingRoom: "Bloc 4",
      status: "Programmée"
    }
  ];

  useEffect(() => {
    setCertificates(mockCertificates);
    setFilteredCertificates(mockCertificates);
  }, []);

  const handleSearch = (filters) => {
    let filtered = [...certificates];

    if (filters?.searchTerm) {
      const term = filters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter(cert =>
        cert?.id?.toLowerCase()?.includes(term) ||
        cert?.instrumentSet?.toLowerCase()?.includes(term) ||
        cert?.procedureName?.toLowerCase()?.includes(term)
      );
    }

    if (filters?.dateRange?.start) {
      filtered = filtered?.filter(cert => {
        const certDate = new Date(cert.sterilizationDate.split('/').reverse().join('-'));
        const startDate = new Date(filters.dateRange.start);
        const endDate = filters?.dateRange?.end ? new Date(filters.dateRange.end) : new Date();
        return certDate >= startDate && certDate <= endDate;
      });
    }

    if (filters?.status) {
      filtered = filtered?.filter(cert => cert?.status === filters?.status);
    }

    if (filters?.procedure) {
      if (filters?.procedure === 'linked') {
        filtered = filtered?.filter(cert => cert?.isLinkedToProcedure);
      } else if (filters?.procedure === 'unlinked') {
        filtered = filtered?.filter(cert => !cert?.isLinkedToProcedure);
      }
    }

    setFilteredCertificates(filtered);
  };

  const handleClearFilters = () => {
    setFilteredCertificates(certificates);
  };

  const handleSelectCertificate = (certificateId) => {
    setSelectedCertificates(prev => 
      prev?.includes(certificateId)
        ? prev?.filter(id => id !== certificateId)
        : [...prev, certificateId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCertificates(
      selectedCertificates?.length === filteredCertificates?.length 
        ? [] 
        : filteredCertificates?.map(cert => cert?.id)
    );
  };

  const handleViewDetails = (certificate) => {
    setSelectedCertificate(certificate);
    setShowDetailsModal(true);
  };

  const handleDownloadPDF = (certificate) => {
    // Simulate PDF download
    console.log('Téléchargement PDF pour:', certificate?.id);
    // In real implementation, this would trigger a PDF generation and download
  };

  const handleLinkProcedure = (certificate) => {
    setSelectedCertificate(certificate);
    setShowLinkingModal(true);
  };

  const handleViewAuditTrail = (certificate) => {
    setSelectedCertificate(certificate);
    setShowDetailsModal(true);
    // The modal will open with the audit tab active
  };

  const handleGenerateCertificate = async (certificateData) => {
    setIsGenerating(true);
    
    // Simulate certificate generation
    setTimeout(() => {
      const newCertificate = {
        id: `CERT-2024-${String(Date.now())?.slice(-6)}`,
        cycleId: certificateData?.cycleId,
        instrumentSet: certificateData?.cycleData?.instrumentSet,
        instrumentCount: Math.floor(Math.random() * 15) + 5,
        sterilizationDate: new Date()?.toLocaleDateString('fr-FR'),
        sterilizationTime: new Date()?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        status: "Validé",
        isLinkedToProcedure: false,
        temperature: certificateData?.cycleData?.temperature,
        pressure: certificateData?.cycleData?.pressure,
        duration: certificateData?.cycleData?.duration,
        signedBy: certificateData?.generatedBy,
        signedAt: new Date()?.toLocaleString('fr-FR'),
        generatedAt: new Date()?.toLocaleString('fr-FR'),
        generatedBy: certificateData?.generatedBy,
        digitalSignature: Math.random()?.toString(36)?.substr(2, 64),
        validation: certificateData?.validationResults,
        traceabilityHistory: [
          {
            action: "Certificat généré",
            user: certificateData?.generatedBy,
            timestamp: new Date()?.toLocaleString('fr-FR')
          }
        ],
        auditTrail: [
          {
            action: "Génération du certificat",
            description: `Certificat créé automatiquement après validation du cycle ${certificateData?.cycleId}`,
            user: certificateData?.generatedBy,
            timestamp: new Date()?.toLocaleString('fr-FR'),
            ipAddress: "192.168.1.45",
            sessionId: "sess_" + Math.random()?.toString(36)?.substr(2, 6),
            icon: "FileText"
          }
        ]
      };

      const updatedCertificates = [newCertificate, ...certificates];
      setCertificates(updatedCertificates);
      setFilteredCertificates(updatedCertificates);
      setIsGenerating(false);
      setActiveView('list');
    }, 2000);
  };

  const handleBulkDownload = async (certificateIds) => {
    console.log('Téléchargement en lot pour:', certificateIds);
    // Simulate bulk download
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleBulkLink = async (certificateIds) => {
    console.log('Liaison en lot pour:', certificateIds);
    // Simulate bulk linking
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleBulkExport = async (certificateIds, format) => {
    console.log('Export en lot:', format, 'pour:', certificateIds);
    // Simulate bulk export
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleProcedureLinking = async (certificate, procedureData) => {
    // Update certificate with procedure link
    const updatedCertificates = certificates?.map(cert => 
      cert?.id === certificate?.id 
        ? {
            ...cert,
            isLinkedToProcedure: true,
            procedureName: procedureData?.name,
            procedureDate: procedureData?.date,
            surgeon: procedureData?.surgeon,
            operatingRoom: procedureData?.operatingRoom,
            patientId: procedureData?.patientId,
            linkedAt: new Date()?.toLocaleString('fr-FR'),
            traceabilityHistory: [
              ...cert?.traceabilityHistory,
              {
                action: `Lié à la procédure ${procedureData?.patientId}`,
                user: "Marie Dubois",
                timestamp: new Date()?.toLocaleString('fr-FR')
              }
            ]
          }
        : cert
    );
    
    setCertificates(updatedCertificates);
    setFilteredCertificates(updatedCertificates);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`
        transition-all duration-300 pt-16
        ${sidebarCollapsed ? 'ml-16' : 'ml-72'}
      `}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Certificats Numériques
              </h1>
              <p className="text-muted-foreground">
                Gestion des certificats de stérilisation et traçabilité patient
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <Button
                variant={activeView === 'list' ? 'primary' : 'outline'}
                iconName="List"
                iconPosition="left"
                onClick={() => setActiveView('list')}
              >
                Liste des Certificats
              </Button>
              
              <Button
                variant={activeView === 'generation' ? 'primary' : 'outline'}
                iconName="Plus"
                iconPosition="left"
                onClick={() => setActiveView('generation')}
              >
                Générer un Certificat
              </Button>
            </div>
          </div>

          {/* Main Content */}
          {activeView === 'list' ? (
            <div className="space-y-6">
              {/* Search and Filters */}
              <CertificateSearchFilters
                onSearch={handleSearch}
                onFilterChange={handleSearch}
                onClearFilters={handleClearFilters}
                totalResults={filteredCertificates?.length}
              />

              {/* Certificates Table */}
              <CertificateTable
                certificates={filteredCertificates}
                onViewDetails={handleViewDetails}
                onDownloadPDF={handleDownloadPDF}
                onLinkProcedure={handleLinkProcedure}
                onViewAuditTrail={handleViewAuditTrail}
                selectedCertificates={selectedCertificates}
                onSelectCertificate={handleSelectCertificate}
                onSelectAll={handleSelectAll}
              />
            </div>
          ) : (
            <div className="max-w-4xl">
              <CertificateGenerationPanel
                onGenerateCertificate={handleGenerateCertificate}
                availableCycles={mockAvailableCycles}
                isGenerating={isGenerating}
              />
            </div>
          )}
        </div>
      </main>
      {/* Bulk Operations Panel */}
      <BulkOperationsPanel
        selectedCertificates={selectedCertificates}
        onBulkDownload={handleBulkDownload}
        onBulkLink={handleBulkLink}
        onBulkExport={handleBulkExport}
        onClearSelection={() => setSelectedCertificates([])}
      />
      {/* Certificate Details Modal */}
      {showDetailsModal && (
        <CertificateDetailsModal
          certificate={selectedCertificate}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCertificate(null);
          }}
          onDownloadPDF={handleDownloadPDF}
          onLinkProcedure={handleLinkProcedure}
        />
      )}
      {/* Procedure Linking Modal */}
      {showLinkingModal && (
        <ProcedureLinkingModal
          certificate={selectedCertificate}
          availableProcedures={mockAvailableProcedures}
          onClose={() => {
            setShowLinkingModal(false);
            setSelectedCertificate(null);
          }}
          onLinkProcedure={handleProcedureLinking}
        />
      )}
      {/* Quick Scan Access */}
      <QuickScanAccess />
    </div>
  );
};

export default CertificatsNumeriques;