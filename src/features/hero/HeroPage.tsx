import TrustIndicators from './components/TrustIndicators'
import AuthButtons from './components/AuthButtons'
import HeroSection from './components/HeroSection'
import FloatingElements from './components/FloatingElements'

export default function HeroPage() {
  return (
    <main className="dark relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-zinc-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.22),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.16),transparent_50%)]" />
      </div>

      <FloatingElements />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <HeroSection />
        <AuthButtons />
        <TrustIndicators />
      </div>
      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-zinc-950 to-transparent" />
    </main>
  )
}
