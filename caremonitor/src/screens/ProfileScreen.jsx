import React from 'react'
import { useApp, COLORS, PATIENTS } from '../context/AppContext.jsx'
import { NavBar, Card, Avatar } from '../components/UI.jsx'

export default function ProfileScreen() {
  const { user, navigate, logout } = useApp()

  const menuItems = [
    { icon: '👥', label: 'Elderly Under Care', badge: PATIENTS.length, action: () => navigate('dashboard') },
    { icon: '🔔', label: 'Alerts', action: () => navigate('alerts') },
    { icon: '📋', label: 'Care Plan', action: () => navigate('careplan') },
    { icon: '⏰', label: 'Reminders', action: () => navigate('careplan') },
    { icon: '⚙', label: 'Account Settings', action: () => {} },
    { icon: '🔧', label: 'App Settings', action: () => {} },
    { icon: '❓', label: 'Help & Support', action: () => {} },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg }}>
      {/* Header */}
      <div style={{ background: COLORS.primary, padding: '48px 20px 28px', color: '#fff', flexShrink: 0 }}>
        <h2 style={{ fontWeight: 700, fontSize: 20, margin: '0 0 20px', textAlign: 'center' }}>Profile</h2>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 16, padding: '14px 16px',
        }}>
          <Avatar initials={user.initials} size={52} bg="rgba(255,255,255,0.25)" />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 17 }}>{user.name}</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, opacity: 0.8 }}>{user.role}</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 20, padding: '4px 12px',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600 }}>Active</span>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
          {[
            { label: 'Patients', value: PATIENTS.length },
            { label: 'High Risk', value: PATIENTS.filter(p => p.riskLevel === 'high').length },
            { label: 'Alerts Today', value: 3 },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 22 }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: 10, opacity: 0.8 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 16px 80px' }}>
        <Card style={{ overflow: 'hidden' }}>
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                padding: '15px 16px', background: 'none', border: 'none',
                borderBottom: i < menuItems.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                cursor: 'pointer', gap: 12,
              }}
            >
              <span style={{ fontSize: 20, width: 30, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 14, color: COLORS.text, textAlign: 'left', fontWeight: 500 }}>{item.label}</span>
              {item.badge && (
                <span style={{ background: COLORS.primary, color: '#fff', borderRadius: 20, padding: '2px 9px', fontSize: 11, fontWeight: 700 }}>
                  {item.badge}
                </span>
              )}
              <span style={{ color: COLORS.subtext, fontSize: 18 }}>›</span>
            </button>
          ))}
        </Card>

        <button
          onClick={logout}
          style={{
            width: '100%', marginTop: 14,
            padding: '15px', borderRadius: 12,
            background: '#FCEAEA', color: COLORS.red,
            border: 'none', fontWeight: 600, fontSize: 15,
          }}
        >
          Sign Out
        </button>
      </div>

      <NavBar />
    </div>
  )
}
