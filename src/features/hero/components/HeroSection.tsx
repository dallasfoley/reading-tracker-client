import Heading from './Heading'

export default function HeroSection() {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      {/* Book Icon */}
      <div className="my-8 flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg">
            {/* <MdMenuBook className="w-8 h-8 text-white" /> */}
          </div>
        </div>
      </div>

      <Heading />

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-zinc-300 mb-4 max-w-2xl mx-auto leading-relaxed">
        Transform your reading journey with intelligent tracking
      </p>

      <p className="text-lg text-zinc-400 mb-12 max-w-xl mx-auto">
        Discover, track, and celebrate every book you read with our beautiful
        and intuitive platform
      </p>
    </div>
  )
}
