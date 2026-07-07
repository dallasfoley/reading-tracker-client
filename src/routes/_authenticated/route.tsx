import { RouteError } from '#/components/layout/RouteError'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    if (context.auth.isLoading) {
      return new Promise<never>(() => {})
    }

    if (!context.auth.isAuthenticated) {
      // Auth0 handles login redirects, so just trigger login
      console.log('User is not authenticated, redirecting to login...')
      await context.auth.login({
        appState: { returnTo: location.href },
      })
      return new Promise<never>(() => {})
    }
    console.log('User is authenticated, proceeding to load route...')
  },
  component: () => <Outlet />,
  errorComponent: ({ error, reset }) => (
    <RouteError error={error} reset={reset} title="Sign-in setup failed" />
  ),
})
