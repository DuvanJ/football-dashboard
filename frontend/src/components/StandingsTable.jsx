function StandingsTable({ standings }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-700 text-gray-300 text-sm uppercase">
            <th className="px-3 py-3 text-left">Pos</th>
            <th className="px-3 py-3 text-left">Equipo</th>
            <th className="px-3 py-3 text-center hidden md:table-cell">PJ</th>
            <th className="px-3 py-3 text-center hidden md:table-cell">G</th>
            <th className="px-3 py-3 text-center hidden md:table-cell">E</th>
            <th className="px-3 py-3 text-center hidden md:table-cell">P</th>
            <th className="px-3 py-3 text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((equipo, index) => (
            <tr
              key={equipo.team.id}
              className={`border-t border-gray-700 hover:bg-gray-700 transition-colors ${
                index < 4 ? 'border-l-4 border-l-blue-500' :
                index < 6 ? 'border-l-4 border-l-green-500' :
                index >= standings.length - 3 ? 'border-l-4 border-l-red-500' :
                'border-l-4 border-l-transparent'
              }`}
            >
              <td className="px-3 py-3 text-gray-300 font-semibold">
                {equipo.position}
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <img
                    src={equipo.team.crest}
                    alt={equipo.team.name}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-white font-medium text-sm">
                    {equipo.team.shortName || equipo.team.name}
                  </span>
                </div>
              </td>
              <td className="px-3 py-3 text-center text-gray-300 hidden md:table-cell">
                {equipo.playedGames}
              </td>
              <td className="px-3 py-3 text-center text-green-400 hidden md:table-cell">
                {equipo.won}
              </td>
              <td className="px-3 py-3 text-center text-gray-300 hidden md:table-cell">
                {equipo.draw}
              </td>
              <td className="px-3 py-3 text-center text-red-400 hidden md:table-cell">
                {equipo.lost}
              </td>
              <td className="px-3 py-3 text-center text-white font-bold">
                {equipo.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StandingsTable