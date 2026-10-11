function Header({ liga, setLiga, onCargar, autoRefresh, setAutoRefresh }) {
  return (
    <div className="bg-zinc-950 border-b border-white/5 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8l2 4-2 4-2-4 2-4z" fill="white" stroke="none"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white text-base font-bold tracking-tight leading-none">Football Dashboard</h1>
            <p className="text-zinc-500 text-xs mt-0.5">Estadísticas en tiempo real</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:ml-auto">
          <select
            value={liga}
            onChange={(e) => setLiga(e.target.value)}
            className="bg-zinc-900 text-zinc-300 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all cursor-pointer hover:border-white/20"
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
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border active:scale-95 ${
              autoRefresh
                ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400'
                : 'bg-zinc-900 border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20'
            }`}
          >
            {autoRefresh ? '⟳ Auto ON' : '⏸ Auto OFF'}
          </button>

          <button
            onClick={onCargar}
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all duration-150 shadow-lg shadow-indigo-600/20"
          >
            Cargar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header