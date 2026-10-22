import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Zap, 
  Clock, 
  MapPin, 
  Building2, 
  ArrowRight, 
  HeartHandshake, 
  ShieldCheck, 
  Bike, 
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Users,
  Flame
} from 'lucide-react';

export const CampaignLiveOperations = () => {
  const { 
    donations, 
    ngos, 
    setActiveTab, 
    setIsDonateModalOpen, 
    switchRole,
    setSelectedRescueForMission 
  } = useAppState();

  const urgentDonations = donations.filter(d => d.urgency === 'urgent' && d.status === 'available');
  const soonDonations = donations.filter(d => d.urgency === 'soon' && d.status === 'available');
  const displayMissions = [...urgentDonations, ...soonDonations].slice(0, 3);

  const verifiedShelters = [
    {
      name: 'Sneha Sadan Orphanage',
      location: 'Bandra West',
      beneficiaries: '85 Children',
      type: 'Children Home',
      mealsReceivedToday: 140,
      avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80',
      status: 'Fed dinner batch at 4:15 PM'
    },
    {
      name: 'Dharavi Community Kitchen Hub',
      location: 'Dharavi Sector 5',
      beneficiaries: '320 Daily Wage Workers',
      type: 'Community Kitchen',
      mealsReceivedToday: 260,
      avatar: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=120&auto=format&fit=crop&q=80',
      status: 'Awaiting 120 evening thalis'
    },
    {
      name: 'Prerna Senior Living & Shelter',
      location: 'Powai West',
      beneficiaries: '65 Elderly Residents',
      type: 'Elderly Haven',
      mealsReceivedToday: 95,
      avatar: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=120&auto=format&fit=crop&q=80',
      status: 'Dinner served with fresh salads'
    },
    {
      name: 'Asha Hunger Relief Command',
      location: 'Dadar TT Circle',
      beneficiaries: '180 Night Shelter Residents',
      type: 'Night Shelter Network',
      mealsReceivedToday: 180,
      avatar: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=120&auto=format&fit=crop&q=80',
      status: 'Dispatched 3 bike couriers'
    }
  ];

  return (
    <section className="campaign-operations-section" style={{ padding: '60px 0', background: '#F4F8F5' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <div className="section-tag" style={{ background: 'var(--urgent-red-bg)', color: 'var(--urgent-red)', borderColor: 'var(--urgent-red-border)' }}>
            <Zap size={14} />
            <span>Active Humanitarian Rescue Front</span>
          </div>
          <h2 className="section-title">
            Live Rescue Operations Waiting for Volunteer Dispatch
          </h2>
          <p className="section-subtitle">
            These hot banquet meals and fresh bakery items are safely packed and ready for immediate transit to community shelters. Claim a mission now to protect edible nourishment.
          </p>
        </div>

        {/* Live Ground Rescue Mission Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {displayMissions.map((donation) => {
            const isUrgent = donation.urgency === 'urgent';
            return (
              <div 
                key={donation.id}
                className="card"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  border: isUrgent ? '2px solid var(--urgent-red-border)' : '1px solid var(--border-color)',
                  background: '#FFFFFF',
                  boxShadow: isUrgent ? '0 8px 24px -4px rgba(220, 38, 38, 0.12)' : 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span 
                    className={`badge ${isUrgent ? 'badge-urgent' : 'badge-warning'}`}
                    style={{ fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    {isUrgent ? '🔴 URGENT (< 45m left)' : '🟠 SOON (1–2 hrs left)'}
                  </span>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    ID: {donation.id}
                  </span>
                </div>

                {/* Title and servings */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-dark)', fontWeight: 800 }}>
                      {donation.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      📍 {donation.providerAddress}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--green-dark)' }}>
                      {donation.servings}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Meals
                    </div>
                  </div>
                </div>

                {/* Packaging & Safety */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  <span style={{ padding: '3px 8px', background: 'var(--bg-main)', borderRadius: '6px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    📦 {donation.packaging}
                  </span>
                  <span style={{ padding: '3px 8px', background: 'var(--bg-main)', borderRadius: '6px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    ⚖️ {donation.quantityKg} kg
                  </span>
                  <span style={{ padding: '3px 8px', background: '#ECFDF5', color: '#065F46', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 600 }}>
                    🛡️ FSSAI Verified
                  </span>
                </div>

                {/* Provider ➔ Target Shelter */}
                <div style={{ padding: '12px', background: '#F8FAF8', borderRadius: 'var(--radius-md)', marginBottom: '18px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dark)', fontWeight: 600, marginBottom: '4px' }}>
                    <span>🏢 Provider:</span>
                    <span style={{ color: 'var(--green-dark)' }}>{donation.providerName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <span>🎯 Designated:</span>
                    <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Sneha Sadan / Dharavi Shelter Network</span>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn btn-sm btn-primary"
                    style={{ flex: 1, justifyContent: 'center', background: isUrgent ? 'var(--urgent-red)' : 'var(--green-primary)', fontWeight: 700 }}
                    onClick={() => {
                      switchRole('volunteer');
                      setSelectedRescueForMission(donation);
                      setActiveTab('ngo');
                    }}
                  >
                    <Zap size={14} />
                    <span>Claim &amp; Dispatch</span>
                  </button>

                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      setSelectedRescueForMission(donation);
                      setActiveTab('ngo');
                    }}
                    style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Humanitarian Beneficiary Shelters Strip */}
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '32px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase' }}>
                <Building2 size={14} color="var(--green-primary)" />
                <span>Verified Beneficiary Network</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginTop: '4px' }}>
                48 Verified Orphanages, Senior Shelters &amp; Community Kitchens Fed Daily
              </h3>
            </div>

            <button 
              className="btn btn-sm btn-secondary"
              onClick={() => setActiveTab('leaderboard')}
            >
              <span>View Shelter Transparency Log</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {verifiedShelters.map((shelter, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-green)',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}
              >
                <img 
                  src={shelter.avatar} 
                  alt={shelter.name}
                  style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {shelter.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--green-dark)', fontWeight: 600 }}>
                    {shelter.beneficiaries} • {shelter.location}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    🟢 {shelter.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
