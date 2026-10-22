import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Heart, Shield, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, setIsDonateModalOpen } = useAppState();

  return (
    <footer style={{ background: '#133C24', color: '#FFFFFF', paddingTop: '60px', paddingBottom: '30px' }}>
      <div className="section-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Col 1: Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '38px', height: '38px', background: '#4F8A5B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                🌿
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>
                AnnamAmrut
              </span>
            </div>
            <p style={{ color: '#D1E7D5', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              From surplus to sustenance. AnnamAmrut coordinates surplus meals from conscientious food businesses and individuals to verified hunger-relief organizations before edible food goes to waste.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', color: '#DDEFE0' }}>
              <Shield size={14} color="#88C496" />
              <span>Zero-Waste SDG 2 & 12 Compliant</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px', color: '#FFFFFF' }}>Platform Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#D1E7D5' }}>
              <li>
                <button onClick={() => setActiveTab('home')} style={{ color: '#D1E7D5', textAlign: 'left' }} onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseOut={(e) => (e.currentTarget.style.color = '#D1E7D5')}>
                  🏠 Home & Process Flow
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} style={{ color: '#D1E7D5', textAlign: 'left' }} onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseOut={(e) => (e.currentTarget.style.color = '#D1E7D5')}>
                  🗺️ Live Rescue Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('provider')} style={{ color: '#D1E7D5', textAlign: 'left' }} onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseOut={(e) => (e.currentTarget.style.color = '#D1E7D5')}>
                  🍱 Provider Hub & ESG Points
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ngo')} style={{ color: '#D1E7D5', textAlign: 'left' }} onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseOut={(e) => (e.currentTarget.style.color = '#D1E7D5')}>
                  🚨 Urgent NGO Rescues
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('leaderboard')} style={{ color: '#D1E7D5', textAlign: 'left' }} onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseOut={(e) => (e.currentTarget.style.color = '#D1E7D5')}>
                  🏆 Community Hall of Fame
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('impact')} style={{ color: '#D1E7D5', textAlign: 'left' }} onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseOut={(e) => (e.currentTarget.style.color = '#D1E7D5')}>
                  📊 Collective Impact Metrics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Providers & NGOs */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px', color: '#FFFFFF' }}>For Food Providers</h4>
            <p style={{ color: '#D1E7D5', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '14px' }}>
              Are you a restaurant, banquet, bakery, or cafeteria? Turn leftover food into verified ESG social impact points and tax CSR credentials.
            </p>
            <button 
              className="btn btn-sm" 
              style={{ background: '#4F8A5B', color: '#FFFFFF', fontWeight: 700 }}
              onClick={() => setIsDonateModalOpen(true)}
            >
              <Sparkles size={14} /> Log Surplus Batch
            </button>
          </div>

          {/* Col 4: 24/7 Hotline */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px', color: '#FFFFFF' }}>Rescue Dispatch Desk</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#D1E7D5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#88C496" />
                <span>Emergency Hotline: <strong>1800-ANNAM-SEVA</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#88C496" />
                <span>support@annamamrut.org</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="#88C496" />
                <span>City Rescue Command Center</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: '#A3D9A5' }}>
          <div>
            © 2026 AnnamAmrut Humanitarian Food Rescue Network. Built with <Heart size={13} color="#EF4444" style={{ display: 'inline', margin: '0 2px' }} /> for Zero Hunger &amp; Zero Food Waste.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Food Safety Guidelines (FSSAI)</span>
            <span>Volunteer Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
