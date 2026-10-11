import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 800
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [value])

  return <span>{display}</span>
}

function StatsCards({ standings }) {
  const lider = standings[0]
  const ultimoLugar = standings[standings.length - 1]
  const mejorAtaque = [...standings].sort((a, b) => b.goalsFor - a.goalsFor)[0]
  const mejorDefensa = [...standings].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0]

  const cards = [
    {
      titulo: 'Líder',
      equipo: lider.team.shortName,
      dato: lider.points,
      unidad: 'pts',
      escudo: lider.team.crest,
      gradient: 'from-yellow-500/10 to-transparent',
      border: 'border-yellow-500/20',
      accent: 'text-yellow-400',
      dot: 'bg-yellow-500'
    },
    {
      titulo: 'Mejor ataque',
      equipo: mejorAtaque.team.shortName,
      dato: mejorAtaque.goalsFor,
      unidad: 'goles',
      escudo: mejorAtaque.team.crest,
      gradient: 'from-emerald-500/10 to-transparent',
      border: 'border-emerald-500/20',
      accent: 'text-emerald-400',
      dot: 'bg-emerald-500'
    },
    {
      titulo: 'Mejor defensa',
      equipo: mejorDefensa.team.shortName,
      dato: mejorDefensa.goalsAgainst,
      unidad: 'en contra',
      escudo: mejorDefensa.team.crest,
      gradient: 'from-blue-500/10 to-transparent',
      border: 'border-blue-500/20',
      accent: 'text-blue-400',
      dot: 'bg-blue-500'
    },
    {
      titulo: 'Último lugar',
      equipo: ultimoLugar.team.shortName,
      dato: ultimoLugar.points,
      unidad: 'pts',
      escudo: ultimoLugar.team.crest,
      gradient: 'from-red-500/10 to-transparent',
      border: 'border-red-500/20',
      accent: 'text-red-400',
      dot: 'bg-red-500'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.07,
            ease: [0.23, 1, 0.32, 1]
          }}
          className={`bg-gradient-to-br ${card.gradient} bg-zinc-900/50 border ${card.border} rounded-xl p-4 hover:scale-[1.02] transition-transform duration-200 cursor-default`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-1.5 h-1.5 rounded-full ${card.dot}`}></span>
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{card.titulo}</span>
          </div>
          <div className="flex items-center gap-3">
            <img src={card.escudo} alt={card.equipo} className="w-9 h-9 object-contain" />
            <div>
              <p className="text-zinc-300 font-semibold text-sm leading-tight">{card.equipo}</p>
              <p className={`${card.accent} text-2xl font-bold leading-none mt-0.5`}>
                <AnimatedNumber value={card.dato} />
                <span className="text-xs font-normal text-zinc-600 ml-1">{card.unidad}</span>
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsCards