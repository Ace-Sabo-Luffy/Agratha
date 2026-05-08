import { useState } from 'react'
import { mockEvents, mockAnnouncements } from '../data/mockData'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events')
  const [showEventForm, setShowEventForm] = useState(false)
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false)
  const [announcementTitle, setAnnouncementTitle] = useState('')
  const [announcementContent, setAnnouncementContent] = useState('')
  const [announcementPinned, setAnnouncementPinned] = useState(false)
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [selectedRegEvent, setSelectedRegEvent] = useState(mockEvents[0]?._id || '')

  const tabs = [
    { id: 'events', label: 'Events', icon: '🎪' },
    { id: 'registrations', label: 'Registrations', icon: '📋' },
    { id: 'results', label: 'Results', icon: '🏆' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
  ]

  const toast = (msg) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handlePostAnnouncement = () => {
    if (!announcementTitle || !announcementContent) return
    const newAnn = {
      _id: `ann-${Date.now()}`,
      title: announcementTitle,
      content: announcementContent,
      isPinned: announcementPinned,
      createdAt: new Date().toISOString(),
      author: 'Admin',
    }
    setAnnouncements([newAnn, ...announcements])
    setAnnouncementTitle('')
    setAnnouncementContent('')
    setAnnouncementPinned(false)
    setShowAnnouncementForm(false)
    toast('Announcement posted successfully!')
  }

  // Mock registrations data
  const mockRegistrations = [
    { name: 'Raj Kumar', email: 'raj@college.com', team: 'DevSlayers', date: '2026-05-10' },
    { name: 'Priya Singh', email: 'priya@college.com', team: 'CodeForce', date: '2026-05-10' },
    { name: 'Amit Patel', email: 'amit@college.com', team: '-', date: '2026-05-11' },
    { name: 'Sarah Jones', email: 'sarah@college.com', team: 'TechKnights', date: '2026-05-11' },
    { name: 'Vikram Reddy', email: 'vikram@college.com', team: 'ByteBusters', date: '2026-05-12' },
    { name: 'Neha Sharma', email: 'neha@college.com', team: '-', date: '2026-05-12' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold font-['Outfit'] gradient-text mb-3">Admin Dashboard</h1>
        <p className="text-slate-400 text-lg">Manage events, registrations, results, and announcements</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 stagger-children">
        <div className="glass-card stat-card stat-card-blue p-5">
          <p className="text-xs text-slate-500 mb-1">Total Events</p>
          <p className="text-3xl font-bold text-white">{mockEvents.length}</p>
        </div>
        <div className="glass-card stat-card stat-card-green p-5">
          <p className="text-xs text-slate-500 mb-1">Total Registrations</p>
          <p className="text-3xl font-bold text-white">{mockEvents.reduce((a, e) => a + e.registeredCount, 0)}</p>
        </div>
        <div className="glass-card stat-card stat-card-purple p-5">
          <p className="text-xs text-slate-500 mb-1">Announcements</p>
          <p className="text-3xl font-bold text-white">{announcements.length}</p>
        </div>
        <div className="glass-card p-5" style={{ borderTop: '3px solid rgba(251, 191, 36, 0.5)' }}>
          <p className="text-xs text-slate-500 mb-1">Capacity Used</p>
          <p className="text-3xl font-bold text-white">{Math.round(mockEvents.reduce((a, e) => a + (e.registeredCount / e.maxParticipants), 0) / mockEvents.length * 100)}%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-white/[0.03] rounded-xl p-1 overflow-x-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`admin-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-['Outfit'] text-white">Manage Events</h2>
              <button onClick={() => setShowEventForm(!showEventForm)} className="btn-primary flex items-center gap-2">
                <span className="text-lg">+</span> Add Event
              </button>
            </div>

            {showEventForm && (
              <div className="glass-card p-6 mb-6 border-indigo-500/20">
                <h3 className="font-semibold text-white mb-4">Create New Event</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Event Name</label>
                    <input className="input-field" placeholder="e.g., Code Wars" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Category</label>
                    <select className="input-field">
                      <option value="technical">Technical</option>
                      <option value="cultural">Cultural</option>
                      <option value="sports">Sports</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Max Participants</label>
                    <input type="number" className="input-field" placeholder="50" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Date</label>
                    <input type="date" className="input-field" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs text-slate-400 mb-1.5">Description</label>
                  <textarea className="input-field h-24 resize-none" placeholder="Describe the event..." />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setShowEventForm(false); toast('Event created!') }} className="btn-primary">Create Event</button>
                  <button onClick={() => setShowEventForm(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {mockEvents.map(event => (
                <div key={event._id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      event.category === 'technical' ? 'bg-blue-500/15' :
                      event.category === 'cultural' ? 'bg-purple-500/15' :
                      'bg-green-500/15'
                    }`}>
                      {event.category === 'technical' ? '💻' : event.category === 'cultural' ? '🎭' : '🏆'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{event.name}</h3>
                      <p className="text-sm text-slate-500">{event.registeredCount}/{event.maxParticipants} registered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge badge-${event.category} text-xs`}>{event.category}</span>
                    <button className="btn-secondary text-xs py-1.5 px-3">Edit</button>
                    <button className="text-xs py-1.5 px-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REGISTRATIONS TAB */}
        {activeTab === 'registrations' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold font-['Outfit'] text-white">Registrations</h2>
              <div className="flex items-center gap-3">
                <select
                  value={selectedRegEvent}
                  onChange={(e) => setSelectedRegEvent(e.target.value)}
                  className="input-field max-w-xs text-sm"
                >
                  {mockEvents.map(event => (
                    <option key={event._id} value={event._id}>{event.name}</option>
                  ))}
                </select>
                <button onClick={() => toast('CSV exported!')} className="btn-secondary text-xs whitespace-nowrap">
                  📥 Export CSV
                </button>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Team</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {mockRegistrations.map((reg, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-slate-500 text-sm">{i + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                              {reg.name.charAt(0)}
                            </div>
                            <span className="text-white text-sm font-medium">{reg.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{reg.email}</td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{reg.team}</td>
                        <td className="px-6 py-4 text-slate-500 text-sm">{reg.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS TAB */}
        {activeTab === 'results' && (
          <div>
            <h2 className="text-2xl font-bold font-['Outfit'] text-white mb-6">Publish Results</h2>
            <div className="glass-card p-6 max-w-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Select Event</label>
                  <select className="input-field">
                    {mockEvents.map(event => (
                      <option key={event._id} value={event._id}>{event.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Participant</label>
                  <select className="input-field">
                    <option>Raj Kumar</option>
                    <option>Priya Singh</option>
                    <option>Amit Patel</option>
                    <option>Sarah Jones</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Score</label>
                    <input type="number" className="input-field" placeholder="950" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Rank</label>
                    <input type="number" className="input-field" placeholder="1" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => toast('Results published!')} className="btn-primary">Submit Results</button>
                  <button className="btn-secondary">Update Existing</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeTab === 'announcements' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-['Outfit'] text-white">Announcements</h2>
              <button onClick={() => setShowAnnouncementForm(!showAnnouncementForm)} className="btn-primary flex items-center gap-2">
                <span className="text-lg">+</span> New Post
              </button>
            </div>

            {showAnnouncementForm && (
              <div className="glass-card p-6 mb-6 border-indigo-500/20">
                <h3 className="font-semibold text-white mb-4">Post Announcement</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Title</label>
                    <input
                      className="input-field"
                      value={announcementTitle}
                      onChange={(e) => setAnnouncementTitle(e.target.value)}
                      placeholder="Announcement title..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Content</label>
                    <textarea
                      className="input-field h-28 resize-none"
                      value={announcementContent}
                      onChange={(e) => setAnnouncementContent(e.target.value)}
                      placeholder="Write your announcement..."
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={announcementPinned}
                      onChange={(e) => setAnnouncementPinned(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-slate-300">📌 Pin this announcement</span>
                  </label>
                  <div className="flex gap-3">
                    <button onClick={handlePostAnnouncement} className="btn-primary">Post</button>
                    <button onClick={() => setShowAnnouncementForm(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {announcements.map(ann => (
                <div key={ann._id} className={`glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${ann.isPinned ? 'border-l-2 border-l-amber-500/50' : ''}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm">{ann.title}</h3>
                      {ann.isPinned && <span className="text-xs text-amber-400">📌</span>}
                    </div>
                    <p className="text-xs text-slate-500">
                      {ann.author} • {new Date(ann.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-secondary text-xs py-1.5 px-3">Edit</button>
                    <button className="text-xs py-1.5 px-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 toast">
          <div className="glass-card px-6 py-4 border-green-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400">✓</span>
            </div>
            <p className="text-white font-medium text-sm">{toastMsg}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
