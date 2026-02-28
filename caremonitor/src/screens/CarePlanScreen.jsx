import React, { useState } from 'react'
import { useApp, COLORS, PATIENTS } from '../context/AppContext.jsx'
import { NavBar, ScreenHeader, Card, Toggle } from '../components/UI.jsx'

export default function CarePlanScreen() {
  const { moveReminderOn, setMoveReminderOn, settingsOn, setSettingsOn, navigate, addNotification } = useApp()
  const [voiceActive, setVoiceActive] = useState(false)
  const [checkupDate] = useState('Thurs, 9 May 2025')
  const [interval, setInterval] = useState(20)

  const handleVoice = () => {
    setVoiceActive(true)
    setTimeout(() => setVoiceActive(false), 2000)
    addNotification('🎤 Listening... say "Show alerts" or "Call Auntie Lee"')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg }}>
      <ScreenHeader title="Care Plan & Reminders" />

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 16px 80px' }}>

        {/* Move Reminder */}
        <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: '0 0 10px' }}>Care Plan</p>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ padding: '16px', borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: moveReminderOn ? 12 : 0 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🏃</span>
                  <span style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>Move Reminder</span>
                </div>
                <p style={{ margin: '2px 0 0 26px', fontSize: 12, color: COLORS.subtext }}>Every {interval} min</p>
              </div>
              <Toggle value={moveReminderOn} onChange={setMoveReminderOn} />
            </div>
            {moveReminderOn && (
              <div style={{ marginLeft: 26 }}>
                <p style={{ fontSize: 11, color: COLORS.subtext, marginBottom: 8 }}>Remind every:</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[15, 20, 30, 45, 60].map(m => (
                    <button key={m} onClick={() => setInterval(m)} style={{
                      padding: '5px 10px', borderRadius: 20,
                      background: interval === m ? COLORS.primary : '#F0F4F8',
                      color: interval === m ? '#fff' : COLORS.subtext,
                      border: 'none', fontSize: 11, fontWeight: 600,
                    }}>
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Monthly checkup */}
          <div style={{ padding: '16px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: 18, marginRight: 10 }}>📅</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: COLORS.text }}>Monthly Checkup</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: COLORS.subtext }}>{checkupDate} · 9:00 AM</p>
            </div>
            <span style={{ color: COLORS.subtext, fontSize: 18 }}>›</span>
          </div>

          {/* Settings */}
          <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 18, marginRight: 10 }}>⚙</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: COLORS.text }}>Push Notifications</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: COLORS.subtext }}>Receive alerts on this device</p>
            </div>
            <Toggle value={settingsOn} onChange={setSettingsOn} />
          </div>
        </Card>

        {/* Voice assistant */}
        <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: '0 0 10px' }}>Voice Assistant</p>
        <Card style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <button
              onClick={handleVoice}
              style={{
                width: 52, height: 52, borderRadius: '50%',
                background: voiceActive ? COLORS.red : COLORS.primary,
                border: 'none', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, cursor: 'pointer',
                animation: voiceActive ? 'pulse 0.6s infinite' : 'none',
                boxShadow: '0 4px 12px rgba(192,57,43,0.3)',
                flexShrink: 0,
              }}
            >
              🎤
            </button>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: COLORS.text }}>
                {voiceActive ? 'Listening...' : 'Tap to speak'}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: COLORS.subtext }}>
                Try: <em>"Show alerts"</em> or <em>"Call Auntie Lee"</em>
              </p>
            </div>
          </div>
          <div style={{ background: COLORS.bg, borderRadius: 10, padding: '10px 12px' }}>
            <p style={{ margin: 0, fontSize: 11, color: COLORS.subtext, fontWeight: 600, marginBottom: 6 }}>QUICK COMMANDS</p>
            {['"Show alerts"', '"Call [patient name]"', '"Navigate to [address]"', '"Show patient summary"'].map((cmd, i) => (
              <p key={i} style={{ margin: '4px 0', fontSize: 12, color: COLORS.text }}>• {cmd}</p>
            ))}
          </div>
        </Card>

        {/* Quick access to patients */}
        <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: '0 0 10px' }}>Quick Access</p>
        <Card style={{ overflow: 'hidden' }}>
          {PATIENTS.slice(0, 3).map((p, i) => (
            <button
              key={p.id}
              onClick={() => navigate('trends', p)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                padding: '12px 16px', background: 'none', border: 'none',
                borderBottom: i < 2 ? `1px solid ${COLORS.border}` : 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.riskColor, marginRight: 10 }} />
              <span style={{ flex: 1, fontSize: 13, color: COLORS.text, textAlign: 'left', fontWeight: 500 }}>{p.name}</span>
              <span style={{ fontSize: 11, color: COLORS.subtext }}>{p.risk}</span>
              <span style={{ color: COLORS.subtext, fontSize: 16, marginLeft: 8 }}>›</span>
            </button>
          ))}
        </Card>
      </div>

      <NavBar />
    </div>
  )
}
