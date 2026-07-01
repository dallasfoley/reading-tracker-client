export default function FeatureHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
      <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-4 text-center hover:bg-zinc-800/50 transition-all duration-300">
        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
          <span className="text-blue-400 text-sm">📚</span>
        </div>
        <h3 className="text-white font-semibold mb-1">Track Progress</h3>
        <p className="text-zinc-400 text-sm">Monitor your reading journey</p>
      </div>

      <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-4 text-center hover:bg-zinc-800/50 transition-all duration-300">
        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
          <span className="text-purple-400 text-sm">🎯</span>
        </div>
        <h3 className="text-white font-semibold mb-1">Set Goals</h3>
        <p className="text-zinc-400 text-sm">Achieve your reading targets</p>
      </div>

      <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-4 text-center hover:bg-zinc-800/50 transition-all duration-300">
        <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
          <span className="text-cyan-400 text-sm">📊</span>
        </div>
        <h3 className="text-white font-semibold mb-1">Analytics</h3>
        <p className="text-zinc-400 text-sm">Insights into your habits</p>
      </div>
    </div>
  )
}
