import React, { useEffect, useRef, useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import L from 'leaflet';
import { 
  Filter, 
  MapPin, 
  Clock, 
  Layers, 
  Phone, 
  Zap, 
  HeartHandshake, 
  Building2, 
  Bike, 
  X, 
  Navigation,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const LiveRescueMap = ({ isEmbedded = false }) => {
  const { 
    donations, 
    ngos, 
    volunteers, 
    setActiveTab, 
    setSelectedRescueForMission,
    claimDonation,
    currentUser 
  } = useAppState();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center Mumbai urban hub
      const map = L.map(mapContainerRef.current, {
        center: [19.0760, 72.8550],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // CartoDB Positron / Clean light green OSM layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19
      }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      // Clean up on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when filter or data changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    // 1. Food Donations Markers
    if (activeFilter === 'all' || activeFilter === 'urgent' || activeFilter === 'available') {
      donations.forEach((donation) => {
        if (activeFilter === 'urgent' && donation.urgency !== 'urgent') return;
        if (activeFilter === 'available' && donation.status !== 'available') return;

        const isUrgent = donation.urgency === 'urgent' && donation.status === 'available';
        const isClaimed = donation.status === 'claimed' || donation.status === 'pickup_started';
        const isDelivered = donation.status === 'delivered';

        const markerColor = isUrgent ? '#DC2626' :
                            isClaimed ? '#F59E0B' :
                            isDelivered ? '#6B7280' : '#4F8A5B';

        const iconHtml = `
          <div style="
            position: relative;
            width: 38px;
            height: 38px;
            background: #FFFFFF;
            border: 3px solid ${markerColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            cursor: pointer;
            ${isUrgent ? 'animation: pulse-urgent 1.5s infinite;' : ''}
          ">
            ${isUrgent ? '🚨' : isClaimed ? '🚚' : isDelivered ? '✅' : '🍱'}
            <div style="
              position: absolute;
              bottom: -6px;
              right: -6px;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: ${markerColor};
              border: 2px solid #FFFFFF;
            "></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-food-marker',
          iconSize: [38, 38],
          iconAnchor: [19, 19]
        });

        const marker = L.marker(donation.coordinates, { icon: customIcon });
        marker.on('click', () => {
          setSelectedEntity({ type: 'donation', data: donation });
        });
        marker.addTo(layer);
      });
    }

    // 2. NGO Hub Markers
    if (activeFilter === 'all' || activeFilter === 'ngos') {
      ngos.forEach((ngo) => {
        const iconHtml = `
          <div style="
            width: 36px;
            height: 36px;
            background: #1F5C38;
            border: 2px solid #DDEFE0;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            box-shadow: 0 3px 10px rgba(31,92,56,0.3);
            color: #FFFFFF;
            cursor: pointer;
          ">
            🤝
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-ngo-marker',
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        const marker = L.marker(ngo.coordinates, { icon: customIcon });
        marker.on('click', () => {
          setSelectedEntity({ type: 'ngo', data: ngo });
        });
        marker.addTo(layer);
      });
    }

    // 3. Volunteer Markers
    if (activeFilter === 'all' || activeFilter === 'volunteers') {
      volunteers.forEach((vol) => {
        const iconHtml = `
          <div style="
            width: 32px;
            height: 32px;
            background: #6366F1;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.95rem;
            box-shadow: 0 2px 8px rgba(99,102,241,0.4);
            color: #FFFFFF;
            cursor: pointer;
          ">
            🚴
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-vol-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker(vol.coordinates, { icon: customIcon });
        marker.on('click', () => {
          setSelectedEntity({ type: 'volunteer', data: vol });
        });
        marker.addTo(layer);
      });
    }
  }, [donations, ngos, volunteers, activeFilter]);

  const handleClaimFromMap = (donation) => {
    claimDonation(donation.id, 'ngo-1', 'Asha Food Rescue Foundation', 'Arun Kumar', 'Sneha Sadan Child Home');
    setSelectedEntity(null);
    setActiveTab('ngo');
  };

  return (
    <section className="map-section" id="rescue-map-section">
      <div className="section-container">
        
        {!isEmbedded && (
          <div className="section-header">
            <div className="section-tag">
              <Navigation size={14} />
              <span>Hyperlocal Dispatch Map</span>
            </div>
            <h2 className="section-title">Live Rescue & Availability Map</h2>
            <p className="section-subtitle">
              Real-time spatial tracker of surplus food donations, restaurant providers, active NGO hubs, and rescue couriers.
            </p>
          </div>
        )}

        {/* Map Card Wrapper */}
        <div className="map-card-wrapper">
          
          {/* Controls Bar */}
          <div className="map-controls-bar">
            {/* Filter Buttons */}
            <div className="map-filter-group">
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Filter size={14} /> Filter View:
              </span>

              <button 
                className={`map-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Entities
              </button>

              <button 
                className={`map-filter-btn ${activeFilter === 'urgent' ? 'active' : ''}`}
                onClick={() => setActiveFilter('urgent')}
                style={{ color: activeFilter === 'urgent' ? '#991B1B' : undefined }}
              >
                🔴 Urgent Rescues (&lt; 1h)
              </button>

              <button 
                className={`map-filter-btn ${activeFilter === 'available' ? 'active' : ''}`}
                onClick={() => setActiveFilter('available')}
              >
                🟢 Available Food
              </button>

              <button 
                className={`map-filter-btn ${activeFilter === 'ngos' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ngos')}
              >
                🤝 NGO Hubs
              </button>

              <button 
                className={`map-filter-btn ${activeFilter === 'volunteers' ? 'active' : ''}`}
                onClick={() => setActiveFilter('volunteers')}
              >
                🚴 Active Volunteers
              </button>
            </div>

            {/* Map Legend */}
            <div className="map-legend">
              <span><span className="legend-dot" style={{ background: '#4F8A5B' }} /> 🟢 Available</span>
              <span><span className="legend-dot" style={{ background: '#DC2626' }} /> 🔴 Urgent</span>
              <span><span className="legend-dot" style={{ background: '#F59E0B' }} /> 🟠 In Transit</span>
              <span><span className="legend-dot" style={{ background: '#1F5C38' }} /> 🤝 NGO Hub</span>
              <span><span className="legend-dot" style={{ background: '#6366F1' }} /> 🚴 Volunteer</span>
            </div>
          </div>

          {/* Map Viewport Area */}
          <div style={{ position: 'relative', width: '100%', height: '520px' }}>
            <div 
              ref={mapContainerRef} 
              className="map-viewport" 
              style={{ width: '100%', height: '100%' }} 
            />

            {/* Selected Pin Details Overlay Card / Drawer */}
            {selectedEntity && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 1000,
                width: '320px',
                maxWidth: 'calc(100% - 32px)',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                boxShadow: 'var(--shadow-modal)',
                border: '1.5px solid var(--border-green)',
                animation: 'modal-enter 0.2s ease'
              }}>
                <button
                  onClick={() => setSelectedEntity(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)'
                  }}
                >
                  <X size={15} />
                </button>

                {selectedEntity.type === 'donation' && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <span className={`badge ${selectedEntity.data.urgency === 'urgent' ? 'badge-urgent' : 'badge-flexible'}`}>
                        {selectedEntity.data.urgency === 'urgent' ? '🔴 Urgent Rescue' : '🟢 Fresh Surplus'}
                      </span>
                      <span className="badge badge-gray">{selectedEntity.data.category}</span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-dark)', marginBottom: '4px' }}>
                      {selectedEntity.data.title}
                    </h4>

                    <div style={{ fontSize: '0.825rem', color: 'var(--green-dark)', fontWeight: 600, marginBottom: '8px' }}>
                      🏢 {selectedEntity.data.providerName}
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      📍 {selectedEntity.data.providerAddress}
                    </p>

                    <div style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '14px', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>Quantity:</span>
                        <strong>{selectedEntity.data.servings} Servings ({selectedEntity.data.quantityKg} kg)</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>Expiry Window:</span>
                        <strong style={{ color: selectedEntity.data.urgency === 'urgent' ? 'var(--urgent-red)' : 'inherit' }}>
                          {selectedEntity.data.expiresAt}
                        </strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Status:</span>
                        <strong style={{ textTransform: 'capitalize', color: 'var(--green-primary)' }}>
                          {selectedEntity.data.status.replace('_', ' ')}
                        </strong>
                      </div>
                    </div>

                    {selectedEntity.data.status === 'available' ? (
                      <button 
                        className="btn btn-urgent btn-sm"
                        style={{ width: '100%' }}
                        onClick={() => handleClaimFromMap(selectedEntity.data)}
                      >
                        <Zap size={14} /> Accept & Dispatch Rescue
                      </button>
                    ) : (
                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%' }}
                        onClick={() => {
                          setSelectedRescueForMission(selectedEntity.data);
                          setActiveTab('ngo');
                        }}
                      >
                        View Live Mission Tracking →
                      </button>
                    )}
                  </div>
                )}

                {selectedEntity.type === 'ngo' && (
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: '8px' }}>
                      🤝 Verified NGO Partner
                    </span>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--green-dark)', marginBottom: '4px' }}>
                      {selectedEntity.data.name}
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      {selectedEntity.data.category}
                    </p>
                    <div style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '14px', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>Active Volunteers:</span>
                        <strong>{selectedEntity.data.activeVolunteers} couriers</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>Collections Today:</span>
                        <strong style={{ color: 'var(--green-primary)' }}>{selectedEntity.data.collectionsToday} rescues</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Total Meals Delivered:</span>
                        <strong>{selectedEntity.data.totalRescues.toLocaleString()}</strong>
                      </div>
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                      onClick={() => setActiveTab('ngo')}
                    >
                      Open NGO Rescue Hub →
                    </button>
                  </div>
                )}

                {selectedEntity.type === 'volunteer' && (
                  <div>
                    <span className="badge" style={{ background: '#EDE9FE', color: '#6D28D9', marginBottom: '8px' }}>
                      🚴 Volunteer Hero
                    </span>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '4px' }}>
                      {selectedEntity.data.name}
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      Vehicle: {selectedEntity.data.vehicle} • Status: {selectedEntity.data.status.replace('_', ' ')}
                    </p>
                    <div style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '14px', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>Rescues Today:</span>
                        <strong>{selectedEntity.data.deliveriesToday} completed</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Hero Impact Points:</span>
                        <strong style={{ color: '#6D28D9' }}>{selectedEntity.data.points} pts</strong>
                      </div>
                    </div>
                    <button 
                      className="btn btn-outline btn-sm"
                      style={{ width: '100%' }}
                      onClick={() => setActiveTab('leaderboard')}
                    >
                      View in Hall of Fame →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick interactive strip below map */}
          <div style={{ padding: '14px 24px', background: '#F9FCF9', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
              <Sparkles size={16} color="var(--green-primary)" />
              <span>Showing <strong>{donations.length} Active Donations</strong> across <strong>{ngos.length} NGO Rescue Sectors</strong></span>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setActiveTab('provider')}
            >
              + Add New Donation Pin to Map
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
