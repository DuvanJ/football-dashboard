function Header({ liga, setLiga, onCargar, autoRefresh, setAutoRefresh }) {
  return (
    <div className="bg-gray-900 border-b border-gray-700 px-4 py-4 flex flex-col md:flex-row items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">⚽</span>
        <h1 className="text-white text-xl md:text-2xl font-bold">Football Dashboard</h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:ml-auto">
        <select
          value={liga}
          onChange={(e) => setLiga(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
        >
          <option value="PL">Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
          <option value="PD">La Liga 🇪🇸</option>
          <option value="BL1">Bundesliga 🇩🇪</option>
          <option value="SA">Serie A 🇮🇹</option>
          <option value="FL1">Ligue 1 🇫🇷</option>
          <option value="CL">Champions League 🏆</option>
          <option value="ELC">Championship 🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
          <option value="PPL">Primeira Liga 🇵🇹</option>
          <option value="DED">Eredivisie 🇳🇱</option>
          <option value="BSA">Brasileirão 🇧🇷</option>
          <option value="EC">European Championship 🇪🇺</option>
          <option value="WC">FIFA World Cup 🌍</option>
        </select>

        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
            autoRefresh
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          {autoRefresh ? '🔄 Auto ON' : '⏸️ Auto OFF'}
        </button>

        <button
          onClick={onCargar}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Cargar
        </button>
      </div>
    </div>
  )
}

export default Header