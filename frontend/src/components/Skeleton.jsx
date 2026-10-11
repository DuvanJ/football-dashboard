function Skeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">

      {/* Skeleton de la gráfica */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="h-4 w-32 bg-gray-700 rounded mb-6"></div>
        <div className="flex items-end gap-3 h-48">
          {[60, 90, 75, 85, 70, 65, 80, 55, 72, 68].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-700 rounded-t"
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Skeleton de la tabla */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="bg-gray-700 px-4 py-3 flex gap-4">
          <div className="h-3 w-8 bg-gray-600 rounded"></div>
          <div className="h-3 w-32 bg-gray-600 rounded"></div>
          <div className="h-3 w-8 bg-gray-600 rounded ml-auto"></div>
        </div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="px-4 py-3 border-t border-gray-700 flex items-center gap-4">
            <div className="h-3 w-4 bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
            <div className="h-3 w-40 bg-gray-700 rounded"></div>
            <div className="h-3 w-6 bg-gray-700 rounded ml-auto"></div>
            <div className="h-3 w-6 bg-gray-700 rounded"></div>
            <div className="h-3 w-6 bg-gray-700 rounded"></div>
            <div className="h-3 w-6 bg-gray-700 rounded"></div>
            <div className="h-4 w-8 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Skeleton