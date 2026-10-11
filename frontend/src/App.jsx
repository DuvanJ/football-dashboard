import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Header from './components/Header'
import StandingsTable from './components/StandingsTable'
import PointsChart from './components/PointsChart'
import StatsCards from './components/StatsCards'
import RecentMatches from './components/RecentMatches'
import Skeleton from './components/Skeleton'

function App() {
  const [liga, setLiga] = useState('PD')
  const [standings, setStandings] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const intervalRef = useRef(null)

  const cargarDatos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`http://localhost:8000/standings/${liga}`)
      setStandings(res.data.standings[0].table)

      const matchRes = await axios.get(`http://localhost:8000/matches/${liga}`)
      const todosLosPartidos = matchRes.data.matches || []
      const recientes = todosLosPartidos
        .filter(m => m.score.fullTime.home !== null)
        .slice(-8)
        .reverse()
      setMatches(recientes)

    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError('⚠️ Liga no permitida.')
            break
          case 403:
            setError('🔒 Esta liga no está disponible en el plan gratuito.')
            break
          case 404:
            setError('🔍 Liga no encontrada.')
            break
          case 429:
            setError('⏳ Demasiadas solicitudes. Esperá un momento e intentá de nuevo.')
            break
          case 500:
            setError('🔥 Error en el servidor. Intentá de nuevo más tarde.')
            break
          default:
            setError('❌ Error inesperado. Intentá de nuevo.')
        }
      } else if (err.request) {
        setError('📡 No se pudo conectar al servidor. Verificá que el backend esté corriendo.')
      } else {
        setError('❌ Error inesperado. Intentá de nuevo.')
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        cargarDatos()
      }, 60000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [autoRefresh, liga])

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        liga={liga}
        setLiga={setLiga}
        onCargar={cargarDatos}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
      />

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">

        {loading && <Skeleton />}

        {error && (
          <div className="bg-red-900 text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && standings.length > 0 && (
          <>
            <StatsCards standings={standings} />
            <PointsChart standings={standings} />
            <StandingsTable standings={standings} />
            <RecentMatches matches={matches} />
          </>
        )}

        {!loading && standings.length === 0 && !error && (
          <div className="text-center text-gray-500 py-20 text-xl">
            Seleccioná una liga y hacé clic en Cargar 👆
          </div>
        )}

      </div>
    </div>
  )
}

export default App