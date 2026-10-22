import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Clock, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Zap, 
  Check, 
  Truck, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const RescueCard = ({ donation }) => {
  const { 
    claimDonation, 
    setSelectedRescueForMission, 
    currentUser, 
    setActiveTab, 
    switchRole 
  } = useAppState();

  const [isClaiming, setIsClaiming] = useState(false);

  const isUrgent = donation.urgency === 'urgent';
  const isSoon = donation.urgency === 'soon';
  const isAvailable = donation.status === 'available';
  const isDelivered = donation.status === 'delivered';

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      // Auto assign current user NGO name or default
      const ngoName = currentUser.role === 'ngo' ? currentUser.name : 'Asha Food Rescue Foundation';
      const volunteerName = currentUser.role === 'volunteer' ? currentUser.name : 'Arun Kumar (Bike Courier)';

      claimDonation(donation.id, 'ngo-1', ngoName, volunteerName, 'Sneha Sadan Child Home');
      setIsClaiming(false);
      setSelectedRescueForMission({
        ...donation,
        status: 'claimed',
        claimedByNgoName: ngoName,
        assignedVolunteer: volunteerName
      });
    }, 400);
  };

  return (
    <div 
      className="card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        border: isUrgent && isAvailable ? '2px solid var(--urgent-red)' : '1px solid var(--border-color)',
        boxShadow: isUrgent && isAvailable ? 'var(--shadow-urgent)' : 'var(--shadow-card)'
      }}
    >
      {/* Top Urgency Header Banner */}
      <div 
        className={`urgency-banner-tag ${
          isUrgent ? 'urgency-banner-urgent' :
          isSoon ? 'urgency-banner-soon' : 'urgency-banner-flexible'
        }`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isUrgent ? <Zap size={14} /> : <Clock size={14} />}
          <span>
            {isUrgent ? '🔴 URGENT — EXPIRING SOON' :
             isSoon ? '🟠 MEDIUM PRIORITY' : '🟢 FRESH / FLEXIBLE'}
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>
          {donation.expiresAt}
        </span>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Food Image & Title */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
          {donation.imageUrl && (
            <img 
              src={donation.imageUrl} 
              alt={donation.title} 
              style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>
                {donation.category}
              </span>
              {donation.dietary.map(d => (
                <span key={d} className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                  {d}
                </span>
              ))}
            </div>

            <h4 style={{ fontSize: '1.15rem', color: 'var(--text-dark)', lineHeight: 1.25 }}>
              {donation.title}
            </h4>
          </div>
        </div>

        {/* Quantities & Location Strip */}
        <div style={{ background: 'var(--bg-main)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-green)', marginBottom: '16px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Quantity Available:</span>
            <strong style={{ color: 'var(--green-dark)', fontSize: '0.95rem' }}>
              🍛 {donation.servings} Servings ({donation.quantityKg} kg)
            </strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Provider:</span>
            <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
              {donation.providerType === 'restaurant' ? '🏢 ' : '👤 '}
              {donation.providerName}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Distance:</span>
            <span style={{ fontWeight: 700, color: 'var(--green-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} /> 1.8 km away (12m ride)
            </span>
          </div>
        </div>

        {/* Packaging note */}
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          📦 Packaging: <strong>{donation.packaging}</strong> • {donation.pickupInstructions}
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 'auto' }}>
          {isAvailable ? (
            <button
              className={`btn ${isUrgent ? 'btn-urgent' : 'btn-primary'}`}
              style={{ width: '100%', fontWeight: 700 }}
              onClick={handleClaim}
              disabled={isClaiming}
              id={`accept-rescue-btn-${donation.id}`}
            >
              {isClaiming ? (
                <span>Locking Mission Dispatch...</span>
              ) : (
                <>
                  <Zap size={16} />
                  <span>ACCEPT RESCUE MISSION</span>
                </>
              )}
            </button>
          ) : isDelivered ? (
            <button
              className="btn btn-secondary"
              style={{ width: '100%', cursor: 'default' }}
              onClick={() => setSelectedRescueForMission(donation)}
            >
              <CheckCircle2 size={16} color="var(--green-primary)" />
              <span>Rescue Completed ❤️</span>
            </button>
          ) : (
            <button
              className="btn btn-dark"
              style={{ width: '100%', fontWeight: 700 }}
              onClick={() => setSelectedRescueForMission(donation)}
            >
              <Truck size={16} />
              <span>Update Mission Tracker ({donation.status.replace('_', ' ')})</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
