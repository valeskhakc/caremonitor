import React, { useState } from 'react'
import { useApp, COLORS, PATIENTS } from '../context/AppContext.jsx'
import { NavBar, ScreenHeader, SparkLine, Card, RiskBadge, Avatar } from '../components/UI.jsx'

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function TrendsScreen() {
  const { selectedPatient, navigate, prevScreen } = useApp()
  const patient = selectedPatient || PATIENTS[0]
  const [activeTab, setActiveTab] = useState('mobility')
  const [selectedPatientId, setSelectedPatientId] = useState(patient.id)

  const current = PATIENTS.find(p => p.id === selectedPatientId) || patient

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg }}>
      <ScreenHeader
        title="Mobility Trends"
        subtitle={current.name}
        onBack={() => navigate(prevScreen || 'dashboard')}
      />

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 16px 80px' }}>
        {/* Patient selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {PATIENTS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPatientId(p.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 20, border: 'none',
                background: selectedPatientId === p.id ? p.riskColor : '#fff',
                color: selectedPatientId === p.id ? '#fff' : COLORS.subtext,
                fontSize: 11, fontWeight: 600, cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
              }}
            >
              {p.initials}
            </button>
          ))}
        </div>

        {/* Patient info card */}
        <Card style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Avatar initials={current.initials} size={48} bg={current.riskColor} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}>{current.name}</span>
                <span style={{ fontSize: 12, color: COLORS.subtext }}>Age {current.age}</span>
              </div>
              <RiskBadge level={current.riskLevel} label={current.risk} />
            </div>
            <a href={`tel:${current.phone}`} style={{ textDecoration: 'none' }}>
              <button style={{
                width: 38, height: 38, borderRadius: '50%',
                background: '#E8F8F0', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, cursor: 'pointer',
              }}>📞</button>
            </a>
          </div>
          <div style={{ fontSize: 12, color: COLORS.subtext, marginBottom: 4 }}>
            📍 {current.address}
          </div>
          <div style={{ fontSize: 12, color: COLORS.subtext, marginBottom: 4 }}>
            👨‍👩‍👧 {current.nok}
          </div>
          <div style={{ fontSize: 12, color: COLORS.subtext }}>
            ⌚ {current.device}
          </div>
          {current.notes && (
            <div style={{ marginTop: 10, background: '#FEF3E2', borderRadius: 8, padding: '8px 10px', fontSize: 12, color: COLORS.yellow }}>
              📝 {current.notes}
            </div>
          )}
        </Card>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[
            { label: 'Steps Today', value: current.steps.toLocaleString(), icon: '👟', color: COLORS.primary, bg: '#F0E8FF' },
            { label: 'Active Hours', value: current.activeHrs, icon: '⏱', color: COLORS.green, bg: '#E8F8F0' },
            { label: 'Falls (7d)', value: current.falls, icon: '⚠', color: current.falls > 2 ? COLORS.red : COLORS.yellow, bg: current.falls > 2 ? '#FCEAEA' : '#FEF3E2' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '14px 10px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <p style={{ margin: '6px 0 2px', fontWeight: 800, fontSize: 20, color: s.color }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: 9, color: COLORS.subtext }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#fff', borderRadius: 12, padding: 4, marginBottom: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          {[['mobility', '🦵 Mobility'], ['trend', '📊 Trend']].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              flex: 1, padding: '8px', borderRadius: 10, border: 'none',
              background: activeTab === id ? COLORS.primary : 'transparent',
              color: activeTab === id ? '#fff' : COLORS.subtext,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <Card style={{ padding: 16, marginBottom: 14 }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: '0 0 4px' }}>
            {activeTab === 'mobility' ? 'Weekly Mobility Score' : 'Weekly Trend Graph'}
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            {[['Low Risk', COLORS.green], ['Moderate', COLORS.yellow], ['High Risk', COLORS.red]].map(([l, c]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />
                <span style={{ fontSize: 9, color: COLORS.subtext }}>{l}</span>
              </div>
            ))}
          </div>
          <SparkLine
            key={`${current.id}-${activeTab}`}
            data={activeTab === 'mobility' ? current.mobilityData : current.trendData}
            color={current.riskColor}
            height={75}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {WEEK_DAYS.map((d, i) => <span key={i} style={{ fontSize: 10, color: COLORS.subtext, width: '14%', textAlign: 'center' }}>{d}</span>)}
          </div>
        </Card>

        {/* Trend indicator */}
        <Card style={{ padding: 14 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: COLORS.text, margin: '0 0 10px' }}>Weekly Summary</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: COLORS.bg, borderRadius: 10, padding: '10px 12px' }}>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.subtext }}>Steps</p>
              <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: 16, color: COLORS.text }}>{current.steps.toLocaleString()}</p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: current.trend === 'down' ? COLORS.red : COLORS.green }}>
                {current.trend === 'down' ? '↓ -20% vs last week' : current.trend === 'up' ? '↑ +12% vs last week' : '→ Stable'}
              </p>
            </div>
            <div style={{ flex: 1, background: COLORS.bg, borderRadius: 10, padding: '10px 12px' }}>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.subtext }}>Active Hrs</p>
              <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: 16, color: COLORS.text }}>{current.activeHrs}h</p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: current.activeHrs < 2 ? COLORS.red : COLORS.green }}>
                {current.activeHrs < 2 ? '↓ Below target' : '✓ On track'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <NavBar />
    </div>
  )
}
