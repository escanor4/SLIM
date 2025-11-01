import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [isLive, setIsLive] = useState(true);

  // Mock real-time activity data
  const mockActivities = [
  {
    id: 'ACT-001',
    type: 'sterilization_complete',
    title: 'Cycle de Stérilisation Terminé',
    description: 'Autoclave A1 - Cycle ST-2024-1031-08 terminé avec succès',
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    user: 'Marie Dubois',
    userAvatar: "https://images.unsplash.com/photo-1734821375517-ca34fbe8089d",
    userAvatarAlt: 'Photo professionnelle de Marie Dubois, femme souriante aux cheveux bruns en blouse médicale',
    details: {
      instruments: ['SET-OR-001', 'SET-OR-002'],
      duration: '45 min',
      temperature: '134°C',
      status: 'success'
    },
    icon: 'CheckCircle',
    color: 'text-success'
  },
  {
    id: 'ACT-002',
    type: 'instrument_scan',
    title: 'Instrument Scanné',
    description: 'Set Cardiologie A scanné en Zone de Lavage',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    user: 'Jean Martin',
    userAvatar: "https://images.unsplash.com/photo-1639739766300-1b1196fe2f7f",
    userAvatarAlt: 'Photo professionnelle de Jean Martin, homme avec barbe en uniforme médical',
    details: {
      instrumentId: 'SET-CAR-A-001',
      location: 'Zone de Lavage - Poste 2',
      scanType: 'RFID',
      status: 'processing'
    },
    icon: 'Scan',
    color: 'text-accent'
  },
  {
    id: 'ACT-003',
    type: 'maintenance_alert',
    title: 'Alerte de Maintenance',
    description: 'Laveuse L2 nécessite une maintenance préventive',
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    user: 'Système',
    userAvatar: null,
    userAvatarAlt: '',
    details: {
      equipment: 'Laveuse L2',
      maintenanceType: 'Préventive',
      hoursUsed: '2000h',
      priority: 'medium'
    },
    icon: 'Wrench',
    color: 'text-warning'
  },
  {
    id: 'ACT-004',
    type: 'certificate_generated',
    title: 'Certificat Numérique Généré',
    description: 'Certificat de stérilisation créé pour le cycle ST-2024-1031-07',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    user: 'Sophie Laurent',
    userAvatar: "https://images.unsplash.com/photo-1733685372672-d8125b7111a7",
    userAvatarAlt: 'Photo professionnelle de Sophie Laurent, femme blonde en blouse de laboratoire',
    details: {
      certificateId: 'CERT-2024-1031-07',
      instruments: ['SET-GYN-001', 'SET-GYN-002'],
      validUntil: '2024-11-07',
      status: 'valid'
    },
    icon: 'Shield',
    color: 'text-primary'
  },
  {
    id: 'ACT-005',
    type: 'cycle_started',
    title: 'Nouveau Cycle Démarré',
    description: 'Autoclave B2 - Cycle de stérilisation initié',
    timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
    user: 'Marie Dubois',
    userAvatar: "https://images.unsplash.com/photo-1734821375517-ca34fbe8089d",
    userAvatarAlt: 'Photo professionnelle de Marie Dubois, femme souriante aux cheveux bruns en blouse médicale',
    details: {
      cycleId: 'ST-2024-1031-09',
      autoclave: 'Autoclave B2',
      estimatedDuration: '50 min',
      status: 'running'
    },
    icon: 'Play',
    color: 'text-accent'
  }];


  useEffect(() => {
    setActivities(mockActivities);

    // Simulate real-time updates
    if (isLive) {
      const interval = setInterval(() => {
        const newActivity = {
          id: `ACT-${Date.now()}`,
          type: 'instrument_scan',
          title: 'Nouvel Instrument Scanné',
          description: `Set ${['Orthopédie', 'Cardiologie', 'Neurochirurgie']?.[Math.floor(Math.random() * 3)]} scanné`,
          timestamp: new Date(),
          user: ['Marie Dubois', 'Jean Martin', 'Sophie Laurent']?.[Math.floor(Math.random() * 3)],
          userAvatar: "https://images.unsplash.com/photo-1691935444158-52240fda25e6",
          userAvatarAlt: 'Photo professionnelle d\'un technicien CSSD en uniforme médical',
          details: {
            instrumentId: `SET-${Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase()}`,
            location: 'Zone de Lavage',
            scanType: 'RFID',
            status: 'processing'
          },
          icon: 'Scan',
          color: 'text-accent'
        };

        setActivities((prev) => [newActivity, ...prev?.slice(0, 9)]);
      }, 30000); // New activity every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp?.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `il y a ${hours}h ${minutes % 60}min`;
    return `il y a ${minutes}min`;
  };

  const getActivityTypeConfig = (type) => {
    const configs = {
      sterilization_complete: { bgColor: 'bg-success/10', borderColor: 'border-success/20' },
      instrument_scan: { bgColor: 'bg-accent/10', borderColor: 'border-accent/20' },
      maintenance_alert: { bgColor: 'bg-warning/10', borderColor: 'border-warning/20' },
      certificate_generated: { bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
      cycle_started: { bgColor: 'bg-accent/10', borderColor: 'border-accent/20' }
    };
    return configs?.[type] || { bgColor: 'bg-slate-50', borderColor: 'border-border' };
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-medical">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Activité Récente</h2>
            <p className="text-sm text-muted-foreground">Flux en temps réel des opérations CSSD</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              isLive ?
              'bg-success/10 text-success' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
              }>

              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-slate-400'}`}></div>
              {isLive ? 'En Direct' : 'Pausé'}
            </button>
          </div>
        </div>
      </div>
      {/* Activity Feed */}
      <div className="max-h-96 overflow-y-auto">
        {activities?.length === 0 ?
        <div className="p-6 text-center">
            <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Aucune activité récente</p>
          </div> :

        <div className="divide-y divide-border">
            {activities?.map((activity, index) => {
            const typeConfig = getActivityTypeConfig(activity?.type);

            return (
              <div key={activity?.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    {/* Activity Icon */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${typeConfig?.bgColor} ${typeConfig?.borderColor} border
                    `}>
                      <Icon name={activity?.icon} size={18} className={activity?.color} />
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-foreground mb-1">{activity?.title}</h3>
                          <p className="text-xs text-muted-foreground">{activity?.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground ml-3 flex-shrink-0">
                          {formatTimeAgo(activity?.timestamp)}
                        </span>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center gap-2 mb-2">
                        {activity?.userAvatar ?
                      <img
                        src={activity?.userAvatar}
                        alt={activity?.userAvatarAlt}
                        className="w-5 h-5 rounded-full object-cover" /> :


                      <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center">
                            <Icon name="Bot" size={12} className="text-slate-500" />
                          </div>
                      }
                        <span className="text-xs text-muted-foreground">{activity?.user}</span>
                      </div>

                      {/* Activity Details */}
                      <div className="bg-slate-50 rounded-md p-2 text-xs">
                        {activity?.type === 'sterilization_complete' &&
                      <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-medium">Durée:</span> {activity?.details?.duration}
                            </div>
                            <div>
                              <span className="font-medium">Température:</span> {activity?.details?.temperature}
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium">Instruments:</span> {activity?.details?.instruments?.join(', ')}
                            </div>
                          </div>
                      }
                        
                        {activity?.type === 'instrument_scan' &&
                      <div className="space-y-1">
                            <div><span className="font-medium">ID:</span> {activity?.details?.instrumentId}</div>
                            <div><span className="font-medium">Localisation:</span> {activity?.details?.location}</div>
                            <div><span className="font-medium">Type de Scan:</span> {activity?.details?.scanType}</div>
                          </div>
                      }
                        
                        {activity?.type === 'maintenance_alert' &&
                      <div className="space-y-1">
                            <div><span className="font-medium">Équipement:</span> {activity?.details?.equipment}</div>
                            <div><span className="font-medium">Type:</span> {activity?.details?.maintenanceType}</div>
                            <div><span className="font-medium">Heures d'utilisation:</span> {activity?.details?.hoursUsed}</div>
                          </div>
                      }
                        
                        {activity?.type === 'certificate_generated' &&
                      <div className="space-y-1">
                            <div><span className="font-medium">ID Certificat:</span> {activity?.details?.certificateId}</div>
                            <div><span className="font-medium">Valide jusqu'au:</span> {activity?.details?.validUntil}</div>
                            <div><span className="font-medium">Instruments:</span> {activity?.details?.instruments?.join(', ')}</div>
                          </div>
                      }
                        
                        {activity?.type === 'cycle_started' &&
                      <div className="space-y-1">
                            <div><span className="font-medium">ID Cycle:</span> {activity?.details?.cycleId}</div>
                            <div><span className="font-medium">Équipement:</span> {activity?.details?.autoclave}</div>
                            <div><span className="font-medium">Durée estimée:</span> {activity?.details?.estimatedDuration}</div>
                          </div>
                      }
                      </div>
                    </div>
                  </div>
                  {/* New Activity Indicator */}
                  {index === 0 && isLive &&
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-success rounded-r"></div>
                }
                </div>);

          })}
          </div>
        }
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-slate-50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {activities?.length} activité{activities?.length > 1 ? 's' : ''} récente{activities?.length > 1 ? 's' : ''}
          </span>
          <button className="text-xs text-primary hover:text-primary/80 font-medium">
            Voir Historique Complet
          </button>
        </div>
      </div>
    </div>);

};

export default RecentActivityFeed;