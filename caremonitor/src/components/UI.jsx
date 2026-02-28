import React from 'react'
import { COLORS } from '../context/AppContext.jsx'
import { useApp } from '../context/AppContext.jsx'

export function RiskBadge({ level, label }) {
  const colors = {
    high: { bg: '#FCEAEA', text: COLORS.red, dot: COLORS.red },
    moderate: { bg: '#FEF3E2', text: COLORS.yellow, dot: COLORS.yellow },
    low: { bg: '#E8F8F0', text: COLORS.green, dot: COLORS.green },
  }
  const c = colors[level] || colors.low
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, color: c.text,
      borderRadius: 20, padding: '3px 10px',
      fontSize: 11, fontWeight: 600,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, display: 'inline-block' }} />
      {label}
    </span>
  )
}

export function Avatar({ initials, size = 40, bg = COLORS.primary }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: '#fff',
      fontWeight: 700, fontSize: size * 0.35, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 48, height: 27, borderRadius: 14,
        background: value ? COLORS.primary : '#C8CDD6',
        cursor: 'pointer', position: 'relative',
        transition: 'background 0.25s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', width: 23, height: 23,
        borderRadius: '50%', background: '#fff',
        top: 2, left: value ? 23 : 2,
        transition: 'left 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }} />
    </div>
  )
}

export function Card({ children, style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function ScreenHeader({ title, subtitle, onBack, rightAction }) {
  const { navigate, prevScreen } = useApp()
  return (
    <div style={{
      background: COLORS.primary,
      padding: '48px 20px 20px',
      color: '#fff',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {onBack && (
            <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '4px 8px', color: '#fff', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>←</button>
          )}
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 20, margin: 0, lineHeight: 1.2 }}>{title}</h2>
            {subtitle && <p style={{ margin: '3px 0 0', fontSize: 12, opacity: 0.8 }}>{subtitle}</p>}
          </div>
        </div>
        {rightAction}
      </div>
    </div>
  )
}

export function NavBar() {
  const { activeScreen, navigate, unreadCount, sosActive } = useApp()

  const items = [
    { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
    { id: 'alerts', icon: '🔔', label: 'Alerts', badge: unreadCount },
    { id: 'careplan', icon: '❤', label: 'Care Plan' },
    { id: 'trends', icon: '📈', label: 'Trends' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ]

  return (
    <div style={{
      display: 'flex',
      background: '#fff',
      borderTop: '1px solid ' + COLORS.border,
      padding: '8px 0 env(safe-area-inset-bottom, 12px)',
      flexShrink: 0,
    }}>
      {items.map(item => {
        const active = activeScreen === item.id
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            style={{
              flex: 1, background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex',
              flexDirection: 'column', alignItems: 'center',
              gap: 2, padding: '4px 0',
              position: 'relative',
            }}
          >
            {item.badge > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: '50%',
                transform: 'translateX(8px)',
                background: sosActive && item.id === 'alerts' ? COLORS.red : COLORS.yellow,
                color: '#fff', borderRadius: '50%',
                width: 16, height: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700,
                animation: sosActive && item.id === 'alerts' ? 'pulse 1s infinite' : 'none',
              }}>
                {item.badge}
              </span>
            )}
            <span style={{ fontSize: 20, lineHeight: 1 }}>{item.icon}</span>
            <span style={{
              fontSize: 9, fontWeight: active ? 700 : 400,
              color: active ? COLORS.primary : COLORS.subtext,
            }}>
              {item.label}
            </span>
            {active && (
              <div style={{
                position: 'absolute', bottom: -4, left: '50%',
                transform: 'translateX(-50%)',
                width: 4, height: 4, borderRadius: '50%',
                background: COLORS.primary,
              }} />
            )}
          </button>
        )
      })}
    </div>
  )
}

export function SparkLine({ data, color, height = 70, animated = true }) {
  const w = 300, h = height
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 16) - 8
    return [x, y]
  })
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')

  // Fill path
  const fillD = pathD + ` L ${w} ${h} L 0 ${h} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#grad-${color.replace('#','')})`} />
      <path
        d={pathD}
        fill="none" stroke={color} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        style={animated ? { strokeDasharray: 1000, strokeDashoffset: 0, animation: 'drawLine 1.5s ease forwards' } : {}}
      />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} fill={color} stroke="#fff" strokeWidth={2} />
      ))}
    </svg>
  )
}

export function NotificationToast({ notifications }) {
  return (
    <div style={{ position: 'absolute', top: 60, left: 16, right: 16, zIndex: 200, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
      {notifications.map(n => (
        <div key={n.id} className="animate-slideUp" style={{
          background: COLORS.text, color: '#fff',
          borderRadius: 12, padding: '12px 16px',
          fontSize: 13, fontWeight: 500,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          {n.message}
        </div>
      ))}
    </div>
  )
}
