function RecentMatches({ matches }) {
  if (!matches || matches.length === 0) return null

  const getStyles = (home, away) => {
    if (home > away) return { home: 'text-white font-bold', away: 'text-zinc-600' }
    if (away > home) return { home: 'text-zinc-600', away: 'text-white font-bold' }
    return { home: 'text-amber-400', away: 'text-amber-400' }
  }

  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
      <div className="mb-5">
        <h2 className="text-white text-base font-semibold">Últimos partidos</h2>
        <p className="text-zinc-500 text-xs mt-0.5">Resultados recientes</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {matches.slice(0, 8).map((match) => {
          const home = match.score.fullTime.home
          const away = match.score.fullTime.away
          const styles = getStyles(home, away)
          return (
            <div
              key={match.id}
              className="bg-zinc-800/30 hover:bg-zinc-800/60 border border-white/[0.04] rounded-lg px-4 py-3 grid grid-cols-3 items-center gap-2 transition-colors"
            >
              <div className="flex items-center gap-2 justify-end">
                <span className={`text-xs ${styles.home} text-right leading-tight`}>
                  {match.homeTeam.shortName}
                </span>
                <img src={match.homeTeam.crest} alt="" className="w-5 h-5 object-contain shrink-0"/>
              </div>
              <div className="flex justify-center">
                <span className="bg-zinc-900 border border-white/10 rounded-md px-3 py-1 text-white font-bold text-xs tabular-nums">
                  {home} - {away}
                </span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <img src={match.awayTeam.crest} alt="" className="w-5 h-5 object-contain shrink-0"/>
                <span className={`text-xs ${styles.away} leading-tight`}>
                  {match.awayTeam.shortName}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentMatches