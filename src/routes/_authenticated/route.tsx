import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (context.auth.isLoading) {
      return new Promise<never>(() => {})
    }

    if (!context.auth.isAuthenticated) {
      // Auth0 handles login redirects, so just trigger login
      console.log('User is not authenticated, redirecting to login...')
      context.auth.login()
      return new Promise<never>(() => {})
    }
    console.log('User is authenticated, proceeding to load route...')
  },
  component: () => <Outlet />,
})
