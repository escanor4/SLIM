import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FacilityMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);

  const facilityZones = [
    {
      id: 'or',
      name: 'Bloc Opératoire',
      position: { top: '15%', left: '20%' },
      instrumentCount: 12,
      status: 'active',
      color: 'bg-success',
      instruments: [
        { id: 'SET-OR-001', name: 'Set Chirurgie Générale A', status: 'En Utilisation' },
        { id: 'SET-OR-002', name: 'Set Orthopédie B', status: 'En Utilisation' }
      ]
    },
    {
      id: 'wash',
      name: 'Zone de Lavage',
      position: { top: '45%', left: '15%' },
      instrumentCount: 8,
      status: 'processing',
      color: 'bg-warning',
      instruments: [
        { id: 'SET-WS-001', name: 'Set Cardiologie', status: 'En Lavage' },
        { id: 'SET-WS-002', name: 'Set Neurochirurgie', status: 'En Lavage' }
      ]
    },
    {
      id: 'sterilization',
      name: 'Zone de Stérilisation',
      position: { top: '25%', left: '60%' },
      instrumentCount: 15,
      status: 'sterilizing',
      color: 'bg-accent',
      instruments: [
        { id: 'SET-ST-001', name: 'Set Gynécologie', status: 'En Stérilisation' },
        { id: 'SET-ST-002', name: 'Set Urologie', status: 'En Stérilisation' }
      ]
    },
    {
      id: 'storage',
      name: 'Zone de Stockage',
      position: { top: '55%', left: '70%' },
      instrumentCount: 24,
      status: 'ready',
      color: 'bg-primary',
      instruments: [
        { id: 'SET-ST-001', name: 'Set Ophtalmologie', status: 'Stérilisé - Prêt' },
        { id: 'SET-ST-002', name: 'Set Dermatologie', status: 'Stérilisé - Prêt' }
      ]
    }
  ];

  const statusConfig = {
    active: { icon: 'Activity', label: 'Actif' },
    processing: { icon: 'RefreshCw', label: 'En Traitement' },
    sterilizing: { icon: 'Zap', label: 'Stérilisation' },
    ready: { icon: 'CheckCircle', label: 'Prêt' }
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Cartographie des Instruments</h2>
          <p className="text-sm text-muted-foreground">Vue en temps réel des positions dans l'établissement</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Mise à jour en temps réel</span>
          </div>
        </div>
      </div>
      {/* Facility Map */}
      <div className="relative bg-slate-50 rounded-lg border-2 border-dashed border-border h-96 mb-6 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Zone Markers */}
        {facilityZones?.map((zone) => (
          <div
            key={zone?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: zone?.position?.top, left: zone?.position?.left }}
            onClick={() => setSelectedZone(zone?.id === selectedZone ? null : zone?.id)}
          >
            {/* Zone Indicator */}
            <div className={`
              w-16 h-16 ${zone?.color} rounded-full flex items-center justify-center
              shadow-medical-lg hover:scale-110 transition-all duration-200
              ${selectedZone === zone?.id ? 'ring-4 ring-primary/30' : ''}
            `}>
              <Icon name={statusConfig?.[zone?.status]?.icon} size={24} color="white" />
            </div>

            {/* Zone Label */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
              <div className="bg-white px-2 py-1 rounded-md shadow-medical text-xs font-medium text-foreground whitespace-nowrap">
                {zone?.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {zone?.instrumentCount} instruments
              </div>
            </div>

            {/* Pulse Animation for Active Zones */}
            {zone?.status === 'active' && (
              <div className="absolute inset-0 w-16 h-16 bg-success rounded-full animate-ping opacity-20"></div>
            )}
          </div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
             refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
          
          {/* Workflow arrows */}
          <line x1="25%" y1="45%" x2="55%" y2="30%" 
                stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" 
                markerEnd="url(#arrowhead)" opacity="0.6" />
          <line x1="65%" y1="35%" x2="65%" y2="50%" 
                stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" 
                markerEnd="url(#arrowhead)" opacity="0.6" />
        </svg>
      </div>
      {/* Zone Details Panel */}
      {selectedZone && (
        <div className="bg-slate-50 rounded-lg p-4 border border-border">
          {(() => {
            const zone = facilityZones?.find(z => z?.id === selectedZone);
            return (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${zone?.color} rounded-full flex items-center justify-center`}>
                      <Icon name={statusConfig?.[zone?.status]?.icon} size={16} color="white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{zone?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {statusConfig?.[zone?.status]?.label} • {zone?.instrumentCount} instruments
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedZone(null)}
                    className="p-1 hover:bg-white rounded-md transition-colors"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Instruments Actifs</h4>
                  {zone?.instruments?.map((instrument) => (
                    <div key={instrument?.id} className="flex items-center justify-between py-2 px-3 bg-white rounded-md">
                      <div>
                        <div className="text-sm font-medium text-foreground">{instrument?.name}</div>
                        <div className="text-xs text-muted-foreground">{instrument?.id}</div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                        {instrument?.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
        {Object.entries(statusConfig)?.map(([status, config]) => (
          <div key={status} className="flex items-center gap-2">
            <Icon name={config?.icon} size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{config?.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityMap;