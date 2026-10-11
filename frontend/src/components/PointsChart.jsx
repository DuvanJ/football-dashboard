import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function PointsChart({ standings }) {
  const data = standings.slice(0, 10).map((equipo) => ({
    nombre: equipo.team.shortName || equipo.team.name,
    puntos: equipo.points,
  }))

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-white text-lg font-semibold mb-4">
        📊 Top 10 — Puntos
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="nombre"
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fill: '#9CA3AF' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Bar dataKey="puntos" fill="#22C55E" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PointsChart