import React, { useState, useMemo } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickScanAccess from '../../components/ui/QuickScanAccess';
import InstrumentTable from './components/InstrumentTable';
import FilterControls from './components/FilterControls';
import ScanningInterface from './components/ScanningInterface';
import BulkOperations from './components/BulkOperations';
import InstrumentDetailsModal from './components/InstrumentDetailsModal';

const SuiviDesInstruments = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [recentScans, setRecentScans] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    status: '',
    category: '',
    maintenance: '',
    startDate: '',
    endDate: '',
    quickFilter: ''
  });

  // Mock data for instruments
  const mockInstruments = [
    {
      id: 'INST-FCH-001',
      name: 'Forceps Chirurgical Standard',
      category: 'Instruments de Base',
      setName: 'Set Chirurgie Générale #12',
      location: 'Bloc Opératoire',
      status: 'En Utilisation',
      usageCount: 245,
      maxUsage: 500,
      lastMaintenance: '25/10/2024',
      rfidTag: 'RFID-001-FCH',
      manufacturer: 'Aesculap',
      acquisitionDate: '15/03/2023'
    },
    {
      id: 'INST-CIS-002',
      name: 'Ciseaux Métzenbaum',
      category: 'Instruments de Base',
      setName: 'Set Chirurgie Générale #12',
      location: 'Zone de Lavage',
      status: 'En Cours',
      usageCount: 189,
      maxUsage: 400,
      lastMaintenance: '20/10/2024',
      rfidTag: 'RFID-002-CIS',
      manufacturer: 'Karl Storz',
      acquisitionDate: '22/05/2023'
    },
    {
      id: 'INST-PIN-003',
      name: 'Pince Anatomique',
      category: 'Instruments de Base',
      setName: 'Set Chirurgie Générale #15',
      location: 'Stérilisation',
      status: 'En Cours',
      usageCount: 156,
      maxUsage: 350,
      lastMaintenance: '18/10/2024',
      rfidTag: 'RFID-003-PIN',
      manufacturer: 'Aesculap',
      acquisitionDate: '10/07/2023'
    },
    {
      id: 'INST-SCL-004',
      name: 'Scalpel Électronique',
      category: 'Équipement Électronique',
      setName: 'Set Chirurgie Spécialisée #08',
      location: 'Stockage',
      status: 'Stérilisé',
      usageCount: 78,
      maxUsage: 200,
      lastMaintenance: '15/10/2024',
      rfidTag: 'RFID-004-SCL',
      manufacturer: 'Medtronic',
      acquisitionDate: '05/09/2023'
    },
    {
      id: 'INST-END-005',
      name: 'Endoscope Flexible',
      category: 'Instruments Optiques',
      setName: 'Set Endoscopie #03',
      location: 'Maintenance',
      status: 'Maintenance',
      usageCount: 423,
      maxUsage: 500,
      lastMaintenance: '12/10/2024',
      rfidTag: 'RFID-005-END',
      manufacturer: 'Olympus',
      acquisitionDate: '18/01/2023'
    },
    {
      id: 'INST-RTR-006',
      name: 'Rétracteur Automatique',
      category: 'Instruments Spécialisés',
      setName: 'Set Chirurgie Cardiaque #01',
      location: 'Stockage',
      status: 'Disponible',
      usageCount: 134,
      maxUsage: 300,
      lastMaintenance: '08/10/2024',
      rfidTag: 'RFID-006-RTR',
      manufacturer: 'Medtronic',
      acquisitionDate: '25/04/2023'
    },
    {
      id: 'INST-ASP-007',
      name: 'Aspirateur Chirurgical',
      category: 'Équipement Électronique',
      setName: 'Set Chirurgie Générale #18',
      location: 'Bloc Opératoire',
      status: 'En Utilisation',
      usageCount: 267,
      maxUsage: 400,
      lastMaintenance: '05/10/2024',
      rfidTag: 'RFID-007-ASP',
      manufacturer: 'Karl Storz',
      acquisitionDate: '12/06/2023'
    },
    {
      id: 'INST-BIP-008',
      name: 'Pince Biopsie',
      category: 'Instruments Spécialisés',
      setName: 'Set Biopsie #02',
      location: 'Zone de Lavage',
      status: 'En Cours',
      usageCount: 89,
      maxUsage: 250,
      lastMaintenance: '02/10/2024',
      rfidTag: 'RFID-008-BIP',
      manufacturer: 'Olympus',
      acquisitionDate: '30/08/2023'
    }
  ];

  // Filter instruments based on current filters
  const filteredInstruments = useMemo(() => {
    return mockInstruments?.filter(instrument => {
      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        const matchesSearch = 
          instrument?.id?.toLowerCase()?.includes(searchTerm) ||
          instrument?.name?.toLowerCase()?.includes(searchTerm) ||
          instrument?.setName?.toLowerCase()?.includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters?.location && instrument?.location !== filters?.location) {
        return false;
      }

      // Status filter
      if (filters?.status && instrument?.status !== filters?.status) {
        return false;
      }

      // Category filter
      if (filters?.category && instrument?.category !== filters?.category) {
        return false;
      }

      // Maintenance filter
      if (filters?.maintenance) {
        const lastMaintenanceDate = new Date(instrument.lastMaintenance.split('/').reverse().join('-'));
        const today = new Date();
        const daysDiff = Math.floor((today - lastMaintenanceDate) / (1000 * 60 * 60 * 24));
        
        if (filters?.maintenance === 'due' && daysDiff < 30) return false;
        if (filters?.maintenance === 'overdue' && daysDiff < 60) return false;
        if (filters?.maintenance === 'recent' && daysDiff > 7) return false;
      }

      // Quick filters
      if (filters?.quickFilter) {
        if (filters?.quickFilter === 'maintenance-due') {
          const usageRatio = instrument?.usageCount / instrument?.maxUsage;
          if (usageRatio < 0.8) return false;
        }
        if (filters?.quickFilter === 'high-usage') {
          const usageRatio = instrument?.usageCount / instrument?.maxUsage;
          if (usageRatio < 0.7) return false;
        }
        if (filters?.quickFilter === 'recently-sterilized') {
          if (instrument?.status !== 'Stérilisé') return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      status: '',
      category: '',
      maintenance: '',
      startDate: '',
      endDate: '',
      quickFilter: ''
    });
  };

  const handleViewDetails = (instrument) => {
    setSelectedInstrument(instrument);
    setShowDetailsModal(true);
  };

  const handleScheduleMaintenance = (instrument) => {
    console.log('Programmer maintenance pour:', instrument?.id);
    // Implementation would handle maintenance scheduling
  };

  const handleViewHistory = (instrument) => {
    console.log('Voir historique pour:', instrument?.id);
    // Implementation would show instrument history
  };

  const handleScanComplete = (scanResult) => {
    setRecentScans(prev => [scanResult, ...prev?.slice(0, 9)]);
    console.log('Scan terminé:', scanResult);
  };

  const handleBulkOperation = (operation, instrumentIds) => {
    console.log('Opération en lot:', operation, 'sur', instrumentIds);
    // Implementation would handle bulk operations
    setSelectedInstruments([]);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedInstruments(newSelection);
  };

  const handleClearSelection = () => {
    setSelectedInstruments([]);
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
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Suivi des Instruments</h1>
              <p className="text-muted-foreground">
                Gestion et traçabilité des instruments chirurgicaux
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Exporter
              </Button>
              <Button
                variant="primary"
                iconName="Plus"
                iconPosition="left"
              >
                Nouvel Instrument
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-medical border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Instruments</p>
                  <p className="text-2xl font-bold text-foreground">{mockInstruments?.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-medical border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En Utilisation</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockInstruments?.filter(i => i?.status === 'En Utilisation')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={24} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-medical border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Maintenance Due</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockInstruments?.filter(i => (i?.usageCount / i?.maxUsage) > 0.8)?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-medical border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stérilisés</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockInstruments?.filter(i => i?.status === 'Stérilisé')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Filters and Table */}
            <div className="xl:col-span-3 space-y-6">
              {/* Filter Controls */}
              <FilterControls
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                totalInstruments={mockInstruments?.length}
                filteredCount={filteredInstruments?.length}
              />

              {/* Bulk Operations */}
              {selectedInstruments?.length > 0 && (
                <BulkOperations
                  selectedInstruments={selectedInstruments}
                  onBulkOperation={handleBulkOperation}
                  onClearSelection={handleClearSelection}
                />
              )}

              {/* Instruments Table */}
              <InstrumentTable
                instruments={filteredInstruments}
                onViewDetails={handleViewDetails}
                onScheduleMaintenance={handleScheduleMaintenance}
                onViewHistory={handleViewHistory}
                selectedInstruments={selectedInstruments}
                onSelectionChange={handleSelectionChange}
              />
            </div>

            {/* Right Column - Scanning Interface */}
            <div className="xl:col-span-1">
              <ScanningInterface
                onScanComplete={handleScanComplete}
                recentScans={recentScans}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Floating Scan Button for Mobile */}
      <div className="xl:hidden">
        <QuickScanAccess onScanComplete={handleScanComplete} />
      </div>
      {/* Instrument Details Modal */}
      <InstrumentDetailsModal
        instrument={selectedInstrument}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
    </div>
  );
};

export default SuiviDesInstruments;