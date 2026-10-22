import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  HeartHandshake, 
  MapPin, 
  UtensilsCrossed, 
  ShieldAlert, 
  Trophy, 
  BarChart3, 
  PlusCircle, 
  UserCheck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    setIsDonateModalOpen, 
    setIsAuthModalOpen,
    donations 
  } = useAppState();

  const urgentCount = donations.filter(d => d.urgency === 'urgent' && d.status === 'available').length;

  return (
    <header className="navbar-container">
      {/* Urgent Announcement Bar */}
      {urgentCount > 0 && (
        <div className="urgency-ticker-bar">
          <div className="ticker-pulse" />
          <AlertCircle size={15} />
          <span>
            <strong>URGENT RESCUE ALERT:</strong> {urgentCount} meal donation{urgentCount > 1 ? 's' : ''} expiring within 60 minutes near you!
          </span>
          <button 
            onClick={() => setActiveTab('ngo')}
            style={{ 
              color: '#FFFFFF', 
              textDecoration: 'underline', 
              fontWeight: 700, 
              marginLeft: '8px',
              fontSize: '0.8rem' 
            }}
          >
            Rescue Now →
          </button>
        </div>
      )}

      {/* Main Nav */}
      <nav className="navbar">
        <div className="section-container navbar-content">
          {/* Logo */}
          <a 
            href="#home" 
            className="brand-logo"
            onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}
          >
            <div className="brand-icon">
              <span>🌿</span>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">AnnamAmrut</span>
              <span className="brand-tagline">From Surplus to Sustenance</span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="nav-links">
            <button 
              className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <span>🏠</span> Home
            </button>
            
            <button 
              className={`nav-link-btn ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              <MapPin size={16} /> Live Map
            </button>

            <button 
              className={`nav-link-btn ${activeTab === 'provider' ? 'active' : ''}`}
              onClick={() => setActiveTab('provider')}
            >
              <UtensilsCrossed size={16} /> Provider Portal
            </button>

            <button 
              className={`nav-link-btn ${activeTab === 'ngo' ? 'active' : ''}`}
              onClick={() => setActiveTab('ngo')}
            >
              <ShieldAlert size={16} /> NGO / Volunteer
              {urgentCount > 0 && (
                <span className="badge badge-urgent" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>
                  {urgentCount}
                </span>
              )}
            </button>

            <button 
              className={`nav-link-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              <Trophy size={16} /> Leaderboards
            </button>

            <button 
              className={`nav-link-btn ${activeTab === 'impact' ? 'active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              <BarChart3 size={16} /> Impact Report
            </button>
          </div>

          {/* Nav Right Actions */}
          <div className="nav-actions">
            {/* Quick Donate Button */}
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setIsDonateModalOpen(true)}
              id="nav-donate-food-btn"
            >
              <PlusCircle size={16} />
              <span>Donate Food</span>
            </button>

            {/* Switch Role / Active Persona Pill */}
            <button 
              className="role-badge-pill"
              onClick={() => setIsAuthModalOpen(true)}
              title="Click to switch demo role (Restaurant, Individual, NGO, Volunteer)"
              id="nav-role-switcher-btn"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="role-avatar" 
              />
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  {currentUser.name.length > 14 ? currentUser.name.substring(0, 14) + '...' : currentUser.name}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--green-primary)', textTransform: 'capitalize' }}>
                  {currentUser.role === 'restaurant' ? '🏢 Restaurant (ESG)' :
                   currentUser.role === 'individual' ? '👤 Donor' :
                   currentUser.role === 'ngo' ? '🤝 NGO Rescue' :
                   currentUser.role === 'volunteer' ? '🚴 Volunteer' : 'Guest'}
                </div>
              </div>
              <Sparkles size={14} color="#F59E0B" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
