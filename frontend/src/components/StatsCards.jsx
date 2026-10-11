function StatsCards({ standings }) {
  const lider = standings[0]
  const ultimoLugar = standings[standings.length - 1]
  const mejorAtaque = [...standings].sort((a, b) => b.goalsFor - a.goalsFor)[0]
  const mejorDefensa = [...standings].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0]

  const cards = [
    {
      titulo: '🏆 Líder',
      equipo: lider.team.shortName,
      dato: `${lider.points} pts`,
      escudo: lider.team.crest,
      color: 'border-yellow-500'
    },
    {
      titulo: '⚽ Mejor ataque',
      equipo: mejorAtaque.team.shortName,
      dato: `${mejorAtaque.goalsFor} goles`,
      escudo: mejorAtaque.team.crest,
      color: 'border-green-500'
    },
    {
      titulo: '🛡️ Mejor defensa',
      equipo: mejorDefensa.team.shortName,
      dato: `${mejorDefensa.goalsAgainst} goles en contra`,
      escudo: mejorDefensa.team.crest,
      color: 'border-blue-500'
    },
    {
      titulo: '📉 Último lugar',
      equipo: ultimoLugar.team.shortName,
      dato: `${ultimoLugar.points} pts`,
      escudo: ultimoLugar.team.crest,
      color: 'border-red-500'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`bg-gray-800 rounded-xl p-4 border-t-4 ${card.color} flex flex-col items-center gap-2`}
        >
          <p className="text-gray-400 text-sm font-medium">{card.titulo}</p>
          <img src={card.escudo} alt={card.equipo} className="w-10 h-10 object-contain" />
          <p className="text-white font-bold text-center">{card.equipo}</p>
          <p className="text-gray-300 text-sm">{card.dato}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsCards