import React from 'react'
import { useApp, COLORS, PATIENTS } from '../context/AppContext.jsx'
import { NavBar, ScreenHeader, Card, RiskBadge } from '../components/UI.jsx'

const typeConfig = {
  sos: { bg: '#FCEAEA', border: COLORS.red, dot: COLORS.red, icon: '🚨' },
  warning: { bg: '#FEF3E2', border: COLORS.yellow, dot: COLORS.yellow, icon: '⚠️' },
  info: { bg: '#EBF5FB', border: '#3498DB', dot: '#3498DB', icon: 'ℹ️' },
}

export default function AlertsScreen() {
  const { alerts, acknowledgeAlert, navigate, setSelectedPatient, showSOSModal } = useApp()

  const handleAlertTap = (alert) => {
    if (!alert.read) acknowledgeAlert(alert.id)
    const patient = PATIENTS.find(p => p.id === alert.patientId)
    if (patient) {
      setSelectedPatient(patient)
      navigate('trends', patient)
    }
  }

  const unread = alerts.filter(a => !a.read)
  const read = alerts.filter(a => a.read)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg }}>
      <ScreenHeader title="Alerts" subtitle={`${unread.length} unread`} />

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 16px 80px' }}>
        {unread.length > 0 && (
          <>
            <p style={{ fontWeight: 700, fontSize: 12, color: COLORS.red, textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 10px' }}>Unread</p>
            {unread.map(alert => {
              const cfg = typeConfig[alert.type]
              return (
                <button
                  key={alert.id}
                  className="animate-slideUp"
                  onClick={() => handleAlertTap(alert)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'flex-start',
                    background: cfg.bg, borderRadius: 14, padding: '14px 16px',
                    marginBottom: 10, border: `1.5px solid ${cfg.border}`,
                    cursor: 'pointer', textAlign: 'left',
                    boxShadow: alert.type === 'sos' ? `0 4px 16px rgba(192,57,43,0.2)` : 'none',
                  }}
                >
                  <span style={{ fontSize: 22, marginRight: 12, marginTop: 1 }}>{cfg.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>{alert.title}</span>
                      <span style={{ fontSize: 11, color: COLORS.subtext, flexShrink: 0, marginLeft: 8 }}>{alert.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: COLORS.subtext }}>{alert.message}</p>
                    {alert.address && (
                      <p style={{ margin: '4px 0 0', fontSize: 11, color: cfg.dot, fontWeight: 600 }}>📍 {alert.address}</p>
                    )}
                  </div>
                  {alert.type === 'sos' && (
                    <div style={{ marginLeft: 8, flexShrink: 0 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.red, display: 'block', animation: 'pulse 1s infinite' }} />
                    </div>
                  )}
                </button>
              )
            })}
          </>
        )}

        {read.length > 0 && (
          <>
            <p style={{ fontWeight: 700, fontSize: 12, color: COLORS.subtext, textTransform: 'uppercase', letterSpacing: 0.5, margin: '16px 0 10px' }}>Earlier</p>
            {read.map(alert => {
              const cfg = typeConfig[alert.type]
              return (
                <button
                  key={alert.id}
                  onClick={() => handleAlertTap(alert)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'flex-start',
                    background: '#fff', borderRadius: 14, padding: '14px 16px',
                    marginBottom: 8, border: `1px solid ${COLORS.border}`,
                    cursor: 'pointer', textAlign: 'left', opacity: 0.7,
                  }}
                >
                  <span style={{ fontSize: 20, marginRight: 12, marginTop: 1 }}>{cfg.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{alert.title}</span>
                      <span style={{ fontSize: 11, color: COLORS.subtext }}>{alert.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: COLORS.subtext }}>{alert.message}</p>
                  </div>
                </button>
              )
            })}
          </>
        )}

        {alerts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: 40, margin: '0 0 12px' }}>🎉</p>
            <p style={{ fontWeight: 600, fontSize: 16, color: COLORS.text }}>All clear!</p>
            <p style={{ fontSize: 13, color: COLORS.subtext }}>No alerts at this time.</p>
          </div>
        )}
      </div>

      <NavBar />
    </div>
  )
}
