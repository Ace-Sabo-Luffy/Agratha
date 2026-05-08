import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

const Navbar = () => {
  const { user, userData, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => setMobileOpen(false)}
      className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
        isActive(to)
          ? 'text-white bg-white/10'
          : 'text-slate-300 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
      {isActive(to) && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full" />
      )}
    </Link>
  )

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5" style={{
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🎉</span>
            <span className="text-xl font-bold font-['Outfit'] tracking-tight">
              <span className="gradient-text">Agratha</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/announcements">Announcements</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>

            {user ? (
              <>
                {userData?.role === 'admin' && (
                  <NavLink to="/admin">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Admin Panel
                    </span>
                  </NavLink>
                )}
                {userData?.role === 'participant' && (
                  <NavLink to="/dashboard">My Dashboard</NavLink>
                )}

                <div className="ml-2 pl-2 border-l border-white/10 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {userData?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm text-slate-300 hidden lg:block">{userData?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="ml-2 pl-2 border-l border-white/10 flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 py-4 px-4 space-y-2" style={{
          background: 'rgba(15, 23, 42, 0.95)',
        }}>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/announcements">Announcements</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          {user ? (
            <>
              {userData?.role === 'admin' && <NavLink to="/admin">Admin Panel</NavLink>}
              {userData?.role === 'participant' && <NavLink to="/dashboard">My Dashboard</NavLink>}
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
