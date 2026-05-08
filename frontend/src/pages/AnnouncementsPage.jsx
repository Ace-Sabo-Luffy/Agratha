import { mockAnnouncements } from '../data/mockData'

const AnnouncementsPage = () => {
  const pinned = mockAnnouncements.filter(a => a.isPinned)
  const regular = mockAnnouncements.filter(a => !a.isPinned)

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    if (days > 0) return `${days}d ago`
    const hours = Math.floor(diff / 3600000)
    if (hours > 0) return `${hours}h ago`
    return 'Just now'
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold font-['Outfit'] gradient-text mb-3">Announcements</h1>
        <p className="text-slate-400 text-lg">Stay updated with the latest fest news and updates</p>
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">📌 Pinned</span>
            <div className="flex-1 h-px bg-amber-500/20" />
          </div>
          <div className="space-y-4 stagger-children">
            {pinned.map(announcement => (
              <div
                key={announcement._id}
                className="glass-card p-6 border-l-2 border-l-amber-500/50 hover:border-l-amber-400"
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <h2 className="text-xl font-bold font-['Outfit'] text-white">{announcement.title}</h2>
                  <span className="badge badge-pinned text-xs">📌 Pinned</span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-4">{announcement.content}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
                      {announcement.author.charAt(0)}
                    </div>
                    {announcement.author}
                  </span>
                  <span>{new Date(announcement.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular */}
      <div>
        <div className="flex items-center gap-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Recent Updates</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <div className="space-y-4 stagger-children">
          {regular.map(announcement => (
            <div key={announcement._id} className="glass-card p-6">
              <h2 className="text-lg font-bold font-['Outfit'] text-white mb-2">{announcement.title}</h2>
              <p className="text-slate-400 leading-relaxed text-sm mb-4">{announcement.content}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
                    {announcement.author.charAt(0)}
                  </div>
                  {announcement.author}
                </span>
                <span>{timeAgo(announcement.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mockAnnouncements.length === 0 && (
        <div className="glass-card p-16 text-center animate-fade-in-up">
          <div className="text-6xl mb-4">📢</div>
          <p className="text-slate-400 text-lg">No announcements yet</p>
          <p className="text-slate-500 text-sm mt-2">Check back later for updates</p>
        </div>
      )}
    </div>
  )
}

export default AnnouncementsPage
