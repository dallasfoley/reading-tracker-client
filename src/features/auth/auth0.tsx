import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { createContext, useContext } from 'react'

type LoginOptions = Parameters<
  ReturnType<typeof useAuth0>['loginWithRedirect']
>[0]

export interface Auth0ContextType {
  isAuthenticated: boolean
  user: any
  login: (options?: LoginOptions) => Promise<void>
  logout: () => void
  isLoading: boolean
  getAccessToken: () => Promise<string | undefined>
}

const Auth0Context = createContext<Auth0ContextType | undefined>(undefined)

export function Auth0Wrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      onRedirectCallback={(appState) => {
        window.history.replaceState(
          {},
          document.title,
          appState?.returnTo || '/dashboard',
        )
      }}
    >
      <Auth0ContextProvider>{children}</Auth0ContextProvider>
    </Auth0Provider>
  )
}

function Auth0ContextProvider({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0()

  const contextValue = {
    isAuthenticated,
    user,
    login: loginWithRedirect,
    logout: () =>
      logout({ logoutParams: { returnTo: window.location.origin } }),
    isLoading,
    getAccessToken: () => getAccessTokenSilently(),
  }

  return (
    <Auth0Context.Provider value={contextValue}>
      {children}
    </Auth0Context.Provider>
  )
}

export function useAuth0Context() {
  const context = useContext(Auth0Context)
  if (context === undefined) {
    throw new Error('useAuth0Context must be used within Auth0Wrapper')
  }
  return context
}
