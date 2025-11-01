import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickScanAccess = ({ 
  onScanComplete,
  onScanError,
  isFloating = true,
  className = ''
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState('rfid'); // 'rfid' | 'datamatrix' | 'manual'
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [manualCode, setManualCode] = useState('');

  const scanModes = {
    rfid: {
      label: 'RFID',
      icon: 'Radio',
      description: 'Scanner une puce RFID'
    },
    datamatrix: {
      label: 'DataMatrix',
      icon: 'QrCode',
      description: 'Scanner un code DataMatrix'
    },
    manual: {
      label: 'Manuel',
      icon: 'Keyboard',
      description: 'Saisie manuelle du code'
    }
  };

  const handleStartScan = () => {
    setShowScanModal(true);
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const mockResult = {
        code: 'INST-' + Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase(),
        type: scanMode,
        timestamp: new Date()?.toISOString(),
        instrument: {
          name: 'Forceps Chirurgical',
          category: 'Instruments de Base',
          status: 'En Cours de Traitement'
        }
      };
      
      setScanResult(mockResult);
      setIsScanning(false);
      
      if (onScanComplete) {
        onScanComplete(mockResult);
      }
    }, 2000);
  };

  const handleManualSubmit = () => {
    if (!manualCode?.trim()) return;
    
    const mockResult = {
      code: manualCode?.toUpperCase(),
      type: 'manual',
      timestamp: new Date()?.toISOString(),
      instrument: {
        name: 'Instrument Saisi Manuellement',
        category: 'Non Identifié',
        status: 'Recherche en Cours'
      }
    };
    
    setScanResult(mockResult);
    setManualCode('');
    
    if (onScanComplete) {
      onScanComplete(mockResult);
    }
  };

  const handleCloseScan = () => {
    setShowScanModal(false);
    setIsScanning(false);
    setScanResult(null);
    setManualCode('');
  };

  // Floating Action Button
  if (isFloating) {
    return (
      <>
        <button
          onClick={handleStartScan}
          className={`
            fixed bottom-6 right-6 z-300 w-14 h-14 bg-primary text-primary-foreground rounded-full
            shadow-medical-lg hover:shadow-medical-xl hover:scale-105 transition-all duration-200
            flex items-center justify-center group
            ${className}
          `}
        >
          <Icon name="Scan" size={24} />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Scanner un instrument
          </div>
        </button>

        {/* Scan Modal */}
        {showScanModal && (
          <ScanModal
            isScanning={isScanning}
            scanMode={scanMode}
            setScanMode={setScanMode}
            scanModes={scanModes}
            scanResult={scanResult}
            manualCode={manualCode}
            setManualCode={setManualCode}
            onStartScan={handleStartScan}
            onManualSubmit={handleManualSubmit}
            onClose={handleCloseScan}
          />
        )}
      </>
    );
  }

  // Inline Button
  return (
    <Button
      variant="primary"
      iconName="Scan"
      iconPosition="left"
      onClick={handleStartScan}
      className={className}
    >
      Scanner
    </Button>
  );
};

const ScanModal = ({
  isScanning,
  scanMode,
  setScanMode,
  scanModes,
  scanResult,
  manualCode,
  setManualCode,
  onStartScan,
  onManualSubmit,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-medical-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Scanner un Instrument</h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Scan Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Mode de Scan
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(scanModes)?.map(([mode, config]) => (
                <button
                  key={mode}
                  onClick={() => setScanMode(mode)}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200 text-center
                    ${scanMode === mode 
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <Icon name={config?.icon} size={20} className="mx-auto mb-1" />
                  <div className="text-xs font-medium">{config?.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Scanning Area */}
          {scanMode === 'manual' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Code Instrument
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e?.target?.value)}
                    placeholder="Saisir le code..."
                    className="flex-1 px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) => e?.key === 'Enter' && onManualSubmit()}
                  />
                  <Button 
                    variant="primary" 
                    onClick={onManualSubmit}
                    disabled={!manualCode?.trim()}
                  >
                    Valider
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                    <Icon name={scanModes?.[scanMode]?.icon} size={32} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-medium text-foreground">Scan en cours...</div>
                    <div className="text-sm text-muted-foreground">
                      {scanModes?.[scanMode]?.description}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-8 h-1 bg-primary rounded-full animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                    <Icon name={scanModes?.[scanMode]?.icon} size={32} className="text-slate-400" />
                  </div>
                  <div>
                    <div className="text-lg font-medium text-foreground">Prêt à scanner</div>
                    <div className="text-sm text-muted-foreground">
                      {scanModes?.[scanMode]?.description}
                    </div>
                  </div>
                  <Button variant="primary" size="lg" onClick={onStartScan}>
                    Démarrer le Scan
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Scan Result */}
          {scanResult && (
            <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Scan Réussi</span>
              </div>
              <div className="space-y-1 text-sm">
                <div><strong>Code:</strong> {scanResult?.code}</div>
                <div><strong>Instrument:</strong> {scanResult?.instrument?.name}</div>
                <div><strong>Statut:</strong> {scanResult?.instrument?.status}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="success" size="sm" fullWidth>
                  Voir Détails
                </Button>
                <Button variant="outline" size="sm" onClick={onClose}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickScanAccess;