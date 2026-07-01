import TrustIndicators from './components/TrustIndicators'
import AuthButtons from './components/AuthButtons'
import HeroSection from './components/HeroSection'
import FloatingElements from './components/FloatingElements'

export default function HeroPage() {
  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,119,198,0.2),transparent_50%)]" />
      </div>

      <FloatingElements />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <HeroSection />
        <AuthButtons />
        <TrustIndicators />
      </div>
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-zinc-900 to-transparent pointer-events-none" />
    </main>
  )
}
