import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Auth0Wrapper, useAuth0Context } from './features/auth/auth0.tsx'
import { routeTree } from './routeTree.gen.ts'

const queryClient = new QueryClient()
const initialAuthContext = {
  isAuthenticated: false,
  user: undefined,
  login: async () => {},
  logout: () => {},
  isLoading: true,
  getAccessToken: async () => undefined,
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    queryClient,
    auth: initialAuthContext,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth0Context()

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient, auth }} />
    </QueryClientProvider>
  )
}

function App() {
  return (
    <Auth0Wrapper>
      <InnerApp />
    </Auth0Wrapper>
  )
}

export default App
