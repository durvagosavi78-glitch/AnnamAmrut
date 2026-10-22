import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  X, 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  Navigation,
  Check
} from 'lucide-react';

export const ActiveMissionModal = () => {
  const { 
    selectedRescueForMission, 
    setSelectedRescueForMission, 
    updateDonationStatus,
    currentUser 
  } = useAppState();

  const [deliveryProofNote, setDeliveryProofNote] = useState('');
  const [targetShelter, setTargetShelter] = useState('Sneha Sadan Child Care & Orphanage');

  if (!selectedRescueForMission) return null;

  const donation = selectedRescueForMission;
  const isDelivered = donation.status === 'delivered';
  const isCollected = donation.status === 'collected';
  const isPickupStarted = donation.status === 'pickup_started';
  const isClaimed = donation.status === 'claimed';

  const handleNextStep = () => {
    if (isClaimed) {
      updateDonationStatus(donation.id, 'pickup_started', 'Volunteer assigned and en route to provider location');
    } else if (isPickupStarted) {
      updateDonationStatus(donation.id, 'collected', 'Food inspected for freshness & safely packed into thermal bags');
    } else if (isCollected) {
      updateDonationStatus(donation.id, 'delivered', `Delivered to ${targetShelter}. Distributed hot and fresh!`);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedRescueForMission(null)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '660px', padding: '28px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '42px', height: '42px', background: 'var(--green-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
              🚚
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--green-dark)' }}>Live Rescue Mission</h3>
                <span className={`badge ${donation.urgency === 'urgent' ? 'badge-urgent' : 'badge-soon'}`}>
                  {donation.urgency === 'urgent' ? '🔴 URGENT DISPATCH' : '🟠 PRIORITY'}
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Mission Reference: <strong>{donation.id}</strong>
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedRescueForMission(null)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mission Details Card */}
        <div style={{ background: '#FAFCFA', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1.5px solid var(--border-green)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>{donation.title}</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--green-dark)', fontWeight: 700 }}>
                🏢 Provider: {donation.providerName}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--green-dark)' }}>
                {donation.servings} Servings
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{donation.quantityKg} kg food rescue</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>PICKUP ADDRESS</div>
              <div style={{ fontWeight: 600 }}>📍 {donation.providerAddress}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--green-primary)' }}>📞 {donation.contactPhone}</div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>DESTINATION SHELTER</div>
              <div style={{ fontWeight: 600 }}>❤️ {donation.targetDestination || targetShelter}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Community hunger center</div>
            </div>
          </div>

          <div style={{ marginTop: '12px', background: '#FFFFFF', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-color)', fontSize: '0.825rem' }}>
            <strong>Special Courier Instructions: </strong>
            <span style={{ color: 'var(--text-muted)' }}>{donation.pickupInstructions}</span>
          </div>
        </div>

        {/* Live Step Progression */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '12px' }}>
            Mission Execution Workflow
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Step 1: Claimed */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: '#FFFFFF',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--green-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>1. Rescue Mission Accepted</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Claimed by {donation.claimedByNgoName || 'Asha Rescue Unit'}</div>
                </div>
              </div>
              <span className="badge badge-flexible">Done</span>
            </div>

            {/* Step 2: Pickup In Progress */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: isPickupStarted || isCollected || isDelivered ? '#FFFFFF' : '#F9FAFB',
              border: isPickupStarted ? '2px solid var(--green-primary)' : '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isPickupStarted || isCollected || isDelivered ? 'var(--green-primary)' : '#E5E7EB',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isCollected || isDelivered ? <Check size={16} /> : '2'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>2. Courier En Route to Provider</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {isPickupStarted ? '🚴 Arun Kumar navigating to Bandra West' : 'Volunteer transit dispatch'}
                  </div>
                </div>
              </div>

              {isClaimed && (
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleNextStep}
                >
                  Start Pickup Route →
                </button>
              )}
              {(isPickupStarted || isCollected || isDelivered) && (
                <span className="badge badge-flexible">
                  {isPickupStarted ? '⚡ In Progress' : 'Done'}
                </span>
              )}
            </div>

            {/* Step 3: Collected */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: isCollected || isDelivered ? '#FFFFFF' : '#F9FAFB',
              border: isCollected ? '2px solid var(--green-primary)' : '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isCollected || isDelivered ? 'var(--green-primary)' : '#E5E7EB',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isDelivered ? <Check size={16} /> : '3'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>3. Food Verified & Collected</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Packed in thermal hygiene containers</div>
                </div>
              </div>

              {isPickupStarted && (
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleNextStep}
                >
                  Confirm Food Picked Up →
                </button>
              )}
              {(isCollected || isDelivered) && (
                <span className="badge badge-flexible">
                  {isCollected ? '⚡ Collected' : 'Done'}
                </span>
              )}
            </div>

            {/* Step 4: Delivered */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: isDelivered ? 'var(--success-green-bg)' : '#F9FAFB',
              border: isDelivered ? '2px solid var(--green-primary)' : '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isDelivered ? 'var(--green-primary)' : '#E5E7EB',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isDelivered ? '❤️' : '4'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>4. Handover to Shelter / Beneficiaries</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {isDelivered ? 'Successfully served with zero waste' : `Deliver to ${targetShelter}`}
                  </div>
                </div>
              </div>

              {isCollected && (
                <button 
                  className="btn btn-urgent btn-sm"
                  onClick={handleNextStep}
                >
                  ❤️ Confirm Delivery Handover
                </button>
              )}
              {isDelivered && (
                <span className="badge badge-flexible" style={{ background: '#FFFFFF', fontWeight: 800 }}>
                  🎉 Completed & Points Awarded!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Activity Log stream in modal */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Updates sync across donor dashboard and live map in real time.
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => setSelectedRescueForMission(null)}
          >
            Close Mission Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
