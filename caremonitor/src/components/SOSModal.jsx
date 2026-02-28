import React from 'react'
import { useApp, COLORS } from '../context/AppContext.jsx'

export default function SOSModal() {
  const { showSOSModal, dismissSOS, navigate, acknowledgeAlert } = useApp()

  if (!showSOSModal) return null

  const handleViewLocation = () => {
    dismissSOS()
    navigate('alerts')
  }

  const handleAcknowledge = () => {
    acknowledgeAlert(1)
    dismissSOS()
  }

  return (
    <div
      className="animate-fadeIn"
      style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 150,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        className="animate-popIn"
        style={{
          background: '#fff', borderRadius: 20,
          padding: 24, width: '100%',
          boxShadow: '0 20px 60px rgba(192,57,43,0.3)',
          border: '2px solid ' + COLORS.red,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            background: COLORS.red, borderRadius: 10,
            padding: '6px 12px',
            animation: 'sosFlash 1s infinite',
          }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>SOS</span>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 17, color: COLORS.red, margin: 0 }}>Alert – Auntie Lee</p>
            <p style={{ fontSize: 11, color: COLORS.subtext, margin: 0 }}>Patient ID #001</p>
          </div>
        </div>

        <div style={{ background: '#FCEAEA', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: COLORS.subtext }}>Event</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.red }}>Fall Detected</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: COLORS.subtext }}>Time</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>10:32 AM</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: COLORS.subtext }}>Response</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>102ms</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: COLORS.subtext }}>Location</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Blk 150 Naryang Cres</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={handleViewLocation}
            style={{
              padding: 15, borderRadius: 12,
              background: COLORS.primary, color: '#fff',
              border: 'none', fontWeight: 700, fontSize: 15,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
            }}
          >
            <span>📍</span> View Location
          </button>
          <button
            onClick={() => { window.open('tel:+6591234567') }}
            style={{
              padding: 15, borderRadius: 12,
              background: '#F0F4F8', color: COLORS.text,
              border: 'none', fontWeight: 600, fontSize: 15,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
            }}
          >
            <span>📞</span> Call Patient
          </button>
          <button
            onClick={handleAcknowledge}
            style={{
              padding: 15, borderRadius: 12,
              background: '#E8F8F0', color: COLORS.green,
              border: 'none', fontWeight: 600, fontSize: 15,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
            }}
          >
            <span>✓</span> Acknowledge
          </button>
        </div>
      </div>
    </div>
  )
}
