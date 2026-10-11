import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import axios from 'axios'
import Header from './components/Header'
import StandingsTable from './components/StandingsTable'
import PointsChart from './components/PointsChart'
import StatsCards from './components/StatsCards'
import RecentMatches from './components/RecentMatches'
import Skeleton from './components/Skeleton'

const API_URL = 'https://football-dashboard-production.up.railway.app'

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
    setStandings([])
    try {
      const res = await axios.get(`${API_URL}/standings/${liga}`)
      setStandings(res.data.standings[0].table)
      const matchRes = await axios.get(`${API_URL}/matches/${liga}`)
      const todosLosPartidos = matchRes.data.matches || []
      const recientes = todosLosPartidos
        .filter(m => m.score.fullTime.home !== null)
        .slice(-8)
        .reverse()
      setMatches(recientes)
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400: setError('⚠️ Liga no permitida.'); break
          case 403: setError('🔒 Esta liga no está disponible en el plan gratuito.'); break
          case 404: setError('🔍 Liga no encontrada.'); break
          case 429: setError('⏳ Demasiadas solicitudes. Esperá un momento.'); break
          case 500: setError('🔥 Error en el servidor. Intentá de nuevo más tarde.'); break
          default: setError('❌ Error inesperado. Intentá de nuevo.')
        }
      } else if (err.request) {
        setError('📡 No se pudo conectar al servidor.')
      } else {
        setError('❌ Error inesperado. Intentá de nuevo.')
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(cargarDatos, 60000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [autoRefresh, liga])

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header
        liga={liga}
        setLiga={setLiga}
        onCargar={cargarDatos}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
      />

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">

        {loading && <Skeleton />}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && standings.length > 0 && (
          <>
            <StatsCards standings={standings} />
            <PointsChart standings={standings} />
            <StandingsTable standings={standings} />
            <RecentMatches matches={matches} />
          </>
        )}

        {!loading && standings.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-600 py-20 text-base"
          >
            Seleccioná una liga y hacé clic en Cargar
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default App