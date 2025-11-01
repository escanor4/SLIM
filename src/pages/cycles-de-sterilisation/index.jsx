import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickScanAccess from '../../components/ui/QuickScanAccess';

// Import components
import CycleFilters from './components/CycleFilters';
import CycleTable from './components/CycleTable';
import CycleInitiationPanel from './components/CycleInitiationPanel';
import ValidationSection from './components/ValidationSection';
import CycleDetailsModal from './components/CycleDetailsModal';

const CyclesSterilisation = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [cycles, setCycles] = useState([]);
  const [filteredCycles, setFilteredCycles] = useState([]);
  const [filters, setFilters] = useState({});
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [resultCounts, setResultCounts] = useState({
    total: 0,
    validated: 0,
    inProgress: 0,
    failed: 0
  });

  // Mock data for cycles
  const mockCycles = [
    {
      id: 'CYC-240001',
      equipment: {
        name: 'Autoclave A1',
        location: 'Salle de Stérilisation 1',
        id: 'autoclave-1'
      },
      instrumentSets: [
        {
          name: 'Set Chirurgie Générale',
          category: 'Chirurgie',
          count: 15,
          code: 'SET-CHG-001'
        },
        {
          name: 'Set Orthopédie',
          category: 'Orthopédie',
          count: 12,
          code: 'SET-ORT-003'
        }
      ],
      startTime: '2024-10-31T08:30:00Z',
      duration: 65,
      status: 'valide',
      parameters: {
        temperature: '134',
        pressure: '2.1',
        exposureTime: '5',
        dryingTime: '20'
      },
      validation: {
        status: 'valide',
        chemicalIndicator: {
          result: 'valide',
          batchNumber: 'CI-2024-1001',
          expiryDate: '2025-12-31'
        },
        biologicalIndicator: {
          result: 'valide',
          batchNumber: 'BI-2024-0501',
          expiryDate: '2025-06-30'
        }
      },
      operator: 'Marie Dubois'
    },
    {
      id: 'CYC-240002',
      equipment: {
        name: 'Autoclave A2',
        location: 'Salle de Stérilisation 1',
        id: 'autoclave-2'
      },
      instrumentSets: [
        {
          name: 'Set Cardiologie',
          category: 'Cardiologie',
          count: 8,
          code: 'SET-CAR-002'
        }
      ],
      startTime: '2024-10-31T10:15:00Z',
      duration: 45,
      status: 'en-cours',
      parameters: {
        temperature: '121',
        pressure: '1.1',
        exposureTime: '15',
        dryingTime: '30'
      },
      validation: {
        status: 'en-attente'
      },
      operator: 'Pierre Martin'
    },
    {
      id: 'CYC-240003',
      equipment: {
        name: 'Stérilisateur Plasma P1',
        location: 'Salle de Stérilisation 2',
        id: 'plasma-1'
      },
      instrumentSets: [
        {
          name: 'Set Endoscopie',
          category: 'Endoscopie',
          count: 6,
          code: 'SET-END-001'
        },
        {
          name: 'Set Laparoscopie',
          category: 'Laparoscopie',
          count: 10,
          code: 'SET-LAP-002'
        }
      ],
      startTime: '2024-10-31T14:00:00Z',
      duration: 75,
      status: 'echec',
      parameters: {
        temperature: '50',
        pressure: '0.1',
        exposureTime: '45',
        dryingTime: '0'
      },
      validation: {
        status: 'echec',
        chemicalIndicator: {
          result: 'echec',
          batchNumber: 'CI-2024-1002',
          expiryDate: '2025-12-31'
        }
      },
      operator: 'Sophie Leroy'
    },
    {
      id: 'CYC-240004',
      equipment: {
        name: 'Autoclave B1',
        location: 'Salle de Stérilisation 2',
        id: 'autoclave-3'
      },
      instrumentSets: [
        {
          name: 'Set Neurochirurgie',
          category: 'Neurochirurgie',
          count: 20,
          code: 'SET-NEU-001'
        }
      ],
      startTime: '2024-10-30T16:45:00Z',
      duration: 85,
      status: 'valide',
      parameters: {
        temperature: '134',
        pressure: '2.1',
        exposureTime: '18',
        dryingTime: '20'
      },
      validation: {
        status: 'valide',
        chemicalIndicator: {
          result: 'valide',
          batchNumber: 'CI-2024-1003',
          expiryDate: '2025-12-31'
        },
        biologicalIndicator: {
          result: 'valide',
          batchNumber: 'BI-2024-0502',
          expiryDate: '2025-06-30'
        }
      },
      operator: 'Jean Dupont'
    },
    {
      id: 'CYC-240005',
      equipment: {
        name: 'Autoclave A1',
        location: 'Salle de Stérilisation 1',
        id: 'autoclave-1'
      },
      instrumentSets: [
        {
          name: 'Set Ophtalmologie',
          category: 'Ophtalmologie',
          count: 7,
          code: 'SET-OPH-001'
        }
      ],
      startTime: '2024-10-30T09:20:00Z',
      duration: 55,
      status: 'termine',
      parameters: {
        temperature: '132',
        pressure: '2.0',
        exposureTime: '3',
        dryingTime: '0'
      },
      validation: {
        status: 'en-attente'
      },
      operator: 'Marie Dubois'
    }
  ];

  // Mock available equipment
  const availableEquipment = [
    {
      id: 'autoclave-1',
      name: 'Autoclave A1',
      location: 'Salle de Stérilisation 1',
      status: 'Disponible'
    },
    {
      id: 'autoclave-2',
      name: 'Autoclave A2',
      location: 'Salle de Stérilisation 1',
      status: 'En Cours'
    },
    {
      id: 'autoclave-3',
      name: 'Autoclave B1',
      location: 'Salle de Stérilisation 2',
      status: 'Disponible'
    },
    {
      id: 'plasma-1',
      name: 'Stérilisateur Plasma P1',
      location: 'Salle de Stérilisation 2',
      status: 'Maintenance'
    },
    {
      id: 'plasma-2',
      name: 'Stérilisateur Plasma P2',
      location: 'Salle de Stérilisation 2',
      status: 'Disponible'
    }
  ];

  // Mock available instrument sets
  const availableInstrumentSets = [
    {
      id: 'set-001',
      name: 'Set Chirurgie Générale Standard',
      category: 'Chirurgie Générale',
      instrumentCount: 15,
      code: 'SET-CHG-001'
    },
    {
      id: 'set-002',
      name: 'Set Orthopédie Complète',
      category: 'Orthopédie',
      instrumentCount: 12,
      code: 'SET-ORT-003'
    },
    {
      id: 'set-003',
      name: 'Set Cardiologie Interventionnelle',
      category: 'Cardiologie',
      instrumentCount: 8,
      code: 'SET-CAR-002'
    },
    {
      id: 'set-004',
      name: 'Set Endoscopie Digestive',
      category: 'Endoscopie',
      instrumentCount: 6,
      code: 'SET-END-001'
    },
    {
      id: 'set-005',
      name: 'Set Laparoscopie Avancée',
      category: 'Laparoscopie',
      instrumentCount: 10,
      code: 'SET-LAP-002'
    },
    {
      id: 'set-006',
      name: 'Set Neurochirurgie Microchirurgie',
      category: 'Neurochirurgie',
      instrumentCount: 20,
      code: 'SET-NEU-001'
    },
    {
      id: 'set-007',
      name: 'Set Ophtalmologie Précision',
      category: 'Ophtalmologie',
      instrumentCount: 7,
      code: 'SET-OPH-001'
    }
  ];

  useEffect(() => {
    setCycles(mockCycles);
    setFilteredCycles(mockCycles);
    calculateResultCounts(mockCycles);
  }, []);

  const calculateResultCounts = (cycleList) => {
    const counts = {
      total: cycleList?.length,
      validated: cycleList?.filter(c => c?.validation?.status === 'valide')?.length,
      inProgress: cycleList?.filter(c => c?.status === 'en-cours')?.length,
      failed: cycleList?.filter(c => c?.validation?.status === 'echec')?.length
    };
    setResultCounts(counts);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    
    let filtered = cycles;
    
    // Apply equipment filter
    if (newFilters?.equipment) {
      filtered = filtered?.filter(cycle => cycle?.equipment?.id === newFilters?.equipment);
    }
    
    // Apply status filter
    if (newFilters?.status) {
      filtered = filtered?.filter(cycle => cycle?.status === newFilters?.status);
    }
    
    // Apply validation status filter
    if (newFilters?.validationStatus) {
      filtered = filtered?.filter(cycle => cycle?.validation?.status === newFilters?.validationStatus);
    }
    
    // Apply date range filter
    if (newFilters?.dateRange?.start) {
      filtered = filtered?.filter(cycle => 
        new Date(cycle.startTime) >= new Date(newFilters.dateRange.start)
      );
    }
    
    if (newFilters?.dateRange?.end) {
      filtered = filtered?.filter(cycle => 
        new Date(cycle.startTime) <= new Date(newFilters.dateRange.end + 'T23:59:59')
      );
    }
    
    // Apply cycle ID search
    if (newFilters?.cycleId) {
      filtered = filtered?.filter(cycle => 
        cycle?.id?.toLowerCase()?.includes(newFilters?.cycleId?.toLowerCase())
      );
    }
    
    setFilteredCycles(filtered);
    calculateResultCounts(filtered);
  };

  const handleInitiateCycle = (newCycle) => {
    const updatedCycles = [newCycle, ...cycles];
    setCycles(updatedCycles);
    setFilteredCycles(updatedCycles);
    calculateResultCounts(updatedCycles);
    
    // Show success notification
    alert(`Cycle ${newCycle?.id} initié avec succès !`);
  };

  const handleViewDetails = (cycle) => {
    setSelectedCycle(cycle);
    setShowDetailsModal(true);
  };

  const handleGenerateCertificate = (cycle) => {
    if (cycle?.validation?.status === 'valide') {
      alert(`Génération du certificat pour le cycle ${cycle?.id}...`);
      // Here you would typically navigate to certificate generation or download
    } else {
      alert('Le cycle doit être validé avant de générer un certificat.');
    }
  };

  const handleViewValidation = (cycle) => {
    setSelectedCycle(cycle);
    setShowValidationModal(true);
  };

  const handleUpdateValidation = (cycleId, validationData) => {
    const updatedCycles = cycles?.map(cycle => 
      cycle?.id === cycleId 
        ? { 
            ...cycle, 
            validation: { 
              ...cycle?.validation, 
              ...validationData,
              status: validationData?.overallResult 
            } 
          }
        : cycle
    );
    
    setCycles(updatedCycles);
    setFilteredCycles(updatedCycles);
    calculateResultCounts(updatedCycles);
    setShowValidationModal(false);
    
    alert(`Validation du cycle ${cycleId} mise à jour avec succès !`);
  };

  const handleScanComplete = (scanResult) => {
    // Handle scan result - could be used to quickly find cycles or instruments
    alert(`Scan terminé: ${scanResult?.code}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`
        transition-all duration-300 pt-16
        ${isSidebarCollapsed ? 'ml-16' : 'ml-72'}
      `}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  Cycles de Stérilisation
                </h1>
                <p className="text-muted-foreground mt-1">
                  Gestion et suivi des cycles de stérilisation des instruments médicaux
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => {
                    setFilteredCycles(cycles);
                    calculateResultCounts(cycles);
                  }}
                >
                  Actualiser
                </Button>
                
                <Button
                  variant="primary"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => {
                    // Scroll to initiation panel
                    document.querySelector('.cycle-initiation-panel')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Nouveau Cycle
                </Button>
              </div>
            </div>
          </div>

          {/* Cycle Initiation Panel */}
          <div className="cycle-initiation-panel">
            <CycleInitiationPanel
              onInitiateCycle={handleInitiateCycle}
              availableEquipment={availableEquipment}
              availableInstrumentSets={availableInstrumentSets}
            />
          </div>

          {/* Filters */}
          <CycleFilters
            onFiltersChange={handleFiltersChange}
            resultCounts={resultCounts}
          />

          {/* Cycles Table */}
          <CycleTable
            cycles={filteredCycles}
            onViewDetails={handleViewDetails}
            onGenerateCertificate={handleGenerateCertificate}
            onViewValidation={handleViewValidation}
          />

          {/* Empty State */}
          {filteredCycles?.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucun cycle trouvé
              </h3>
              <p className="text-muted-foreground mb-4">
                Aucun cycle de stérilisation ne correspond aux critères de recherche.
              </p>
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => {
                  setFilters({});
                  setFilteredCycles(cycles);
                  calculateResultCounts(cycles);
                }}
              >
                Réinitialiser les Filtres
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      {showValidationModal && selectedCycle && (
        <ValidationSection
          cycle={selectedCycle}
          onUpdateValidation={handleUpdateValidation}
          onClose={() => setShowValidationModal(false)}
        />
      )}
      {showDetailsModal && selectedCycle && (
        <CycleDetailsModal
          cycle={selectedCycle}
          onClose={() => setShowDetailsModal(false)}
          onGenerateCertificate={handleGenerateCertificate}
        />
      )}
      {/* Quick Scan Access */}
      <QuickScanAccess
        onScanComplete={handleScanComplete}
        isFloating={true}
      />
    </div>
  );
};

export default CyclesSterilisation;