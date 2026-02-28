import React, { useState } from 'react'
import { useApp, COLORS } from '../context/AppContext.jsx'

export default function LoginScreen() {
  const { login } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState(null)

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      login()
    }, 1400)
  }

  const inputStyle = (field) => ({
    padding: '14px 16px',
    borderRadius: 12,
    border: `2px solid ${focused === field ? COLORS.primary : COLORS.border}`,
    fontFamily: 'Sora, sans-serif',
    fontSize: 14,
    outline: 'none',
    color: COLORS.text,
    background: '#fff',
    width: '100%',
    transition: 'border-color 0.2s',
  })

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: '0 28px',
      background: 'linear-gradient(180deg, #fff 0%, #F5F6FA 100%)',
    }}>
      {/* Logo */}
      <div className="animate-slideUp" style={{ marginBottom: 44, textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: COLORS.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: '0 8px 24px rgba(192,57,43,0.3)',
        }}>
          <span style={{ color: '#fff', fontSize: 36, lineHeight: 1 }}>♥</span>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 24, color: COLORS.text, margin: 0 }}>CareMonitor</h1>
        <p style={{ color: COLORS.subtext, fontSize: 12, margin: '4px 0 0' }}>Community Care Platform</p>
      </div>

      <div className="animate-slideUp" style={{ animationDelay: '0.1s', width: '100%' }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, color: COLORS.text, marginBottom: 24, textAlign: 'center' }}>Welcome back</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.subtext, display: 'block', marginBottom: 6 }}>EMAIL</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="nurse@caremonitor.sg"
              type="email"
              style={inputStyle('email')}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.subtext, display: 'block', marginBottom: 6 }}>PASSWORD</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              placeholder="••••••••"
              type="password"
              style={inputStyle('password')}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {error && (
            <p style={{ color: COLORS.red, fontSize: 12, textAlign: 'center', margin: 0 }}>{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              padding: '15px', borderRadius: 12,
              background: loading ? '#C8CDD6' : COLORS.primary,
              color: '#fff', border: 'none',
              fontWeight: 700, fontSize: 16,
              marginTop: 8,
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(192,57,43,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  animation: 'spin 0.8s linear infinite',
                  display: 'inline-block',
                }} />
                Logging in...
              </>
            ) : 'Login'}
          </button>

          <p style={{ textAlign: 'center', color: COLORS.primary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            Forgot Password?
          </p>
        </div>
      </div>

      <div className="animate-slideUp" style={{ animationDelay: '0.2s', position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: COLORS.subtext }}>Demo: enter any email & password</p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
