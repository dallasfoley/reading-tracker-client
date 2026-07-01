import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface AuthenticatedPageProps {
  eyebrow?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    to: '/browse' | '/dashboard'
  }
  children: ReactNode
  className?: string
}

export function AuthenticatedPage({
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}: AuthenticatedPageProps) {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className={cn('mx-auto flex w-full max-w-6xl flex-col gap-6', className)}>
        <header className="flex flex-col gap-4 border-b border-zinc-800 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow ? (
              <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                {eyebrow}
              </div>
            ) : null}
            <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
            {description ? (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                {description}
              </p>
            ) : null}
          </div>
          {action ? (
            <Button variant="outline" asChild>
              <Link to={action.to}>{action.label}</Link>
            </Button>
          ) : null}
        </header>
        {children}
      </div>
    </main>
  )
}
