import React, { useState } from 'react'
import { useApp, COLORS, PATIENTS } from '../context/AppContext.jsx'
import { NavBar, RiskBadge, Avatar, Card, ScreenHeader } from '../components/UI.jsx'

export default function DashboardScreen() {
  const { user, navigate, sosActive, unreadCount } = useApp()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const highRisk = PATIENTS.filter(p => p.riskLevel === 'high').length
  const modRisk = PATIENTS.filter(p => p.riskLevel === 'moderate').length

  const filtered = PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.riskLevel === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg }}>
      <ScreenHeader title="Dashboard" subtitle={`Hello, ${user.name}`} />

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 16px 80px' }}>
        {/* Risk Summary */}
        <Card style={{ padding: 16, marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: COLORS.subtext, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Risk Overview</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: COLORS.red, animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontWeight: 700, fontSize: 18, color: COLORS.red }}>RED – High Risk</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, background: '#FCEAEA', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 22, color: COLORS.red }}>{highRisk}</p>
              <p style={{ margin: 0, fontSize: 10, color: COLORS.red }}>High Risk</p>
            </div>
            <div style={{ flex: 1, background: '#FEF3E2', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 22, color: COLORS.yellow }}>{modRisk}</p>
              <p style={{ margin: 0, fontSize: 10, color: COLORS.yellow }}>Moderate</p>
            </div>
            <div style={{ flex: 1, background: '#E8F8F0', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 22, color: COLORS.green }}>{PATIENTS.length - highRisk - modRisk}</p>
              <p style={{ margin: 0, fontSize: 10, color: COLORS.green }}>Low Risk</p>
            </div>
          </div>
        </Card>

        {/* SOS Banner */}
        {sosActive && (
          <div
            className="animate-slideUp"
            onClick={() => navigate('alerts')}
            style={{
              background: COLORS.red, borderRadius: 12,
              padding: '12px 16px', marginBottom: 14,
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', animation: 'sosFlash 1.5s infinite',
            }}
          >
            <span style={{ fontSize: 20 }}>🚨</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: 14 }}>SOS Alert — Auntie Lee</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Fall detected · Tap to respond</p>
            </div>
            <span style={{ color: '#fff', fontSize: 18 }}>›</span>
          </div>
        )}

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search patients..."
            style={{
              width: '100%', padding: '12px 12px 12px 38px',
              borderRadius: 12, border: `1.5px solid ${COLORS.border}`,
              background: '#fff', fontSize: 13, outline: 'none', color: COLORS.text,
            }}
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {['all', 'high', 'moderate', 'low'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '6px 12px', borderRadius: 20,
              background: filter === f ? COLORS.primary : '#fff',
              color: filter === f ? '#fff' : COLORS.subtext,
              border: `1.5px solid ${filter === f ? COLORS.primary : COLORS.border}`,
              fontSize: 11, fontWeight: 600, cursor: 'pointer',
              textTransform: 'capitalize',
            }}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Patient list header */}
        <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: '0 0 10px' }}>
          Elderly Under Care ({filtered.length})
        </p>

        {filtered.map(p => (
          <button
            key={p.id}
            className="animate-slideUp"
            onClick={() => navigate('trends', p)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center',
              background: '#fff', borderRadius: 14, padding: '14px 16px',
              marginBottom: 8, border: 'none', cursor: 'pointer',
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              textAlign: 'left',
            }}
          >
            <Avatar initials={p.initials} size={42} bg={p.riskColor} />
            <div style={{ flex: 1, marginLeft: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{p.name}</span>
                <span style={{ fontSize: 11, color: COLORS.subtext }}>Age {p.age}</span>
              </div>
              <RiskBadge level={p.riskLevel} label={p.risk} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: 10, color: COLORS.subtext }}>{p.lastSeen}</p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: COLORS.subtext }}>{p.steps.toLocaleString()} steps</p>
            </div>
            <span style={{ color: COLORS.subtext, fontSize: 18, marginLeft: 8 }}>›</span>
          </button>
        ))}
      </div>

      <NavBar />
    </div>
  )
}
