import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Common/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/AdminDashboard'
import ParticipantDashboard from './pages/ParticipantDashboard'
import EventsPage from './pages/EventsPage'
import LeaderboardPage from './pages/LeaderboardPage'
import AnnouncementsPage from './pages/AnnouncementsPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />

            <Route
              path="/admin"
              element={<ProtectedRoute requiredRole="admin" component={AdminDashboard} />}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute requiredRole="participant" component={ParticipantDashboard} />}
            />

            <Route path="/" element={<Navigate to="/events" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
