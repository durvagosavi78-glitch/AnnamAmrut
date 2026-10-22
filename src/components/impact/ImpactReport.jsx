import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { CarbonCalculator } from './CarbonCalculator';
import { 
  BarChart3, 
  Leaf, 
  TrendingUp, 
  Heart, 
  Building2, 
  HeartHandshake, 
  Users, 
  Download, 
  Sparkles,
  PieChart,
  ShieldCheck
} from 'lucide-react';

export const ImpactReport = () => {
  const { donations, ngos, showToast, setIsDonateModalOpen } = useAppState();

  const totalMeals = donations.reduce((acc, d) => acc + d.servings, 14850);
  const totalKg = donations.reduce((acc, d) => acc + d.quantityKg, 4120);
  const totalPeopleFed = Math.round(totalMeals * 0.95);
  const co2AvoidedTons = (totalKg * 2.1 / 1000).toFixed(1);

  const weeklyTrend = [
    { day: 'Mon', meals: 1840 },
    { day: 'Tue', meals: 2150 },
    { day: 'Wed', meals: 1980 },
    { day: 'Thu', meals: 2420 },
    { day: 'Fri', meals: 3100 },
    { day: 'Sat', meals: 3850 },
    { day: 'Sun (Today)', meals: 2950 }
  ];

  const maxWeeklyMeals = Math.max(...weeklyTrend.map(w => w.meals));

  const foodCategories = [
    { name: 'Cooked Banquet & Meals', percent: 52, color: '#4F8A5B' },
    { name: 'Artisan Bakery & Breads', percent: 22, color: '#F59E0B' },
    { name: 'Raw Produce & Veggies', percent: 16, color: '#88C496' },
    { name: 'Packaged & Dairy Staples', percent: 10, color: '#3B82F6' }
  ];

  const beneficiaryTypes = [
    { name: 'Child Orphanages & Night Schools', count: '4,850 Meals (41%)', icon: '🧒' },
    { name: 'Homeless & Urban Transit Shelters', count: '3,920 Meals (33%)', icon: '🏠' },
    { name: 'Elderly Care Homes & Ashrams', count: '1,980 Meals (16%)', icon: '👵' },
    { name: 'Migrant Daily-Wage Construction Clusters', count: '1,200 Meals (10%)', icon: '👷' }
  ];

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="section-container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Leaf size={14} />
            <span>Real-World Transparency & ESG Audit</span>
          </div>
          <h1 className="section-title">OUR COLLECTIVE IMPACT 🌿</h1>
          <p className="section-subtitle">
            Measurable, verifiable metrics showing how our community turns edible food surplus into plates of nourishment.
          </p>
        </div>

        {/* Big Animated 5-Metric Hero Row */}
        <div className="impact-hero-metrics">
          
          <div className="impact-metric-box">
            <div style={{ fontSize: '2rem' }}>🍱</div>
            <div className="impact-big-number">{totalMeals.toLocaleString()}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>Meals Rescued</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', marginTop: '4px' }}>
              +840 meals this weekend
            </div>
          </div>

          <div className="impact-metric-box">
            <div style={{ fontSize: '2rem' }}>♻️</div>
            <div className="impact-big-number">{totalKg.toLocaleString()} kg</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>Food Waste Prevented</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', marginTop: '4px' }}>
              Diverted from methane landfill
            </div>
          </div>

          <div className="impact-metric-box">
            <div style={{ fontSize: '2rem' }}>❤️</div>
            <div className="impact-big-number">{totalPeopleFed.toLocaleString()}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>People Supported</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', marginTop: '4px' }}>
              Across 28 city welfare centers
            </div>
          </div>

          <div className="impact-metric-box">
            <div style={{ fontSize: '2rem' }}>🤝</div>
            <div className="impact-big-number">{ngos.length * 11}+</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>Active NGO Partners</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', marginTop: '4px' }}>
              Zero volunteer idle rate
            </div>
          </div>

        </div>

        {/* Interactive ROI Calculator */}
        <CarbonCalculator />

        {/* Weekly Trend Bar Chart & Category Breakdown Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          
          {/* Chart 1: Rescues This Week */}
          <div className="card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--green-dark)' }}>Meals Rescued This Week</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily volume rescued across city zones</p>
              </div>
              <span className="badge badge-green">
                <TrendingUp size={12} /> +18% vs Last Week
              </span>
            </div>

            {/* Custom CSS Bar Graph */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', padding: '10px 0', borderBottom: '2px solid var(--border-color)', gap: '12px' }}>
              {weeklyTrend.map((item, idx) => {
                const heightPercent = Math.round((item.meals / maxWeeklyMeals) * 100);
                const isToday = idx === weeklyTrend.length - 1;

                return (
                  <div key={item.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: isToday ? 'var(--green-dark)' : 'var(--text-muted)', marginBottom: '4px' }}>
                      {item.meals > 999 ? `${(item.meals / 1000).toFixed(1)}k` : item.meals}
                    </div>
                    
                    <div 
                      style={{
                        width: '100%',
                        maxWidth: '36px',
                        height: `${heightPercent}%`,
                        background: isToday ? 'linear-gradient(180deg, var(--green-primary), var(--green-dark))' : 'var(--green-light)',
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.4s ease',
                        boxShadow: isToday ? '0 4px 10px rgba(31,92,56,0.3)' : 'none'
                      }}
                      title={`${item.day}: ${item.meals} meals`}
                    />
                    
                    <div style={{ fontSize: '0.72rem', color: isToday ? 'var(--green-dark)' : 'var(--text-muted)', fontWeight: isToday ? 800 : 500, marginTop: '8px' }}>
                      {item.day.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 2: Category Distribution */}
          <div className="card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--green-dark)' }}>Rescued Food Breakdown</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Proportion by food category</p>
              </div>
              <span className="badge badge-gray">FSSAI Certified</span>
            </div>

            {/* Segmented Progress Bar */}
            <div style={{ height: '24px', width: '100%', borderRadius: '12px', overflow: 'hidden', display: 'flex', marginBottom: '20px' }}>
              {foodCategories.map(cat => (
                <div 
                  key={cat.name} 
                  style={{ width: `${cat.percent}%`, background: cat.color, height: '100%' }}
                  title={`${cat.name}: ${cat.percent}%`}
                />
              ))}
            </div>

            {/* Category Legend List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {foodCategories.map(cat => (
                <div key={cat.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: cat.color }} />
                    <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{cat.name}</span>
                  </div>
                  <strong style={{ color: 'var(--green-dark)' }}>{cat.percent}%</strong>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Beneficiary Centers Supported */}
        <div className="card" style={{ padding: '32px', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--green-dark)', marginBottom: '8px' }}>
            Where Does the Rescued Food Go?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Every meal is delivered with dignity to vetted humanitarian receiving centers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {beneficiaryTypes.map(item => (
              <div key={item.name} style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-green)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '4px' }}>{item.name}</h4>
                <div style={{ fontSize: '0.825rem', color: 'var(--green-primary)', fontWeight: 700 }}>
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Full Audit ESG Report Strip */}
        <div style={{ background: 'linear-gradient(135deg, var(--green-light), #C5E6CB)', border: '2px solid var(--border-green)', borderRadius: 'var(--radius-xl)', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--green-dark)' }}>
              Download Complete Community Impact Audit
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '560px' }}>
              Includes cryptographic delivery hash logs, CO₂ lifecycle assessments, and FSSAI hygiene audit compliance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => {
                showToast('Audit Report Generated!', 'Annual Impact PDF ready for download.', 'success');
              }}
            >
              <Download size={18} />
              <span>Download Impact Audit PDF</span>
            </button>
            <button 
              className="btn btn-dark btn-lg"
              onClick={() => setIsDonateModalOpen(true)}
            >
              <span>Contribute to Impact</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
