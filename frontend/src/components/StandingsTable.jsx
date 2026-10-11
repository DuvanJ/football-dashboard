import { motion } from 'motion/react'

function StandingsTable({ standings }) {
  const getZone = (index, total) => {
    if (index < 4) return { border: 'border-l-indigo-500', pos: 'bg-indigo-500/10 text-indigo-400' }
    if (index < 6) return { border: 'border-l-emerald-500', pos: 'bg-emerald-500/10 text-emerald-400' }
    if (index >= total - 3) return { border: 'border-l-red-500', pos: 'bg-red-500/10 text-red-400' }
    return { border: 'border-l-transparent', pos: 'bg-zinc-800/50 text-zinc-500' }
  }

  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-5">
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>Champions
        </span>
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Europa
        </span>
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Descenso
        </span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-zinc-600 text-xs uppercase tracking-wider border-b border-white/5">
            <th className="px-4 py-3 text-left w-14">Pos</th>
            <th className="px-4 py-3 text-left">Equipo</th>
            <th className="px-4 py-3 text-center hidden md:table-cell">PJ</th>
            <th className="px-4 py-3 text-center hidden md:table-cell">G</th>
            <th className="px-4 py-3 text-center hidden md:table-cell">E</th>
            <th className="px-4 py-3 text-center hidden md:table-cell">P</th>
            <th className="px-4 py-3 text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((equipo, index) => {
            const zone = getZone(index, standings.length)
            return (
              <motion.tr
                key={equipo.team.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className={`border-t border-white/[0.03] border-l-2 ${zone.border} hover:bg-white/[0.02] transition-colors group`}
              >
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${zone.pos}`}>
                    {equipo.position}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <img src={equipo.team.crest} alt="" className="w-5 h-5 object-contain" />
                    <span className="text-zinc-300 text-sm font-medium group-hover:text-white transition-colors">
                      {equipo.team.shortName || equipo.team.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-zinc-500 text-sm hidden md:table-cell">{equipo.playedGames}</td>
                <td className="px-4 py-3 text-center text-emerald-500 text-sm font-medium hidden md:table-cell">{equipo.won}</td>
                <td className="px-4 py-3 text-center text-zinc-500 text-sm hidden md:table-cell">{equipo.draw}</td>
                <td className="px-4 py-3 text-center text-red-500 text-sm font-medium hidden md:table-cell">{equipo.lost}</td>
                <td className="px-4 py-3 text-center">
                  <span className="text-white font-bold text-sm">{equipo.points}</span>
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StandingsTable