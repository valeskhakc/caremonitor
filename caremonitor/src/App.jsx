import React from 'react'
import { AppProvider, useApp } from './context/AppContext.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import DashboardScreen from './screens/DashboardScreen.jsx'
import AlertsScreen from './screens/AlertsScreen.jsx'
import CarePlanScreen from './screens/CarePlanScreen.jsx'
import TrendsScreen from './screens/TrendsScreen.jsx'
import SOSModal from './components/SOSModal.jsx'
import { NotificationToast } from './components/UI.jsx'

function AppShell() {
  const { activeScreen, showSOSModal, isLoggedIn, notifications } = useApp()

  const screens = {
    login: <LoginScreen />,
    profile: <ProfileScreen />,
    dashboard: <DashboardScreen />,
    alerts: <AlertsScreen />,
    careplan: <CarePlanScreen />,
    trends: <TrendsScreen />,
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F0F1A 0%, #16213E 50%, #1A1A2E 100%)',
    }}>
      {/* Phone frame */}
      <div style={{
        width: '100%',
        maxWidth: 390,
        height: '100%',
        maxHeight: 844,
        background: '#F5F6FA',
        borderRadius: window.innerWidth > 440 ? 40 : 0,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: window.innerWidth > 440 ? '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Status bar */}
        {window.innerWidth > 440 && (
          <div style={{
            height: 44, background: '#1A1A2E',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px', flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>9:41</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ color: '#fff', fontSize: 10 }}>▌▌▌</span>
              <span style={{ color: '#fff', fontSize: 10 }}>WiFi</span>
              <span style={{ color: '#fff', fontSize: 10 }}>🔋</span>
            </div>
          </div>
        )}

        {/* Screen content */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div key={activeScreen} className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {screens[activeScreen] || <DashboardScreen />}
          </div>

          {/* SOS Modal overlay */}
          {showSOSModal && isLoggedIn && <SOSModal />}

          {/* Toast notifications */}
          <NotificationToast notifications={notifications} />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
