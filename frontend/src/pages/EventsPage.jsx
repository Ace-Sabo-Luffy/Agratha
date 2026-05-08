import { useState, useMemo } from 'react'
import { mockEvents } from '../data/mockData'

const categoryIcons = {
  technical: '💻',
  cultural: '🎭',
  sports: '🏆',
}

const categoryGradients = {
  technical: 'from-blue-500/20 to-indigo-500/20',
  cultural: 'from-purple-500/20 to-pink-500/20',
  sports: 'from-green-500/20 to-emerald-500/20',
}

const EventsPage = () => {
  const [filter, setFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [registered, setRegistered] = useState(new Set())
  const [showToast, setShowToast] = useState(false)

  const events = useMemo(() => {
    if (filter === 'all') return mockEvents
    return mockEvents.filter(e => e.category === filter)
  }, [filter])

  const handleRegister = (eventId) => {
    setRegistered(prev => new Set([...prev, eventId]))
    setSelectedEvent(null)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold font-['Outfit'] gradient-text mb-3">Events</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Explore all the exciting events at Agratha 2026. From tech to culture to sports — there's something for everyone.
        </p>
      </div>

      {/* Filter pills */}
      <div className="mb-8 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {['all', 'technical', 'cultural', 'sports'].map(cat => (
          <button
            key={cat}
            id={`filter-${cat}`}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-xl capitalize text-sm font-semibold transition-all duration-300 ${
              filter === cat
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat === 'all' ? '🌟 All' : `${categoryIcons[cat] || ''} ${cat}`}
          </button>
        ))}
      </div>

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {events.map(event => (
          <div
            key={event._id}
            className="glass-card group cursor-pointer overflow-hidden"
            onClick={() => setSelectedEvent(event)}
          >
            {/* Category color bar */}
            <div className={`h-1 bg-gradient-to-r ${categoryGradients[event.category]}`} />
            
            <div className="p-6">
              {/* Category badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`badge badge-${event.category}`}>
                  {categoryIcons[event.category]} {event.category}
                </span>
                {registered.has(event._id) && (
                  <span className="badge bg-green-500/15 text-green-400 border-green-500/20">
                    ✓ Registered
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h2 className="text-xl font-bold font-['Outfit'] text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {event.name}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Meta info */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.venue}
                </div>
              </div>

              {/* Capacity bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>{event.registeredCount} registered</span>
                  <span>{event.maxParticipants} max</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                    style={{ width: `${(event.registeredCount / event.maxParticipants) * 100}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-indigo-400">{event.prize}</span>
                <button className="btn-secondary text-xs py-2 px-4 group-hover:bg-indigo-500/20">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-slate-400 text-lg">No events found in this category</p>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
          <div className="relative glass-card max-w-lg w-full p-8 max-h-[85vh] overflow-y-auto border-indigo-500/20">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className={`badge badge-${selectedEvent.category} mb-4`}>
              {categoryIcons[selectedEvent.category]} {selectedEvent.category}
            </span>
            <h2 className="text-3xl font-bold font-['Outfit'] text-white mb-3">{selectedEvent.name}</h2>
            <p className="text-slate-400 leading-relaxed mb-6">{selectedEvent.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">📅 Date</p>
                <p className="text-sm font-medium text-slate-200">
                  {new Date(selectedEvent.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">📍 Venue</p>
                <p className="text-sm font-medium text-slate-200">{selectedEvent.venue}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">⏱ Duration</p>
                <p className="text-sm font-medium text-slate-200">{selectedEvent.duration}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">🏆 Prize</p>
                <p className="text-sm font-medium text-indigo-300">{selectedEvent.prize}</p>
              </div>
            </div>

            {selectedEvent.rules && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-3">📋 Rules</h3>
                <ul className="space-y-2">
                  {selectedEvent.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {registered.has(selectedEvent._id) ? (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-green-400 font-semibold">✓ You're registered for this event!</p>
              </div>
            ) : (
              <button
                onClick={() => handleRegister(selectedEvent._id)}
                className="btn-primary w-full py-3 text-base"
              >
                Register Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 toast">
          <div className="glass-card px-6 py-4 border-green-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400">✓</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Registration Successful!</p>
              <p className="text-slate-400 text-xs">You're all set for the event</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsPage
