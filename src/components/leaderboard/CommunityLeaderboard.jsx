import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { LiveRescueTicker } from './LiveRescueTicker';
import { 
  Trophy, 
  Flame, 
  Medal, 
  Building2, 
  HeartHandshake, 
  Bike, 
  Award, 
  Sparkles, 
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const CommunityLeaderboard = () => {
  const { leaderboards, currentUser, setActiveTab, setIsDonateModalOpen } = useAppState();
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="section-container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Trophy size={14} />
            <span>Community Hall of Fame</span>
          </div>
          <h1 className="section-title">Community Food Heroes & Leaderboard</h1>
          <p className="section-subtitle">
            Celebrating the restaurants, NGOs, and volunteer couriers driving zero-waste nourishment across our city.
          </p>
        </div>

        {/* Live Rescue Activity Stream Ticker */}
        <LiveRescueTicker />

        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-subtle)' }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '8px 20px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                background: activeCategory === 'all' ? 'var(--green-dark)' : 'transparent',
                color: activeCategory === 'all' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              🌟 All Heroes
            </button>
            <button
              onClick={() => setActiveCategory('restaurants')}
              style={{
                padding: '8px 20px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                background: activeCategory === 'restaurants' ? 'var(--green-dark)' : 'transparent',
                color: activeCategory === 'restaurants' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              🏢 Top Food Businesses
            </button>
            <button
              onClick={() => setActiveCategory('ngos')}
              style={{
                padding: '8px 20px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                background: activeCategory === 'ngos' ? 'var(--green-dark)' : 'transparent',
                color: activeCategory === 'ngos' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              🔥 Busiest NGOs Today
            </button>
            <button
              onClick={() => setActiveCategory('volunteers')}
              style={{
                padding: '8px 20px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                background: activeCategory === 'volunteers' ? 'var(--green-dark)' : 'transparent',
                color: activeCategory === 'volunteers' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              🚴 Star Volunteers
            </button>
          </div>
        </div>

        {/* 3-Column Podium Grid on Large Screens */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', marginBottom: '48px' }}>
          
          {/* SECTION 1: 🏆 TOP FOOD HEROES (Restaurants) */}
          {(activeCategory === 'all' || activeCategory === 'restaurants') && (
            <div className="card" style={{ padding: '24px', borderTop: '4px solid #F59E0B' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    🏆
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>Top Food Heroes</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Hospitality & Restaurants</div>
                  </div>
                </div>
                <span className="badge badge-green">ESG Ranked</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {leaderboards.restaurants.map((entry, idx) => (
                  <div 
                    key={entry.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '12px', 
                      borderRadius: 'var(--radius-md)', 
                      background: idx === 0 ? 'var(--green-light)' : 'var(--bg-main)',
                      border: idx === 0 ? '1px solid var(--border-green)' : '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className={`rank-badge rank-${idx + 1 <= 3 ? idx + 1 : 2}`}>
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                      </div>

                      {entry.avatar && (
                        <img 
                          src={entry.avatar} 
                          alt={entry.name} 
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      )}

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-dark)' }}>
                          {entry.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {entry.badge}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--green-dark)' }}>
                        {entry.mealsRescued.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--green-primary)', fontWeight: 600 }}>
                        🌱 {entry.points} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <button 
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => setIsDonateModalOpen(true)}
                >
                  + Climb the Leaderboard (Donate Food)
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: 🔥 BUSIEST NGOs TODAY */}
          {(activeCategory === 'all' || activeCategory === 'ngos') && (
            <div className="card" style={{ padding: '24px', borderTop: '4px solid var(--green-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    🔥
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>Busiest NGOs Today</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fastest Response & Rescues</div>
                  </div>
                </div>
                <span className="badge" style={{ background: '#FEE2E2', color: '#991B1B' }}>Active Squads</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {leaderboards.ngos.map((entry, idx) => (
                  <div 
                    key={entry.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '12px', 
                      borderRadius: 'var(--radius-md)', 
                      background: idx === 0 ? 'var(--green-light)' : 'var(--bg-main)',
                      border: idx === 0 ? '1px solid var(--border-green)' : '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className={`rank-badge rank-${idx + 1 <= 3 ? idx + 1 : 2}`}>
                        {idx + 1}
                      </div>

                      {entry.avatar && (
                        <img 
                          src={entry.avatar} 
                          alt={entry.name} 
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      )}

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-dark)' }}>
                          {entry.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', fontWeight: 600 }}>
                          {entry.badge}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--green-dark)' }}>
                        {entry.mealsRescued.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Meals Saved
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => setActiveTab('ngo')}
                >
                  Join NGO Rescue Missions →
                </button>
              </div>
            </div>
          )}

          {/* SECTION 3: 🌟 STAR VOLUNTEERS */}
          {(activeCategory === 'all' || activeCategory === 'volunteers') && (
            <div className="card" style={{ padding: '24px', borderTop: '4px solid #6366F1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    🚴
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>Star Courier Volunteers</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Community Frontline Riders</div>
                  </div>
                </div>
                <span className="badge" style={{ background: '#EDE9FE', color: '#6D28D9' }}>City Riders</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {leaderboards.volunteers.map((entry, idx) => (
                  <div 
                    key={entry.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '12px', 
                      borderRadius: 'var(--radius-md)', 
                      background: idx === 0 ? '#FAF5FF' : 'var(--bg-main)',
                      border: idx === 0 ? '1px solid #E9D5FF' : '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className={`rank-badge rank-${idx + 1 <= 3 ? idx + 1 : 2}`}>
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                      </div>

                      {entry.avatar && (
                        <img 
                          src={entry.avatar} 
                          alt={entry.name} 
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      )}

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-dark)' }}>
                          {entry.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 600 }}>
                          {entry.badge}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#6D28D9' }}>
                        {entry.points} pts
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {entry.mealsRescued} Deliveries
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <button 
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => setActiveTab('ngo')}
                >
                  Volunteer for Delivery →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
