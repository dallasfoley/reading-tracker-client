export default function TrustIndicators() {
  return (
    <div className="mt-12 flex items-center justify-center space-x-8 mb-4 text-zinc-500 text-sm">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span>Free to use</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
        <span>Privacy focused</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
        <span>Easy to use</span>
      </div>
    </div>
  )
}
