import React from 'react';
import { useAppState } from './context/AppStateContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/landing/Hero';
import { CampaignLiveOperations } from './components/landing/CampaignLiveOperations';
import { ProcessFlow } from './components/landing/ProcessFlow';
import { LiveRescueMap } from './components/map/LiveRescueMap';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { DonateFoodModal } from './components/provider/DonateFoodModal';
import { NGORescueHub } from './components/ngo/NGORescueHub';
import { CommunityLeaderboard } from './components/leaderboard/CommunityLeaderboard';
import { ImpactReport } from './components/impact/ImpactReport';
import { RoleSwitcherModal } from './components/auth/RoleSwitcherModal';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Zap, 
  Sparkles,
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  MapPin, 
  Utensils 
} from 'lucide-react';

export const App = () => {
  const { activeTab, toasts, removeToast, setActiveTab, setIsDonateModalOpen, donations } = useAppState();

  const urgentRescues = donations.filter(d => d.urgency === 'urgent' && d.status === 'available');

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* VIEW 1: HOME LANDING PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero />

            {/* Active Ground Rescue Operations & Beneficiary Shelters */}
            <CampaignLiveOperations />

            {/* Process Flow Section */}
            <ProcessFlow />

            {/* Live Rescue Map Section */}
            <LiveRescueMap isEmbedded={false} />

            {/* Why AnnamAmrut: 3-Pillar Solution Section */}
            <section style={{ padding: '70px 0', background: '#FAFCFA' }}>
              <div className="section-container">
                <div className="section-header">
                  <div className="section-tag">
                    <Sparkles size={14} />
                    <span>Why AnnamAmrut?</span>
                  </div>
                  <h2 className="section-title">Bridging the Gap Between Surplus & Sustenance</h2>
                  <p className="section-subtitle">
                    Traditional charity takes hours to mobilize. AnnamAmrut turns food rescue into an ultra-fast, gamified community mission.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
                  
                  {/* Pillar 1 */}
                  <div className="card" style={{ padding: '32px', borderTop: '4px solid var(--urgent-red)' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--urgent-red-bg)', color: 'var(--urgent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '20px' }}>
                      ⚡
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
                      Urgency-Ranked Dispatch
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      Food that expires in 45 minutes triggers top priority alerts to nearby motorbike couriers and rapid-response NGOs, ensuring zero edible food turns into waste.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="card" style={{ padding: '32px', borderTop: '4px solid var(--green-primary)' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--green-light)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '20px' }}>
                      🌱
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
                      Restaurant ESG Gamification
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      Restaurants and caterers earn verified corporate social impact points, carbon credit calculations, and leadership badges for their sustainability reporting.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="card" style={{ padding: '32px', borderTop: '4px solid #3B82F6' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#E0F2FE', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '20px' }}>
                      🛡️
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
                      Full Chain-of-Custody Tracking
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      Every donation is tracked step-by-step from kitchen packaging to volunteer pickup and shelter handover with temperature verification and proof of distribution.
                    </p>
                  </div>

                </div>

                {/* Quick Community CTA Banner */}
                <div style={{ marginTop: '50px', background: 'linear-gradient(135deg, var(--green-dark), #12331F)', borderRadius: 'var(--radius-xl)', padding: '40px 36px', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                  <div>
                    <span className="badge badge-green" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: 'none', marginBottom: '10px' }}>
                      Ready to Rescue Meals?
                    </span>
                    <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '6px' }}>
                      Be the reason someone sleeps with a full stomach tonight.
                    </h3>
                    <p style={{ color: '#D1E7D5', fontSize: '0.95rem', maxWidth: '560px' }}>
                      Join 120+ restaurants, 45 NGOs, and hundreds of volunteer riders across the city.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      className="btn btn-lg"
                      style={{ background: '#FFFFFF', color: 'var(--green-dark)', fontWeight: 700 }}
                      onClick={() => setIsDonateModalOpen(true)}
                    >
                      + Donate Food Now
                    </button>
                    <button 
                      className="btn btn-lg"
                      style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600 }}
                      onClick={() => setActiveTab('ngo')}
                    >
                      <span>Join as Volunteer</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: FULL MAP VIEW */}
        {activeTab === 'map' && (
          <div style={{ padding: '20px 0 60px' }}>
            <LiveRescueMap isEmbedded={false} />
          </div>
        )}

        {/* VIEW 3: PROVIDER PORTAL */}
        {activeTab === 'provider' && <ProviderDashboard />}

        {/* VIEW 4: NGO & VOLUNTEER RESCUE HUB */}
        {activeTab === 'ngo' && <NGORescueHub />}

        {/* VIEW 5: COMMUNITY LEADERBOARDS */}
        {activeTab === 'leaderboard' && <CommunityLeaderboard />}

        {/* VIEW 6: COLLECTIVE IMPACT REPORT */}
        {activeTab === 'impact' && <ImpactReport />}

      </main>

      {/* Global Modals */}
      <DonateFoodModal />
      <RoleSwitcherModal />

      {/* Global Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`toast-item ${
              toast.type === 'urgent' ? 'toast-urgent' :
              toast.type === 'warning' ? 'toast-warning' : ''
            }`}
          >
            <div style={{ marginTop: '2px' }}>
              {toast.type === 'urgent' ? (
                <AlertTriangle size={18} color="var(--urgent-red)" />
              ) : toast.type === 'success' ? (
                <CheckCircle2 size={18} color="var(--green-primary)" />
              ) : (
                <Info size={18} color="var(--green-dark)" />
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {toast.desc}
              </div>
            </div>

            <button 
              onClick={() => removeToast(toast.id)}
              style={{ color: 'var(--text-muted)', padding: '2px' }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
