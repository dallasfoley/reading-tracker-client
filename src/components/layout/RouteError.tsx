import { Button } from '#/components/ui/button'
import { ApiError } from '#/lib/api'
import { Link } from '@tanstack/react-router'

interface RouteErrorProps {
  error: unknown
  reset?: () => void
  title?: string
}

function getErrorCopy(error: unknown) {
  if (error instanceof ApiError) {
    if (error.isNetworkError) {
      return {
        title: 'API connection failed',
        message: error.message,
        detail:
          error.details ??
          'The browser could not complete the request. The API may be stopped, unreachable, or blocked by CORS.',
      }
    }

    return {
      title: error.status ? `Request failed (${error.status})` : 'Request failed',
      message: error.message,
      detail: error.details,
    }
  }

  if (error instanceof Error) {
    return {
      title: 'Something went wrong',
      message: error.message,
      detail: undefined,
    }
  }

  return {
    title: 'Something went wrong',
    message: 'An unexpected error occurred.',
    detail: undefined,
  }
}

export function RouteError({ error, reset, title }: RouteErrorProps) {
  const copy = getErrorCopy(error)

  return (
    <main className="dark flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <section className="w-full max-w-xl rounded-lg border border-border bg-card p-6 shadow-2xl shadow-black/20">
        <p className="text-sm font-medium text-muted-foreground">
          {title ?? 'Reading Tracker'}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-normal">
          {copy.title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {copy.message}
        </p>
        {copy.detail ? (
          <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-background p-3 text-xs leading-5 text-muted-foreground">
            {copy.detail}
          </pre>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {reset ? (
            <Button type="button" onClick={reset}>
              Try again
            </Button>
          ) : null}
          <Button variant="outline" asChild>
            <Link to="/">Back to sign in</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
