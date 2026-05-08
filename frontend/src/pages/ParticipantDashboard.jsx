import { mockEvents } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const ParticipantDashboard = () => {
  const { userData } = useAuth()

  const registeredEvents = mockEvents.filter(e =>
    userData?.registeredEvents?.includes(e._id)
  )

  const stats = [
    {
      label: 'Registered Events',
      value: registeredEvents.length || 2,
      icon: '🎪',
      color: 'stat-card-blue',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      label: 'Teams Joined',
      value: userData?.teams?.length || 1,
      icon: '👥',
      color: 'stat-card-green',
      gradient: 'from-emerald-500 to-green-600',
    },
    {
      label: 'Results Posted',
      value: 1,
      icon: '🏆',
      color: 'stat-card-purple',
      gradient: 'from-purple-500 to-pink-600',
    },
  ]

  const myEvents = registeredEvents.length > 0 ? registeredEvents : mockEvents.slice(0, 2)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold font-['Outfit'] mb-3">
          Welcome back, <span className="gradient-text">{userData?.name || 'Raj'}</span> 👋
        </h1>
        <p className="text-slate-400 text-lg">Here's your fest activity at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 stagger-children">
        {stats.map((stat, i) => (
          <div key={i} className={`glass-card stat-card ${stat.color} p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-xl shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* My Registrations */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold font-['Outfit'] text-white">My Registrations</h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="space-y-4">
          {myEvents.map(event => (
            <div key={event._id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  event.category === 'technical' ? 'bg-blue-500/15' :
                  event.category === 'cultural' ? 'bg-purple-500/15' :
                  'bg-green-500/15'
                }`}>
                  {event.category === 'technical' ? '💻' : event.category === 'cultural' ? '🎭' : '🏆'}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{event.name}</h3>
                  <p className="text-sm text-slate-500">
                    {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {event.venue}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge badge-${event.category} text-xs`}>{event.category}</span>
                <span className="badge bg-green-500/15 text-green-400 border-green-500/20 text-xs">Confirmed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold font-['Outfit'] text-white">Quick Actions</h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/events" className="glass-card p-5 text-center hover:border-indigo-500/30 group">
            <div className="text-3xl mb-2">🎪</div>
            <p className="font-medium text-white group-hover:text-indigo-300 transition-colors">Browse Events</p>
            <p className="text-xs text-slate-500 mt-1">Discover new events</p>
          </a>
          <a href="/leaderboard" className="glass-card p-5 text-center hover:border-indigo-500/30 group">
            <div className="text-3xl mb-2">📊</div>
            <p className="font-medium text-white group-hover:text-indigo-300 transition-colors">Leaderboard</p>
            <p className="text-xs text-slate-500 mt-1">Check your rankings</p>
          </a>
          <a href="/announcements" className="glass-card p-5 text-center hover:border-indigo-500/30 group">
            <div className="text-3xl mb-2">📢</div>
            <p className="font-medium text-white group-hover:text-indigo-300 transition-colors">Announcements</p>
            <p className="text-xs text-slate-500 mt-1">Latest updates</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ParticipantDashboard
