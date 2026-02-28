import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export const COLORS = {
  primary: '#C0392B',
  primaryDark: '#922B21',
  primaryLight: '#E74C3C',
  green: '#27AE60',
  yellow: '#E67E22',
  red: '#C0392B',
  bg: '#F5F6FA',
  card: '#FFFFFF',
  text: '#1A1A2E',
  subtext: '#7F8C8D',
  border: '#E8ECF0',
  navBg: '#FFFFFF',
}

export const PATIENTS = [
  {
    id: 1,
    name: 'Auntie Lee',
    initials: 'AL',
    age: 78,
    risk: 'High Risk',
    riskLevel: 'high',
    riskColor: COLORS.red,
    detail: 'Low Mobility',
    address: 'Blk 150 Naryang Crescent, #08-12',
    phone: '+65 9123 4567',
    nok: 'Lee Wei Ming (Son) · +65 9888 7777',
    steps: 1200,
    activeHrs: 1.5,
    falls: 3,
    lastSeen: '10 mins ago',
    device: 'CareWatch Pro',
    notes: 'Patient has limited mobility due to prior hip surgery. Monitor closely.',
    mobilityData: [65, 58, 42, 38, 30, 22, 18],
    trendData: [60, 52, 45, 38, 35, 28, 22],
  },
  {
    id: 2,
    name: 'Mr. Tan',
    initials: 'MT',
    age: 72,
    risk: 'Moderate Risk',
    riskLevel: 'moderate',
    riskColor: COLORS.yellow,
    detail: 'Moderate Risk',
    address: 'Blk 45 Jurong East St 21, #04-08',
    phone: '+65 9234 5678',
    nok: 'Tan Mei Ling (Daughter) · +65 9777 6666',
    steps: 3400,
    activeHrs: 2.8,
    falls: 1,
    lastSeen: '25 mins ago',
    device: 'CareWatch Lite',
    notes: 'Diabetic patient. Check blood sugar levels regularly.',
    mobilityData: [50, 60, 55, 62, 58, 65, 60],
    trendData: [45, 55, 50, 58, 55, 60, 56],
  },
  {
    id: 3,
    name: 'Mdm. Wong',
    initials: 'MW',
    age: 81,
    risk: 'High Risk',
    riskLevel: 'high',
    riskColor: COLORS.red,
    detail: 'High Risk',
    address: 'Blk 88 Toa Payoh Central, #12-05',
    phone: '+65 9345 6789',
    nok: 'Wong Ah Kow (Son) · +65 9666 5555',
    steps: 800,
    activeHrs: 1.0,
    falls: 5,
    lastSeen: '5 mins ago',
    device: 'CareWatch Pro',
    notes: 'History of falls. Ensure home safety assessment is completed.',
    mobilityData: [70, 55, 45, 30, 25, 20, 15],
    trendData: [65, 50, 42, 28, 24, 20, 16],
  },
  {
    id: 4,
    name: 'Mr. Lim',
    initials: 'ML',
    age: 69,
    risk: 'Low Risk',
    riskLevel: 'low',
    riskColor: COLORS.green,
    detail: 'Stable',
    address: 'Blk 203 Bukit Batok St 21, #03-15',
    phone: '+65 9456 7890',
    nok: 'Lim Siew Hoon (Wife) · +65 9555 4444',
    steps: 6200,
    activeHrs: 4.5,
    falls: 0,
    lastSeen: '2 mins ago',
    device: 'CareWatch Lite',
    notes: 'Active and independent. Monthly check-up sufficient.',
    mobilityData: [75, 80, 78, 82, 79, 85, 82],
    trendData: [70, 75, 72, 78, 74, 80, 78],
  },
  {
    id: 5,
    name: 'Mdm. Siti',
    initials: 'MS',
    age: 75,
    risk: 'Moderate Risk',
    riskLevel: 'moderate',
    riskColor: COLORS.yellow,
    detail: 'Moderate Risk',
    address: 'Blk 112 Woodlands Ave 6, #07-22',
    phone: '+65 9567 8901',
    nok: 'Ahmad Rashid (Son) · +65 9444 3333',
    steps: 2800,
    activeHrs: 2.2,
    falls: 2,
    lastSeen: '1 hr ago',
    device: 'CareWatch Pro',
    notes: 'Hypertension. Monitor blood pressure daily.',
    mobilityData: [55, 60, 52, 58, 50, 55, 52],
    trendData: [50, 55, 48, 54, 48, 52, 50],
  },
]

export const ALERTS = [
  { id: 1, patientId: 1, type: 'sos', title: 'SOS: Auntie Lee', message: 'Fall Detected · 102ms response', time: '10:32 AM', read: false, address: 'Blk 150 Naryang Crescent', location: { lat: 1.3521, lng: 103.8198 } },
  { id: 2, patientId: 2, type: 'warning', title: 'Mr. Tan', message: 'Missed medication reminder', time: '9:45 AM', read: false },
  { id: 3, patientId: 3, type: 'warning', title: 'Mdm. Wong', message: 'Inactive for 4 hours', time: '8:20 AM', read: true },
  { id: 4, patientId: 5, type: 'info', title: 'Mdm. Siti', message: 'Monthly checkup due tomorrow', time: 'Yesterday', read: true },
  { id: 5, patientId: 4, type: 'info', title: 'Mr. Lim', message: 'Daily goal achieved 🎉', time: 'Yesterday', read: true },
]

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user] = useState({ name: 'Nurse Lim', role: 'Community Nurse', initials: 'NL' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeScreen, setActiveScreen] = useState('login')
  const [alerts, setAlerts] = useState(ALERTS)
  const [sosActive, setSosActive] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [prevScreen, setPrevScreen] = useState(null)
  const [showSOSModal, setShowSOSModal] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [moveReminderOn, setMoveReminderOn] = useState(true)
  const [settingsOn, setSettingsOn] = useState(false)

  const unreadCount = alerts.filter(a => !a.read).length

  const navigate = useCallback((screen, patient = null) => {
    setPrevScreen(activeScreen)
    if (patient) setSelectedPatient(patient)
    setActiveScreen(screen)
  }, [activeScreen])

  const login = useCallback(() => {
    setIsLoggedIn(true)
    navigate('profile')
    // Trigger SOS after a few seconds for demo purposes
    setTimeout(() => {
      setSosActive(true)
      setShowSOSModal(true)
      addNotification('🚨 SOS Alert from Auntie Lee — Fall detected!')
    }, 5000)
  }, [navigate])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setActiveScreen('login')
    setSosActive(false)
    setShowSOSModal(false)
  }, [])

  const dismissSOS = useCallback(() => {
    setShowSOSModal(false)
    setAlerts(prev => prev.map(a => a.id === 1 ? { ...a, read: true } : a))
  }, [])

  const acknowledgeAlert = useCallback((alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, read: true } : a))
    if (alertId === 1) {
      setSosActive(false)
      setShowSOSModal(false)
    }
  }, [])

  const addNotification = useCallback((message) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }, [])

  return (
    <AppContext.Provider value={{
      user, isLoggedIn, activeScreen, alerts, sosActive,
      selectedPatient, prevScreen, showSOSModal, unreadCount,
      notifications, moveReminderOn, settingsOn,
      navigate, login, logout, dismissSOS, acknowledgeAlert,
      setMoveReminderOn, setSettingsOn, setSelectedPatient, addNotification,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
