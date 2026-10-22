import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Award, 
  TrendingUp, 
  Leaf, 
  Download, 
  ShieldCheck, 
  Trophy, 
  Sparkles, 
  CheckCircle2,
  Share2,
  FileText,
  X
} from 'lucide-react';

export const RestaurantImpactCard = () => {
  const { currentUser, showToast } = useAppState();
  const [showCertificate, setShowCertificate] = useState(false);

  const impactPoints = currentUser.impactScore || 850;
  const mealsSaved = currentUser.mealsSaved || 2450;
  const foodKg = currentUser.foodRescuedKg || 520;
  const co2OffsetKg = Math.round(foodKg * 2.1); // ~2.1 kg CO2e per kg food saved

  const badges = [
    { id: 'b1', name: '🥉 Food Saver', desc: 'Rescued 500+ meals', level: 'Bronze', earned: true },
    { id: 'b2', name: '🥈 Community Contributor', desc: 'Active for 3+ months', level: 'Silver', earned: true },
    { id: 'b3', name: '🥇 Zero Waste Champion', desc: 'Over 2,000 meals rescued', level: 'Gold', earned: true },
    { id: 'b4', name: '🌟 Top Contributor', desc: 'Rank #3 in metropolitan area', level: 'Diamond', earned: true }
  ];

  return (
    <div className="restaurant-esg-card">
      {/* Top Banner with Title and ESG Tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'var(--green-light)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', marginBottom: '6px' }}>
            <Leaf size={12} /> B2B Industry ESG Rating
          </div>
          <h3 style={{ fontSize: '1.45rem', color: 'var(--green-dark)' }}>
            🌿 AnnamAmrut Social Impact Score
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowCertificate(true)}
            id="view-esg-certificate-btn"
          >
            <Award size={15} />
            <span>ESG Certificate</span>
          </button>

          <button 
            className="btn btn-outline btn-sm"
            onClick={() => {
              showToast('ESG Report Shared!', 'Corporate Sustainability credentials copied to clipboard.', 'success');
            }}
          >
            <Share2 size={15} />
            <span>Share Badge</span>
          </button>
        </div>
      </div>

      {/* ESG Gauge & Metrics Grid */}
      <div className="esg-score-meter">
        {/* Left Column: Big Score Dial */}
        <div className="score-circle-display">
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Current Impact Points
          </div>
          <div className="score-number">
            🌱 {impactPoints}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: '#FFFFFF', borderRadius: 'var(--radius-full)', fontSize: '0.825rem', fontWeight: 700, color: 'var(--green-dark)', marginTop: '8px' }}>
            <Trophy size={14} color="#F59E0B" /> Rank #3 Citywide Leader
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--green-dark)', marginTop: '8px' }}>
            Tier: <strong>Gold Zero-Waste Kitchen</strong>
          </div>
        </div>

        {/* Right Column: Key ESG Impact Highlights */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--bg-main)', padding: '16px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-green)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem' }}>🍱</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                {mealsSaved.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Meals Rescued</div>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '16px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-green)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem' }}>♻️</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                {foodKg} kg
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Food Saved from Landfill</div>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '16px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-green)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem' }}>💨</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--green-primary)' }}>
                {co2OffsetKg} kg
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CO₂e Avoided</div>
            </div>
          </div>

          {/* Gamification Points Rules Info */}
          <div style={{ padding: '12px 16px', background: '#F8FAF8', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-green)', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span><strong>Scoring Engine:</strong> 1 meal = +1 pt • Urgent dispatch rescue = +10 pts bonus • Successful delivery = +20 pts</span>
            <span style={{ fontWeight: 700, color: 'var(--green-dark)' }}>Next Tier: 1,000 pts</span>
          </div>
        </div>
      </div>

      {/* Gamification Badges Section */}
      <div style={{ marginTop: '24px' }}>
        <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--green-primary)" />
          <span>Industry Accreditations & Badges</span>
        </h4>

        <div className="badges-grid">
          {badges.map(b => (
            <div key={b.id} className="badge-item-card">
              <span className="badge-icon-lg">{b.name.split(' ')[0]}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)' }}>
                  {b.name.substring(3)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {b.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="modal-overlay" onClick={() => setShowCertificate(false)}>
          <div 
            className="modal-content" 
            style={{ maxWidth: '640px', padding: '36px', background: '#FAFCFA', border: '3px solid var(--green-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={24} color="var(--green-primary)" />
                <span style={{ fontWeight: 800, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Verified ESG Social Impact Certificate
                </span>
              </div>
              <button 
                onClick={() => setShowCertificate(false)}
                style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--border-green)', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌿</div>
              <h2 style={{ color: 'var(--green-dark)', fontSize: '1.8rem', marginBottom: '6px' }}>Certificate of Social Sustenance</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Awarded under the National Zero-Waste Food Security Initiative
              </p>

              <div style={{ margin: '18px 0', padding: '14px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>This certifies that</p>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', margin: '4px 0' }}>
                  {currentUser.organization || currentUser.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--green-primary)', fontWeight: 600 }}>
                  Has successfully rescued <strong>{mealsSaved.toLocaleString()} meals</strong> ({foodKg} kg) and prevented <strong>{co2OffsetKg} kg CO₂e</strong> greenhouse emissions.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                <div>
                  Certificate ID: <strong>ANNAM-ESG-2026-9821</strong>
                </div>
                <div>
                  Issued: <strong>August 2026</strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  showToast('Certificate Downloaded!', 'PDF certificate saved to your device.', 'success');
                  setShowCertificate(false);
                }}
              >
                <Download size={16} />
                <span>Download Official ESG PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
