import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Sparkles, 
  MapPin, 
  PlusCircle, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Heart, 
  Zap,
  CheckCircle2,
  ShieldAlert,
  Users,
  Target,
  Flame,
  Radio,
  Building2,
  Bike
} from 'lucide-react';

export const Hero = () => {
  const { 
    setActiveTab, 
    setIsDonateModalOpen, 
    donations,
    ngos,
    switchRole
  } = useAppState();

  const totalMeals = donations.reduce((acc, d) => acc + d.servings, 14850);
  const totalKg = donations.reduce((acc, d) => acc + d.quantityKg, 4120);
  const urgentCount = donations.filter(d => d.urgency === 'urgent' && d.status === 'available').length;

  const campaignTarget = 20000;
  const progressPercent = Math.min(100, Math.round((totalMeals / campaignTarget) * 100));

  return (
    <section className="hero-section" id="home">
      <div className="section-container">
        <div className="hero-grid">
          
          {/* Left Column: NGO Campaign Mission & Call to Action */}
          <div>
            <div className="hero-pill" style={{ background: 'rgba(31, 92, 56, 0.08)', borderColor: 'var(--green-primary)' }}>
              <Radio size={15} color="var(--urgent-red)" className="pulse-icon" />
              <span style={{ fontWeight: 700, color: 'var(--green-dark)' }}>
                Mission Annapurna 2026 • City-Wide Hunger Relief Campaign
              </span>
            </div>

            <h1 className="hero-title">
              No Plate Left Empty. <br />
              <span className="highlight">No Good Food Wasted.</span>
            </h1>

            <p className="hero-desc">
              A fast-action humanitarian movement uniting commercial kitchens, volunteer couriers, and <strong>45+ verified shelter NGOs</strong>. We mobilize in minutes to rescue hot, surplus meals and deliver direct nourishment to orphanages, elderly homes, and daily-wage families.
            </p>

            <div className="hero-cta-group">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => {
                  switchRole('volunteer');
                  setActiveTab('ngo');
                }}
                id="hero-join-rescue-btn"
                style={{ background: 'var(--urgent-red)', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)' }}
              >
                <Zap size={20} />
                <span>Join Active Rescue Missions</span>
              </button>

              <button 
                className="btn btn-outline btn-lg"
                onClick={() => setIsDonateModalOpen(true)}
                id="hero-donate-surplus-btn"
                style={{ borderColor: 'var(--green-dark)', color: 'var(--green-dark)', fontWeight: 700 }}
              >
                <PlusCircle size={20} />
                <span>Pledge Surplus Food</span>
              </button>

              <button 
                className="btn btn-ghost btn-lg"
                onClick={() => {
                  const mapElement = document.getElementById('rescue-map-section');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveTab('map');
                  }
                }}
                id="hero-explore-map-btn"
              >
                <MapPin size={18} />
                <span>Live City Radar</span>
              </button>
            </div>

            {/* Campaign Impact Strip */}
            <div className="hero-stats-strip">
              <div className="stat-item">
                <span className="stat-value">{totalMeals.toLocaleString()}+</span>
                <span className="stat-label">🍲 Meals Rescued</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{totalKg.toLocaleString()} kg</span>
                <span className="stat-label">🌱 Waste Diverted (~10.3t CO₂e)</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">48 Shelters</span>
                <span className="stat-label">🤝 Verified Partner NGOs</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">14 Mins</span>
                <span className="stat-label">⚡ Avg. Rescue Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: NGO Live Campaign Operations Command Hub */}
          <div className="campaign-hero-monitor">
            {/* Monitor Header with Live Beacon */}
            <div className="monitor-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-pulse-dot" />
                <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#DDEFE0' }}>
                  Live Operations Command Hub
                </span>
              </div>
              <span className="badge badge-urgent" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                🔴 {urgentCount > 0 ? `${urgentCount} Urgent Dispatches` : 'Ready for Dispatch'}
              </span>
            </div>

            {/* Monthly Campaign Goal Bar */}
            <div className="campaign-goal-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Target size={16} color="#88C496" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                    August 2026 Rescue Target
                  </span>
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FEF08A' }}>
                  {progressPercent}% Complete
                </span>
              </div>

              <div className="campaign-progress-track">
                <div 
                  className="campaign-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#D1E7D5', marginTop: '6px' }}>
                <span><strong>{totalMeals.toLocaleString()}</strong> Meals Delivered</span>
                <span>Goal: <strong>{campaignTarget.toLocaleString()}</strong></span>
              </div>
            </div>

            {/* Live Operations Stream */}
            <div className="monitor-stream-list">
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#88C496', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={12} color="#88C496" /> Live Rescue Dispatches on the Ground
              </div>

              {/* Live Mission Item 1 */}
              <div className="mission-stream-card urgent">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="mission-type-tag">🍛 80 Cooked Meals</span>
                    <span style={{ fontSize: '0.72rem', color: '#991B1B', fontWeight: 700 }}>⏳ 38m urgency</span>
                  </div>
                  <span className="badge badge-urgent" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                    IN-TRANSIT
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  GreenLeaf Bistro ➔ Sneha Sadan Orphanage
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--green-dark)', marginTop: '4px' }}>
                  <Bike size={13} />
                  <span>Volunteer Arun on e-bike (ETA: 11 mins)</span>
                </div>
              </div>

              {/* Live Mission Item 2 */}
              <div className="mission-stream-card pending">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="mission-type-tag" style={{ background: '#FEF3C7', color: '#92400E' }}>🍞 120 Bakery &amp; Pantry Packs</span>
                    <span style={{ fontSize: '0.72rem', color: '#B45309', fontWeight: 700 }}>⏳ 55m urgency</span>
                  </div>
                  <span className="badge badge-warning" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                    NEEDS COURIER
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  Taj Banquet Hall ➔ Dharavi Community Kitchen
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--urgent-red)', marginTop: '4px', fontWeight: 600 }}>
                  <Zap size={13} />
                  <span>Broadcast to 14 registered volunteers in 2km radius</span>
                </div>
              </div>

              {/* Live Mission Item 3 */}
              <div className="mission-stream-card verified">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="mission-type-tag" style={{ background: '#DCFCE7', color: '#166534' }}>🥗 45 Wholesome Meals</span>
                    <span style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>✅ Delivered</span>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                    FEEDING COMPLETE
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  Powai Food Hub ➔ Prerna Senior Care Shelter
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#047857', marginTop: '4px' }}>
                  <CheckCircle2 size={13} />
                  <span>FSSAI quality logged • Recipient photo verified</span>
                </div>
              </div>
            </div>

            {/* Hub Action Footer */}
            <div className="monitor-footer">
              <button 
                className="btn btn-sm btn-primary"
                style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #1F5C38, #133C24)', border: '1px solid #88C496', padding: '10px' }}
                onClick={() => {
                  switchRole('volunteer');
                  setActiveTab('ngo');
                }}
              >
                <span>⚡ Open Rescue Dispatch Desk &amp; Claim Missions</span>
                <ArrowRight size={15} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '12px', fontSize: '0.73rem', color: '#D1E7D5' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={13} color="#88C496" /> FSSAI Certified
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={13} color="#88C496" /> 100% Non-Profit
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Heart size={13} color="#EF4444" /> SDG 2 Zero Hunger
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
