import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Calculator, Sparkles, TrendingUp, Leaf, Award, ArrowRight } from 'lucide-react';

export const CarbonCalculator = () => {
  const { setIsDonateModalOpen } = useAppState();
  const [weeklyKg, setWeeklyKg] = useState(30);

  // Formulas based on UNEP / Food Waste metrics:
  // 1 kg food waste ≈ 2.8 meals
  // 1 kg food waste in landfill produces ≈ 2.5 kg CO2 equivalent greenhouse gases
  // 1 tree absorbs ~22 kg CO2 per year
  const annualKg = weeklyKg * 52;
  const annualMeals = Math.round(annualKg * 2.8);
  const annualCO2Saved = Math.round(annualKg * 2.5);
  const treesEquivalent = Math.round(annualCO2Saved / 22);

  return (
    <div className="card" style={{ padding: '32px', border: '2px solid var(--border-green)', background: '#FFFFFF', marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calculator size={20} color="var(--green-dark)" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--green-dark)' }}>
            Surplus Environmental & Social ROI Calculator
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Estimate your business or kitchen's annual zero-waste sustainability footprint
          </p>
        </div>
      </div>

      {/* Slider Control */}
      <div style={{ margin: '24px 0', padding: '20px', background: 'var(--bg-main)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            Estimated Weekly Surplus Food:
          </label>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-dark)', fontFamily: 'var(--font-heading)' }}>
            {weeklyKg} kg / week
          </span>
        </div>

        <input 
          type="range"
          min="5"
          max="250"
          step="5"
          value={weeklyKg}
          onChange={(e) => setWeeklyKg(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--green-primary)' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          <span>Small Cafe (5 kg)</span>
          <span>Medium Restaurant (50 kg)</span>
          <span>Banquet / Hotel (150+ kg)</span>
        </div>
      </div>

      {/* Calculated Impact Outputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-green)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🍱</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--green-dark)' }}>
            {annualMeals.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Annual Meals Rescued</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-green)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>💨</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--green-primary)' }}>
            {(annualCO2Saved / 1000).toFixed(2)} Tons
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>CO₂e Emissions Prevented</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-green)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🌳</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--green-dark)' }}>
            {treesEquivalent} Trees
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Equivalent Tree Carbon Sequestration</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-green)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🏆</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#F59E0B' }}>
            Gold ESG
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Eligible Sustainability Tier</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '18px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          🌱 Turn daily edible surplus into tax-deductible CSR and corporate goodwill.
        </span>
        <button 
          className="btn btn-primary"
          onClick={() => setIsDonateModalOpen(true)}
        >
          <span>Start Donating Surplus</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
