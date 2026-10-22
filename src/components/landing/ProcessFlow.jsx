import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Utensils, 
  BellRing, 
  Truck, 
  HeartHandshake, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  PlusCircle
} from 'lucide-react';

export const ProcessFlow = () => {
  const { setIsDonateModalOpen, setActiveTab } = useAppState();

  const steps = [
    {
      stepNumber: 1,
      title: 'Surplus Wholesome Food Logged',
      icon: '🍲',
      tag: 'Step 1: Donor Pledge',
      desc: 'Commercial kitchens, banquet halls, or conscientious citizens log surplus batches with portion counts and shelf-life countdown.',
      badgeColor: 'var(--green-light)',
      actionText: 'Post Surplus'
    },
    {
      stepNumber: 2,
      title: 'Emergency NGO & Rider Broadcast',
      icon: '🚨',
      tag: 'Step 2: Rapid Mobilization',
      desc: 'Urgent geolocation alerts fire to 45+ registered shelter NGOs and nearby bike couriers prioritized by expiration window.',
      badgeColor: '#FEF3C7',
      actionText: 'See Alerts'
    },
    {
      stepNumber: 3,
      title: 'Temperature-Safe Transit',
      icon: '🚴',
      tag: 'Step 3: Verified Pickup',
      desc: 'Trained volunteers arrive with insulated food-grade containers, verify safety protocols, and expedite delivery.',
      badgeColor: '#E0F2FE',
      actionText: 'Track Pickup'
    },
    {
      stepNumber: 4,
      title: 'Dignified Meals Served',
      icon: '❤️',
      tag: 'Step 4: Direct Sustenance',
      desc: 'Nutritious plates are served to orphanages, shelter homes, and daily-wage families with transparent impact reporting.',
      badgeColor: '#DCFCE7',
      actionText: 'View Impact'
    }
  ];

  return (
    <section className="process-flow-section" id="process-flow">
      <div className="section-container">
        
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>How AnnamAmrut Works</span>
          </div>
          <h2 className="section-title">A Seamless 4-Step Rescue Pipeline</h2>
          <p className="section-subtitle">
            From excess edible nourishment to plates of hope in under 60 minutes.
          </p>
        </div>

        {/* Desktop Horizontal / Mobile Vertical Grid */}
        <div className="flow-grid-desktop">
          {steps.map((step, index) => (
            <div key={step.stepNumber} className="flow-step-card">
              <div className="step-num-badge">
                {step.stepNumber}
              </div>

              <div className="step-icon-wrap" style={{ background: step.badgeColor }}>
                <span>{step.icon}</span>
              </div>

              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--green-primary)', marginBottom: '4px', textTransform: 'uppercase' }}>
                {step.tag}
              </div>

              <h3 className="step-title">{step.title}</h3>
              
              <p className="step-desc">{step.desc}</p>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {index === 0 ? 'Takes ~30 seconds' :
                   index === 1 ? 'Instant broadcast' :
                   index === 2 ? 'Thermal packaging' : '100% Zero-waste'}
                </span>
                <CheckCircle size={15} color="var(--green-primary)" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA trigger */}
        <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setIsDonateModalOpen(true)}
          >
            <PlusCircle size={18} />
            <span>Try It Now: Donate Surplus Food</span>
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={() => setActiveTab('ngo')}
          >
            <span>View Live Rescues In Action</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
