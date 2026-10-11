function RecentMatches({ matches }) {
  if (!matches || matches.length === 0) return null

  return (
    <div className="bg-gray-800 rounded-xl p-4 md:p-6">
      <h2 className="text-white text-lg font-semibold mb-4">📅 Últimos partidos</h2>
      <div className="flex flex-col gap-2">
        {matches.slice(0, 8).map((match) => (
          <div
            key={match.id}
            className="bg-gray-700 rounded-lg px-3 py-3 grid grid-cols-3 items-center gap-2"
          >
            {/* Equipo local */}
            <div className="flex items-center gap-2 justify-end">
              <span className="text-white text-xs font-medium text-right leading-tight">
                {match.homeTeam.shortName}
              </span>
              <img
                src={match.homeTeam.crest}
                alt={match.homeTeam.shortName}
                className="w-5 h-5 object-contain shrink-0"
              />
            </div>

            {/* Marcador */}
            <div className="flex justify-center">
              <span className="bg-gray-900 text-white font-bold px-2 py-1 rounded text-xs text-center">
                {match.score.fullTime.home ?? '-'} - {match.score.fullTime.away ?? '-'}
              </span>
            </div>

            {/* Equipo visitante */}
            <div className="flex items-center gap-2 justify-start">
              <img
                src={match.awayTeam.crest}
                alt={match.awayTeam.shortName}
                className="w-5 h-5 object-contain shrink-0"
              />
              <span className="text-white text-xs font-medium leading-tight">
                {match.awayTeam.shortName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentMatches