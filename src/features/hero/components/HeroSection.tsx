import Heading from './Heading'

export default function HeroSection() {
  return (
    <div className="max-w-4xl mx-auto mb-12">
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
