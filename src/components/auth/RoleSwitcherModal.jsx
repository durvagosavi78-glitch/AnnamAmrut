import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { DEMO_PROFILES } from '../../data/mockData';
import { 
  X, 
  Building2, 
  User, 
  HeartHandshake, 
  Bike, 
  CheckCircle2, 
  Sparkles, 
  Award,
  ArrowRight
} from 'lucide-react';

export const RoleSwitcherModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    currentUser, 
    switchRole,
    setActiveTab,
    setIsDonateModalOpen
  } = useAppState();

  const [activeTabMode, setActiveTabMode] = useState('quick_switch');
  
  // Custom signup fields
  const [customName, setCustomName] = useState('');
  const [customOrg, setCustomOrg] = useState('');
  const [customRole, setCustomRole] = useState('restaurant');
  const [customPhone, setCustomPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSelectRole = (role) => {
    switchRole(role);
    setIsAuthModalOpen(false);
    
    // Suggest relevant page based on selected role
    if (role === 'restaurant' || role === 'individual') {
      setActiveTab('provider');
    } else if (role === 'ngo' || role === 'volunteer') {
      setActiveTab('ngo');
    }
  };

  const handleCustomSignup = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    // Fast switch with customized persona
    switchRole(customRole);
    setIsAuthModalOpen(false);
    if (customRole === 'restaurant' || customRole === 'individual') {
      setActiveTab('provider');
    } else {
      setActiveTab('ngo');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '620px', padding: '28px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--green-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              🌿
            </div>
            <div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--green-dark)' }}>Select Demo Persona</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Experience AnnamAmrut from all sides of the rescue ecosystem</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher: Quick Demo vs Custom Register */}
        <div style={{ display: 'flex', background: '#F3F4F6', padding: '4px', borderRadius: 'var(--radius-md)', marginBottom: '22px' }}>
          <button
            onClick={() => setActiveTabMode('quick_switch')}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '0.88rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              background: activeTabMode === 'quick_switch' ? '#FFFFFF' : 'transparent',
              color: activeTabMode === 'quick_switch' ? 'var(--green-dark)' : 'var(--text-muted)',
              boxShadow: activeTabMode === 'quick_switch' ? 'var(--shadow-subtle)' : 'none'
            }}
          >
            ⚡ 1-Click Demo Profiles (For Judges)
          </button>
          <button
            onClick={() => setActiveTabMode('signup')}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '0.88rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              background: activeTabMode === 'signup' ? '#FFFFFF' : 'transparent',
              color: activeTabMode === 'signup' ? 'var(--green-dark)' : 'var(--text-muted)',
              boxShadow: activeTabMode === 'signup' ? 'var(--shadow-subtle)' : 'none'
            }}
          >
            ✍️ Custom Sign Up / Login
          </button>
        </div>

        {activeTabMode === 'quick_switch' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 1. Restaurant Demo Profile */}
            <div 
              onClick={() => handleSelectRole('restaurant')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                border: currentUser.role === 'restaurant' ? '2px solid var(--green-primary)' : '1px solid var(--border-color)',
                background: currentUser.role === 'restaurant' ? 'var(--green-light)' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={DEMO_PROFILES.restaurant.avatar} 
                  alt="Restaurant" 
                  style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)' }}>
                      {DEMO_PROFILES.restaurant.name}
                    </span>
                    <span className="badge badge-green">
                      <Building2 size={12} /> Food Business
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    🌱 <strong>{DEMO_PROFILES.restaurant.impactScore} ESG Pts</strong> • 2,450 Meals Saved • Rank #3
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {currentUser.role === 'restaurant' ? (
                  <CheckCircle2 size={20} color="var(--green-primary)" />
                ) : (
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-primary)' }}>
                    Switch →
                  </span>
                )}
              </div>
            </div>

            {/* 2. Individual Donor Profile */}
            <div 
              onClick={() => handleSelectRole('individual')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                border: currentUser.role === 'individual' ? '2px solid var(--green-primary)' : '1px solid var(--border-color)',
                background: currentUser.role === 'individual' ? 'var(--green-light)' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={DEMO_PROFILES.individual.avatar} 
                  alt="Individual" 
                  style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)' }}>
                      {DEMO_PROFILES.individual.name}
                    </span>
                    <span className="badge" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                      <User size={12} /> Individual Donor
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    ❤️ Home kitchen & packaged pantry food donor • 95 meals saved
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {currentUser.role === 'individual' ? (
                  <CheckCircle2 size={20} color="var(--green-primary)" />
                ) : (
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-primary)' }}>
                    Switch →
                  </span>
                )}
              </div>
            </div>

            {/* 3. NGO Organization Profile */}
            <div 
              onClick={() => handleSelectRole('ngo')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                border: currentUser.role === 'ngo' ? '2px solid var(--green-primary)' : '1px solid var(--border-color)',
                background: currentUser.role === 'ngo' ? 'var(--green-light)' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={DEMO_PROFILES.ngo.avatar} 
                  alt="NGO" 
                  style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)' }}>
                      {DEMO_PROFILES.ngo.name}
                    </span>
                    <span className="badge" style={{ background: '#FEF3C7', color: '#92400E' }}>
                      <HeartHandshake size={12} /> NGO Rescue Unit
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    🔥 18 Collections today • 42 Volunteers • Dadar Hub
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {currentUser.role === 'ngo' ? (
                  <CheckCircle2 size={20} color="var(--green-primary)" />
                ) : (
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-primary)' }}>
                    Switch →
                  </span>
                )}
              </div>
            </div>

            {/* 4. Volunteer Profile */}
            <div 
              onClick={() => handleSelectRole('volunteer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                border: currentUser.role === 'volunteer' ? '2px solid var(--green-primary)' : '1px solid var(--border-color)',
                background: currentUser.role === 'volunteer' ? 'var(--green-light)' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={DEMO_PROFILES.volunteer.avatar} 
                  alt="Volunteer" 
                  style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)' }}>
                      {DEMO_PROFILES.volunteer.name}
                    </span>
                    <span className="badge" style={{ background: '#EDE9FE', color: '#6D28D9' }}>
                      <Bike size={12} /> Star Volunteer
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    🚴 Bike Courier • 7 Deliveries Today • 490 Points
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {currentUser.role === 'volunteer' ? (
                  <CheckCircle2 size={20} color="var(--green-primary)" />
                ) : (
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-primary)' }}>
                    Switch →
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Custom Form */
          <form onSubmit={handleCustomSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Who are you? (Select Role)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {[
                  { role: 'restaurant', label: '🏢 Restaurant / Business' },
                  { role: 'individual', label: '👤 Individual Donor' },
                  { role: 'ngo', label: '🤝 NGO Organization' },
                  { role: 'volunteer', label: '🙋 Volunteer Hero' }
                ].map((item) => (
                  <button
                    type="button"
                    key={item.role}
                    onClick={() => setCustomRole(item.role)}
                    style={{
                      padding: '10px',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-md)',
                      border: customRole === item.role ? '2px solid var(--green-primary)' : '1px solid var(--border-color)',
                      background: customRole === item.role ? 'var(--green-light)' : '#FFFFFF',
                      color: customRole === item.role ? 'var(--green-dark)' : 'var(--text-dark)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Full Name / Contact Person *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chef Sanjay or Priya"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Organization / Restaurant Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Grand Spice Caterers"
                value={customOrg}
                onChange={(e) => setCustomOrg(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={customPhone}
                onChange={(e) => setCustomPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
              <span>Enter AnnamAmrut Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Footer info note */}
        <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--green-primary)" />
          <span>Switch roles at any time from the top navigation bar to test all user journeys!</span>
        </div>
      </div>
    </div>
  );
};
