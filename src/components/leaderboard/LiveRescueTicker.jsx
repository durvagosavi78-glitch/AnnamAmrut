import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Sparkles, Zap, Heart, CheckCircle2, Clock } from 'lucide-react';

export const LiveRescueTicker = () => {
  const { liveActivities } = useAppState();

  return (
    <div className="card" style={{ padding: '24px', marginBottom: '36px', border: '1.5px solid var(--border-green)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--green-primary)', animation: 'pulse-glow 2s infinite' }} />
          <h3 style={{ fontSize: '1.15rem', color: 'var(--green-dark)', fontWeight: 800 }}>
            ⚡ Real-Time Community Rescue Stream
          </h3>
        </div>
        <span className="badge badge-green">Live Syncing</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {liveActivities.slice(0, 5).map(act => {
          const isDelivery = act.status === 'delivered';
          const isUrgent = act.actionText.includes('URGENT');

          return (
            <div 
              key={act.id} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: isDelivery ? 'var(--success-green-bg)' : 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                border: isDelivery ? '1px solid var(--success-green-border)' : '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.1rem' }}>
                  {isDelivery ? '❤️' : act.actorType === 'restaurant' ? '🏢' : act.actorType === 'ngo' ? '🤝' : '🚴'}
                </span>
                <div>
                  <strong>{act.actorName}</strong>{' '}
                  <span style={{ color: 'var(--text-muted)' }}>{act.actionText}</span>{' '}
                  <strong style={{ color: 'var(--green-dark)' }}>{act.foodTitle}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                <Clock size={13} />
                <span>{act.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
