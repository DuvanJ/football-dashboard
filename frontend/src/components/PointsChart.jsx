import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-zinc-500 text-xs mb-1">{label}</p>
        <p className="text-indigo-400 font-bold text-lg">
          {payload[0].value}
          <span className="text-xs text-zinc-600 font-normal ml-1">pts</span>
        </p>
      </div>
    )
  }
  return null
}

function PointsChart({ standings }) {
  const data = standings.slice(0, 10).map((equipo) => ({
    nombre: equipo.team.shortName || equipo.team.name,
    puntos: equipo.points,
  }))

  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
      <div className="mb-5">
        <h2 className="text-white text-base font-semibold">Top 10 por puntos</h2>
        <p className="text-zinc-500 text-xs mt-0.5">Equipos con mejor rendimiento</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barSize={28}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
              <stop offset="100%" stopColor="#4338ca" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
          <XAxis
            dataKey="nombre"
            tick={{ fill: '#52525b', fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            height={60}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#52525b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="puntos" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PointsChart