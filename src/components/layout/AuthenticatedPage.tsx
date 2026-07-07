import { Button } from '#/components/ui/button'
import { useAuth0Context } from '#/features/auth/auth0'
import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
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
  const { logout } = useAuth0Context()

  return (
    <main className="dark min-h-screen bg-background px-4 py-8 text-foreground">
      <div
        className={cn(
          'mx-auto flex w-full max-w-6xl flex-col gap-6',
          className,
        )}
      >
        <header className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow ? (
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                {eyebrow}
              </div>
            ) : null}
            <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
            {description ? (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {action ? (
              <Button asChild>
                <Link to={action.to}>{action.label}</Link>
              </Button>
            ) : null}
            <Button type="button" variant="outline" onClick={logout}>
              <LogOut />
              Log out
            </Button>
          </div>
        </header>
        {children}
      </div>
    </main>
  )
}
