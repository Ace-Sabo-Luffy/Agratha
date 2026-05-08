import { useState, useMemo } from 'react'
import { mockEvents, mockLeaderboard } from '../data/mockData'

const medalEmojis = ['🥇', '🥈', '🥉']
const rankClasses = ['rank-gold', 'rank-silver', 'rank-bronze']

const LeaderboardPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]?._id || '')

  const leaderboard = useMemo(() => {
    return mockLeaderboard[selectedEvent] || []
  }, [selectedEvent])

  const selectedEventData = useMemo(() => {
    return mockEvents.find(e => e._id === selectedEvent)
  }, [selectedEvent])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold font-['Outfit'] gradient-text mb-3">Leaderboard</h1>
        <p className="text-slate-400 text-lg">Track rankings and scores across all events</p>
      </div>

      {/* Event selector */}
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <label className="block text-sm font-medium text-slate-400 mb-2">Select Event</label>
        <select
          id="leaderboard-event-select"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="input-field max-w-xs"
        >
          {mockEvents.map(event => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {leaderboard.length > 0 ? (
        <>
          {/* Top 3 podium */}
          <div className="grid grid-cols-3 gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {/* 2nd place */}
            {leaderboard[1] && (
              <div className="glass-card p-6 text-center mt-8 order-1">
                <div className="text-3xl mb-2">🥈</div>
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-white font-bold text-lg mb-3">
                  {leaderboard[1].participantName.charAt(0)}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{leaderboard[1].participantName}</h3>
                <p className="text-xs text-slate-500 mb-2">{leaderboard[1].teamName || 'Solo'}</p>
                <p className="text-2xl font-bold rank-silver">{leaderboard[1].score}</p>
              </div>
            )}

            {/* 1st place */}
            {leaderboard[0] && (
              <div className="glass-card p-6 text-center border-yellow-500/20 order-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent" />
                <div className="relative">
                  <div className="text-4xl mb-2">🥇</div>
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg shadow-amber-500/20">
                    {leaderboard[0].participantName.charAt(0)}
                  </div>
                  <h3 className="font-bold text-white mb-1">{leaderboard[0].participantName}</h3>
                  <p className="text-xs text-slate-500 mb-2">{leaderboard[0].teamName || 'Solo'}</p>
                  <p className="text-3xl font-bold rank-gold">{leaderboard[0].score}</p>
                </div>
              </div>
            )}

            {/* 3rd place */}
            {leaderboard[2] && (
              <div className="glass-card p-6 text-center mt-12 order-3">
                <div className="text-3xl mb-2">🥉</div>
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center text-white font-bold text-lg mb-3">
                  {leaderboard[2].participantName.charAt(0)}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{leaderboard[2].participantName}</h3>
                <p className="text-xs text-slate-500 mb-2">{leaderboard[2].teamName || 'Solo'}</p>
                <p className="text-2xl font-bold rank-bronze">{leaderboard[2].score}</p>
              </div>
            )}
          </div>

          {/* Full table */}
          <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Participant</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leaderboard.map((entry, index) => (
                    <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <span className={`text-lg font-bold ${index < 3 ? rankClasses[index] : 'text-slate-500'}`}>
                          {index < 3 ? medalEmojis[index] : `#${index + 1}`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-600' :
                            index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-500' :
                            index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-700' :
                            'bg-gradient-to-br from-indigo-500 to-purple-600'
                          }`}>
                            {entry.participantName.charAt(0)}
                          </div>
                          <span className="font-medium text-white">{entry.participantName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{entry.teamName || 'Solo'}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold text-lg ${index < 3 ? rankClasses[index] : 'text-slate-300'}`}>
                          {entry.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="glass-card p-16 text-center animate-fade-in-up">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-slate-400 text-lg">No results available for this event yet</p>
          <p className="text-slate-500 text-sm mt-2">Results will appear once the event is completed</p>
        </div>
      )}
    </div>
  )
}

export default LeaderboardPage
