import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { RescueCard } from './RescueCard';
import { ActiveMissionModal } from './ActiveMissionModal';
import { 
  ShieldAlert, 
  Zap, 
  Clock, 
  MapPin, 
  Filter, 
  Truck, 
  Sparkles, 
  HeartHandshake, 
  Bike,
  CheckCircle2,
  Users
} from 'lucide-react';

export const NGORescueHub = () => {
  const { 
    donations, 
    currentUser, 
    switchRole, 
    setActiveTab, 
    ngos, 
    volunteers, 
    selectedRescueForMission 
  } = useAppState();

  const [filterMode, setFilterMode] = useState('all');

  const urgentDonations = donations.filter(d => d.urgency === 'urgent' && d.status === 'available');
  const mediumDonations = donations.filter(d => d.urgency === 'soon' && d.status === 'available');
  const flexibleDonations = donations.filter(d => d.urgency === 'flexible' && d.status === 'available');
  const inProgressMissions = donations.filter(d => d.status === 'claimed' || d.status === 'pickup_started' || d.status === 'collected');

  const isNgoOrVolunteer = currentUser.role === 'ngo' || currentUser.role === 'volunteer';

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="section-container">
        
        {/* Hub Header */}
        <div style={{ background: 'linear-gradient(135deg, #1F5C38 0%, #133C24 100%)', color: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '36px 32px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
                <ShieldAlert size={14} /> NGO & Volunteer Emergency Command Hub
              </div>

              <h1 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Urgent Food Rescue Dispatch
              </h1>

              <p style={{ color: '#D1E7D5', maxWidth: '640px', fontSize: '0.95rem' }}>
                Prioritized by expiration window and distance. Claim a mission to dispatch trained volunteers with thermal containers and feed verified community shelters.
              </p>
            </div>

            {/* Quick Demo Switcher for Evaluation */}
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: '#DDEFE0', marginBottom: '6px' }}>Acting Persona:</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#A3D9A5', textTransform: 'capitalize', marginBottom: '8px' }}>
                Role: {currentUser.role}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => switchRole('ngo')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    background: currentUser.role === 'ngo' ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    color: currentUser.role === 'ngo' ? 'var(--green-dark)' : '#FFFFFF'
                  }}
                >
                  🤝 NGO Dispatch
                </button>
                <button
                  onClick={() => switchRole('volunteer')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    background: currentUser.role === 'volunteer' ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    color: currentUser.role === 'volunteer' ? 'var(--green-dark)' : '#FFFFFF'
                  }}
                >
                  🚴 Volunteer Courier
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Alert Banner if urgent donations exist */}
        {urgentDonations.length > 0 && (
          <div style={{
            background: 'var(--urgent-red-bg)',
            border: '2px solid var(--urgent-red)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px 24px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: 'var(--shadow-urgent)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--urgent-red)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                🚨
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--urgent-red)', fontWeight: 800 }}>
                  {urgentDonations.length} High-Urgency Food Rescue{urgentDonations.length > 1 ? 's' : ''} Expiring Within 45 Minutes!
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--urgent-red-text)' }}>
                  Hot banquet and fresh cooked meals require immediate collection before edible quality drops.
                </p>
              </div>
            </div>

            <button 
              className="btn btn-urgent"
              onClick={() => {
                const element = document.getElementById('urgent-rescue-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Zap size={16} />
              <span>Jump to Urgent Batch ({urgentDonations.length})</span>
            </button>
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilterMode('all')}
              style={{
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                background: filterMode === 'all' ? 'var(--green-light)' : 'transparent',
                color: filterMode === 'all' ? 'var(--green-dark)' : 'var(--text-muted)'
              }}
            >
              All Available ({donations.filter(d => d.status === 'available').length})
            </button>

            <button
              onClick={() => setFilterMode('urgent')}
              style={{
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                background: filterMode === 'urgent' ? 'var(--urgent-red-bg)' : 'transparent',
                color: filterMode === 'urgent' ? 'var(--urgent-red)' : 'var(--text-muted)'
              }}
            >
              🔴 Urgent Only ({urgentDonations.length})
            </button>

            <button
              onClick={() => setFilterMode('bulk')}
              style={{
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                background: filterMode === 'bulk' ? 'var(--green-light)' : 'transparent',
                color: filterMode === 'bulk' ? 'var(--green-dark)' : 'var(--text-muted)'
              }}
            >
              ⚡ Bulk Rescues (&gt; 50 Servings)
            </button>

            <button
              onClick={() => setFilterMode('active_missions')}
              style={{
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                background: filterMode === 'active_missions' ? 'var(--green-dark)' : 'transparent',
                color: filterMode === 'active_missions' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              🚚 In-Transit Missions ({inProgressMissions.length})
            </button>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('map')}
          >
            <MapPin size={15} />
            <span>Switch to Map View</span>
          </button>
        </div>

        {/* SECTION 1: 🔴 URGENT PRIORITY RESCUES */}
        {(filterMode === 'all' || filterMode === 'urgent') && urgentDonations.length > 0 && (
          <div id="urgent-rescue-section" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--urgent-red)', animation: 'pulse-urgent 1.5s infinite' }} />
              <h2 style={{ fontSize: '1.4rem', color: 'var(--urgent-red)', fontWeight: 800 }}>
                🔴 HIGH URGENCY RESCUES (Expiring &lt; 60 mins)
              </h2>
            </div>

            <div className="rescue-card-grid">
              {urgentDonations.map(donation => (
                <RescueCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: 🟠 MEDIUM PRIORITY (Soon) */}
        {(filterMode === 'all' || filterMode === 'bulk') && mediumDonations.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning-amber)' }} />
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', fontWeight: 700 }}>
                🟠 MEDIUM PRIORITY RESCUES (Safe for 2–4 hours)
              </h2>
            </div>

            <div className="rescue-card-grid">
              {mediumDonations
                .filter(d => filterMode === 'bulk' ? d.servings >= 50 : true)
                .map(donation => (
                  <RescueCard key={donation.id} donation={donation} />
                ))}
            </div>
          </div>
        )}

        {/* SECTION 3: 🟢 FLEXIBLE / PACKAGED SURPLUS */}
        {filterMode === 'all' && flexibleDonations.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--green-primary)' }} />
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', fontWeight: 700 }}>
                🟢 STANDARD / PACKAGED SURPLUS (Safe for 6+ hours)
              </h2>
            </div>

            <div className="rescue-card-grid">
              {flexibleDonations.map(donation => (
                <RescueCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: 🚚 IN-TRANSIT RESCUE MISSIONS */}
        {(filterMode === 'active_missions' || filterMode === 'all') && inProgressMissions.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Truck size={20} color="var(--green-dark)" />
              <h2 style={{ fontSize: '1.4rem', color: 'var(--green-dark)', fontWeight: 800 }}>
                🚚 ACTIVE ONGOING RESCUE MISSIONS ({inProgressMissions.length})
              </h2>
            </div>

            <div className="rescue-card-grid">
              {inProgressMissions.map(donation => (
                <RescueCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Active Mission Workflow Modal */}
      <ActiveMissionModal />
    </div>
  );
};
