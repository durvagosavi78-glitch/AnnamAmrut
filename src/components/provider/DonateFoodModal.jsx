import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  X, 
  Sparkles, 
  UtensilsCrossed, 
  Clock, 
  MapPin, 
  Check, 
  AlertTriangle, 
  Package, 
  ShieldCheck,
  Plus
} from 'lucide-react';

export const DonateFoodModal = () => {
  const { 
    isDonateModalOpen, 
    setIsDonateModalOpen, 
    currentUser, 
    addDonation,
    setActiveTab 
  } = useAppState();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cooked Meals');
  const [servings, setServings] = useState(50);
  const [quantityKg, setQuantityKg] = useState(18);
  const [preparedAt, setPreparedAt] = useState('Freshly made today');
  const [hoursUntilExpiry, setHoursUntilExpiry] = useState(1);
  const [selectedDietary, setSelectedDietary] = useState(['Vegetarian']);
  const [packaging, setPackaging] = useState('Packed Boxes');
  const [pickupInstructions, setPickupInstructions] = useState('Collect from kitchen dispatch counter, ask for manager.');
  const [providerAddress, setProviderAddress] = useState(currentUser.address || 'Bandra West, Linking Road, Mumbai');
  const [contactPhone, setContactPhone] = useState(currentUser.phone || '+91 98201 44552');

  if (!isDonateModalOpen) return null;

  // Auto calculate urgency level based on expiry hours
  const calculatedUrgency = hoursUntilExpiry <= 1 ? 'urgent' : hoursUntilExpiry <= 3 ? 'soon' : 'flexible';

  const toggleDietary = (item) => {
    setSelectedDietary(prev => 
      prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Slight coordinate jitter around city center for distinct pins
    const latOffset = (Math.random() - 0.5) * 0.06;
    const lngOffset = (Math.random() - 0.5) * 0.06;

    const expiryLabel = hoursUntilExpiry <= 1 ? `Today, in ${Math.round(hoursUntilExpiry * 60)} mins (Urgent)` :
                        `Today, in ${hoursUntilExpiry} hours`;

    const sampleImages = {
      'Cooked Meals': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
      'Bakery & Bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
      'Raw Produce & Veggies': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=80',
      'Packaged Food': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
      'Dairy & Sweets': 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500&auto=format&fit=crop&q=80',
      'Beverages': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80'
    };

    addDonation({
      title,
      category,
      servings: Number(servings),
      quantityKg: Number(quantityKg),
      preparedAt,
      expiresAt: expiryLabel,
      urgency: calculatedUrgency,
      dietary: selectedDietary.length > 0 ? selectedDietary : ['Vegetarian'],
      packaging,
      providerId: currentUser.id,
      providerName: currentUser.name,
      providerType: currentUser.role === 'restaurant' ? 'restaurant' : 'individual',
      providerAddress,
      coordinates: [19.0760 + latOffset, 72.8550 + lngOffset],
      contactPhone,
      pickupInstructions,
      imageUrl: sampleImages[category] || sampleImages['Cooked Meals']
    });

    setIsDonateModalOpen(false);
    setActiveTab('provider');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsDonateModalOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '680px', padding: '32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', background: 'var(--green-light)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
              🍱
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--green-dark)' }}>Post Surplus Food Batch</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Broadcasting to {currentUser.role === 'restaurant' ? 'B2B Food Rescuers & NGOs' : 'Nearby Volunteers'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsDonateModalOpen(false)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Urgency Alert Preview Banner */}
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          background: calculatedUrgency === 'urgent' ? 'var(--urgent-red-bg)' :
                      calculatedUrgency === 'soon' ? 'var(--warning-amber-bg)' : 'var(--success-green-bg)',
          border: `1px solid ${
            calculatedUrgency === 'urgent' ? 'var(--urgent-red-border)' :
            calculatedUrgency === 'soon' ? 'var(--warning-amber-border)' : 'var(--success-green-border)'
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {calculatedUrgency === 'urgent' ? (
              <AlertTriangle size={20} color="var(--urgent-red)" />
            ) : (
              <Clock size={20} color="var(--green-primary)" />
            )}
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Urgency Rating: </strong>
              <span style={{ 
                color: calculatedUrgency === 'urgent' ? 'var(--urgent-red)' :
                       calculatedUrgency === 'soon' ? 'var(--warning-amber-text)' : 'var(--green-dark)',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                {calculatedUrgency === 'urgent' ? '🔴 Urgent Dispatch (< 1 Hour)' :
                 calculatedUrgency === 'soon' ? '🟠 Medium Priority (< 3 Hours)' : '🟢 Standard Window (> 3 Hours)'}
              </span>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                {calculatedUrgency === 'urgent' ? 'Fires top priority push notification to emergency response NGOs' : 'Standard volunteer match'}
              </div>
            </div>
          </div>
          <span className="badge" style={{ background: '#FFFFFF', fontWeight: 700 }}>
            +{calculatedUrgency === 'urgent' ? '25' : '15'} ESG Pts
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Row 1: Food Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>
              Food Item / Dish Description *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Assorted Paneer Butter Masala & Steamed Jeera Rice"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-color)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Row 2: Category & Expiry Slider */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Food Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-color)',
                  fontSize: '0.9rem',
                  background: '#FFFFFF'
                }}
              >
                <option value="Cooked Meals">🍛 Cooked Meals & Curries</option>
                <option value="Bakery & Bread">🥖 Bakery, Breads & Pastries</option>
                <option value="Raw Produce & Veggies">🥗 Raw Produce & Fresh Veggies</option>
                <option value="Packaged Food">📦 Packaged & Canned Goods</option>
                <option value="Dairy & Sweets">🥛 Dairy Products & Desserts</option>
                <option value="Beverages">🧃 Juices & Beverages</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                <span>Safe to Consume For:</span>
                <span style={{ color: calculatedUrgency === 'urgent' ? 'var(--urgent-red)' : 'var(--green-dark)', fontWeight: 800 }}>
                  {hoursUntilExpiry} Hour{hoursUntilExpiry > 1 ? 's' : ''}
                </span>
              </label>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={hoursUntilExpiry}
                onChange={(e) => setHoursUntilExpiry(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: calculatedUrgency === 'urgent' ? '#DC2626' : '#4F8A5B', marginTop: '8px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>30m (Urgent)</span>
                <span>3 hrs</span>
                <span>8+ hrs</span>
              </div>
            </div>
          </div>

          {/* Row 3: Servings & Kg */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Approx. Servings (People Fed) *
              </label>
              <input
                type="number"
                min="5"
                max="5000"
                required
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-color)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Total Weight (in Kg)
              </label>
              <input
                type="number"
                min="1"
                max="2000"
                value={quantityKg}
                onChange={(e) => setQuantityKg(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-color)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          {/* Row 4: Dietary Type Multi-Select */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
              Dietary Classification
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Vegetarian', 'Vegan', 'Jain Friendly', 'Non-Vegetarian', 'Halal'].map(diet => {
                const isSelected = selectedDietary.includes(diet);
                return (
                  <button
                    type="button"
                    key={diet}
                    onClick={() => toggleDietary(diet)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      border: isSelected ? '1.5px solid var(--green-primary)' : '1px solid var(--border-color)',
                      background: isSelected ? 'var(--green-light)' : '#FFFFFF',
                      color: isSelected ? 'var(--green-dark)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {isSelected && <Check size={13} color="var(--green-primary)" />}
                    <span>{diet}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 5: Packaging & Instructions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Packaging Condition
              </label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-color)',
                  fontSize: '0.88rem',
                  background: '#FFFFFF'
                }}
              >
                <option value="Packed Boxes">📦 Packed in Clean Meal Boxes</option>
                <option value="Buffet Trays">🍲 Buffet Warmers / Trays</option>
                <option value="Containers Provided">🥡 Containers Provided</option>
                <option value="Needs Vessel">⚠️ Volunteer Must Bring Vessels</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Pickup Address / Location
              </label>
              <input
                type="text"
                required
                value={providerAddress}
                onChange={(e) => setProviderAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-color)',
                  fontSize: '0.88rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Pickup Notes & Special Instructions for Courier
            </label>
            <input
              type="text"
              placeholder="e.g. Come to back delivery door B, ask for Head Chef Rajesh"
              value={pickupInstructions}
              onChange={(e) => setPickupInstructions(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-color)',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Submit CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsDonateModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ padding: '14px 28px' }}
              id="submit-donation-broadcast-btn"
            >
              <Sparkles size={18} />
              <span>Broadcast Surplus Donation</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
