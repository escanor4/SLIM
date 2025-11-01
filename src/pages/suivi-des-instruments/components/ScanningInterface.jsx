import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const ScanningInterface = ({ onScanComplete, recentScans = [] }) => {
  const [scanMode, setScanMode] = useState('rfid');
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const scanModes = [
    { value: 'rfid', label: 'RFID', icon: 'Radio' },
    { value: 'datamatrix', label: 'DataMatrix', icon: 'QrCode' },
    { value: 'manual', label: 'Manuel', icon: 'Keyboard' }
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const mockResult = {
        id: 'INST-' + Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase(),
        name: 'Forceps Chirurgical Standard',
        category: 'Instruments de Base',
        setName: 'Set Chirurgie Générale #12',
        location: 'Zone de Lavage',
        status: 'En Cours',
        scanType: scanMode,
        timestamp: new Date()?.toISOString(),
        technician: 'Marie Dubois'
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
      id: manualCode?.toUpperCase(),
      name: 'Instrument Saisi Manuellement',
      category: 'Non Identifié',
      setName: 'À Déterminer',
      location: 'Localisation Inconnue',
      status: 'Recherche en Cours',
      scanType: 'manual',
      timestamp: new Date()?.toISOString(),
      technician: 'Marie Dubois'
    };
    
    setScanResult(mockResult);
    setManualCode('');
    
    if (onScanComplete) {
      onScanComplete(mockResult);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-medical border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Scan" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Interface de Scan</h3>
            <p className="text-sm text-muted-foreground">Scanner ou saisir un instrument</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Scan Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Mode de Scan
          </label>
          <div className="grid grid-cols-3 gap-2">
            {scanModes?.map((mode) => (
              <button
                key={mode?.value}
                onClick={() => setScanMode(mode?.value)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 text-center
                  ${scanMode === mode?.value 
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                  }
                `}
              >
                <Icon name={mode?.icon} size={20} className="mx-auto mb-1" />
                <div className="text-xs font-medium">{mode?.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Scanning Area */}
        {scanMode === 'manual' ? (
          <div className="space-y-4">
            <Input
              label="Code Instrument"
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e?.target?.value)}
              placeholder="Saisir le code de l'instrument..."
              onKeyPress={(e) => e?.key === 'Enter' && handleManualSubmit()}
            />
            <Button 
              variant="primary" 
              fullWidth
              iconName="Check"
              iconPosition="left"
              onClick={handleManualSubmit}
              disabled={!manualCode?.trim()}
            >
              Valider le Code
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            {isScanning ? (
              <>
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                  <Icon name={scanModes?.find(m => m?.value === scanMode)?.icon} size={32} className="text-primary" />
                </div>
                <div>
                  <div className="text-lg font-medium text-foreground">Scan en cours...</div>
                  <div className="text-sm text-muted-foreground">
                    Approchez l'instrument du lecteur {scanMode?.toUpperCase()}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                  <Icon name={scanModes?.find(m => m?.value === scanMode)?.icon} size={32} className="text-slate-400" />
                </div>
                <div>
                  <div className="text-lg font-medium text-foreground">Prêt à scanner</div>
                  <div className="text-sm text-muted-foreground">
                    Cliquez pour démarrer le scan {scanMode?.toUpperCase()}
                  </div>
                </div>
                <Button 
                  variant="primary" 
                  size="lg" 
                  iconName="Play"
                  iconPosition="left"
                  onClick={handleStartScan}
                >
                  Démarrer le Scan
                </Button>
              </>
            )}
          </div>
        )}

        {/* Scan Result */}
        {scanResult && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Scan Réussi</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Code:</span>
                <span className="font-medium">{scanResult?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instrument:</span>
                <span className="font-medium">{scanResult?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Localisation:</span>
                <span className="font-medium">{scanResult?.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Statut:</span>
                <span className="font-medium">{scanResult?.status}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="success" size="sm" fullWidth iconName="Eye">
                Voir Détails
              </Button>
              <Button variant="outline" size="sm" onClick={() => setScanResult(null)}>
                Nouveau Scan
              </Button>
            </div>
          </div>
        )}

        {/* Recent Scans */}
        {recentScans?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Scans Récents</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentScans?.slice(0, 5)?.map((scan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Scan" size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{scan?.id}</div>
                      <div className="text-xs text-muted-foreground">{scan?.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {formatTimestamp(scan?.timestamp)}
                    </div>
                    <div className="text-xs font-medium text-foreground">
                      {scan?.technician}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanningInterface;