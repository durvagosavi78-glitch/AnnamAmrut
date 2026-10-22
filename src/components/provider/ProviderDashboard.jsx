import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { RestaurantImpactCard } from './RestaurantImpactCard';
import { 
  PlusCircle, 
  Clock, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  User, 
  History, 
  ChevronRight, 
  AlertCircle,
  TrendingUp,
  PackageCheck
} from 'lucide-react';

export const ProviderDashboard = () => {
  const { 
    currentUser, 
    switchRole, 
    donations, 
    setIsDonateModalOpen, 
    setActiveTab, 
    setSelectedRescueForMission 
  } = useAppState();

  const [viewFilter, setViewFilter] = useState('active');

  const isRestaurant = currentUser.role === 'restaurant';

  // Filter donations created by current user or mock demo providers
  const myDonations = donations.filter(d => {
    if (isRestaurant) {
      return d.providerType === 'restaurant' || d.providerId === currentUser.id;
    }
    return d.providerType === 'individual' || d.providerId === currentUser.id;
  });

  const activeDonations = myDonations.filter(d => d.status !== 'delivered' && d.status !== 'cancelled');
  const pastDonations = myDonations.filter(d => d.status === 'delivered');

  const getStepProgress = (status) => {
    switch (status) {
      case 'available': return 1;
      case 'claimed': return 2;
      case 'pickup_started': return 3;
      case 'collected': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  return (
    <div className="provider-page">
      <div className="section-container">
        
        {/* Welcome Header Banner */}
        <div className="dashboard-header-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className="badge badge-green" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: 'none' }}>
                  {isRestaurant ? '🏢 Restaurant & Hospitality Partner' : '👤 Individual Community Donor'}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#DDEFE0' }}>
                  Member since 2026
                </span>
              </div>

              <h1 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Welcome back, {currentUser.name} 👋
              </h1>

              <p style={{ color: '#D1E7D5', maxWidth: '600px', fontSize: '0.95rem' }}>
                {isRestaurant 
                  ? 'Your surplus food rescues are tracked towards your verified Corporate ESG sustainability score and Zero-Waste leadership credentials.'
                  : 'Every single meal you donate provides vital nourishment to neighborhood families and elderly shelters.'}
              </p>
            </div>

            {/* Top Right Action & Role Quick-Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
              <button 
                className="btn btn-lg"
                style={{ background: '#FFFFFF', color: 'var(--green-dark)', fontWeight: 700 }}
                onClick={() => setIsDonateModalOpen(true)}
                id="provider-donate-cta-btn"
              >
                <PlusCircle size={20} color="var(--green-primary)" />
                <span>+ Donate Surplus Food</span>
              </button>

              {/* Fast Persona Switcher Toggle */}
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '4px', borderRadius: 'var(--radius-full)', display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => switchRole('restaurant')}
                  style={{
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                    background: isRestaurant ? '#FFFFFF' : 'transparent',
                    color: isRestaurant ? 'var(--green-dark)' : '#DDEFE0'
                  }}
                >
                  🏢 Restaurant View
                </button>
                <button
                  onClick={() => switchRole('individual')}
                  style={{
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                    background: !isRestaurant ? '#FFFFFF' : 'transparent',
                    color: !isRestaurant ? 'var(--green-dark)' : '#DDEFE0'
                  }}
                >
                  👤 Individual View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Restaurant ESG Impact Score Card */}
        {isRestaurant && <RestaurantImpactCard />}

        {/* Summary Stats Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Rescued Batches</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--green-dark)', marginTop: '4px' }}>
              {myDonations.length + 18}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)' }}>100% Edible Sustenance</div>
          </div>

          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Meals Rescued</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--green-dark)', marginTop: '4px' }}>
              {currentUser.mealsSaved.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)' }}>Served to 6 Shelters</div>
          </div>

          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Successfully Delivered</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--green-dark)', marginTop: '4px' }}>
              {pastDonations.length + 16}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)' }}>Zero Food Spoilage</div>
          </div>

          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Currently Active</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--urgent-red)', marginTop: '4px' }}>
              {activeDonations.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>In Rescue Queue</div>
          </div>
        </div>

        {/* Tab Toggle: Active Donations vs Donation History */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setViewFilter('active')}
              style={{
                padding: '8px 18px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                background: viewFilter === 'active' ? 'var(--green-light)' : 'transparent',
                color: viewFilter === 'active' ? 'var(--green-dark)' : 'var(--text-muted)'
              }}
            >
              ⚡ Active Donations ({activeDonations.length})
            </button>
            <button
              onClick={() => setViewFilter('history')}
              style={{
                padding: '8px 18px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                background: viewFilter === 'history' ? 'var(--green-light)' : 'transparent',
                color: viewFilter === 'history' ? 'var(--green-dark)' : 'var(--text-muted)'
              }}
            >
              📜 Donation History ({pastDonations.length})
            </button>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('map')}
          >
            <MapPin size={15} />
            <span>View All On Live Map</span>
          </button>
        </div>

        {/* Content Section: Active vs History */}
        {viewFilter === 'active' ? (
          <div>
            {activeDonations.length === 0 ? (
              <div className="card" style={{ padding: '48px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🍱</div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '6px' }}>
                  No Active Surplus Donations Right Now
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Have extra edible food from your lunch rush, event, or kitchen? Post a donation in 30 seconds.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setIsDonateModalOpen(true)}
                >
                  <PlusCircle size={18} />
                  <span>Donate Food Batch</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeDonations.map((donation) => {
                  const stepNum = getStepProgress(donation.status);
                  const isUrgent = donation.urgency === 'urgent';

                  return (
                    <div key={donation.id} className="card" style={{ padding: '24px', borderLeft: isUrgent ? '5px solid var(--urgent-red)' : '5px solid var(--green-primary)' }}>
                      
                      {/* Top Header info */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span className={`badge ${isUrgent ? 'badge-urgent' : 'badge-soon'}`}>
                              {isUrgent ? '🔴 Urgent Rescue Needed' : '🟠 Expiring Soon'}
                            </span>
                            <span className="badge badge-gray">{donation.category}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {donation.id}</span>
                          </div>

                          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-dark)' }}>
                            {donation.title}
                          </h3>

                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            📍 {donation.providerAddress} • 📞 {donation.contactPhone}
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--green-dark)' }}>
                            {donation.servings} Servings
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Weight: {donation.quantityKg} kg
                          </div>
                          <div style={{ fontSize: '0.8rem', color: isUrgent ? 'var(--urgent-red)' : 'var(--warning-amber-text)', fontWeight: 700, marginTop: '2px' }}>
                            ⏰ {donation.expiresAt}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Tracking Stepper */}
                      <div style={{ background: '#FAFCFA', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', margin: '16px 0' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>
                          Live Rescue Tracking Journey
                        </div>

                        <div className="tracking-stepper">
                          {/* Step 1: Created */}
                          <div className={`step-node ${stepNum >= 1 ? 'completed' : ''}`}>
                            <div className="step-circle">1</div>
                            <span className="step-label">Posted</span>
                          </div>

                          {/* Step 2: Claimed */}
                          <div className={`step-node ${stepNum >= 2 ? (stepNum === 2 ? 'active' : 'completed') : ''}`}>
                            <div className="step-circle">2</div>
                            <span className="step-label">NGO Claimed</span>
                          </div>

                          {/* Step 3: Pickup Started */}
                          <div className={`step-node ${stepNum >= 3 ? (stepNum === 3 ? 'active' : 'completed') : ''}`}>
                            <div className="step-circle">3</div>
                            <span className="step-label">Volunteer En Route</span>
                          </div>

                          {/* Step 4: Collected & Delivering */}
                          <div className={`step-node ${stepNum >= 4 ? (stepNum === 4 ? 'active' : 'completed') : ''}`}>
                            <div className="step-circle">4</div>
                            <span className="step-label">Delivered ❤️</span>
                          </div>
                        </div>

                        {/* Status update narrative note */}
                        <div style={{ marginTop: '12px', padding: '10px 14px', background: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-green)', fontSize: '0.825rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <strong>Current Status: </strong>
                            <span style={{ color: 'var(--green-dark)', textTransform: 'capitalize', fontWeight: 700 }}>
                              {donation.status.replace('_', ' ')}
                            </span>
                            {donation.claimedByNgoName && (
                              <span> by <strong>{donation.claimedByNgoName}</strong> ({donation.assignedVolunteer || 'Volunteer Team'})</span>
                            )}
                          </div>

                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {donation.statusUpdates[donation.statusUpdates.length - 1]?.timestamp || 'Recent'}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Footer Actions */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                          Packaging: <strong>{donation.packaging}</strong> • Dietary: {donation.dietary.join(', ')}
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => {
                              setSelectedRescueForMission(donation);
                              setActiveTab('ngo');
                            }}
                          >
                            <Truck size={14} />
                            <span>Track Rescue Details</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Past Donation History */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pastDonations.map(donation => (
              <div key={donation.id} className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--success-green-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success-green-text)', fontSize: '1.25rem' }}>
                    ✅
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-dark)' }}>{donation.title}</h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      Rescued by <strong>{donation.claimedByNgoName || 'Robin Hood Army'}</strong> • Delivered to {donation.targetDestination || 'St. Jude Homeless Shelter'}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--green-dark)' }}>
                    {donation.servings} Meals Delivered
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--green-primary)', fontWeight: 600 }}>
                    +35 ESG Points Awarded
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
