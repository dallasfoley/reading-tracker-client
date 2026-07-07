import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import GithubIcon from './auth-button-components/GitHubIcon'
import GoogleIcon from './auth-button-components/GoogleIcon'
import SvgArrow from './auth-button-components/SvgArrow'
import { Mail } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'

function AuthCallbackError() {
  const searchParams = new URLSearchParams(window.location.search)
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (!error && !errorDescription) {
    return null
  }

  return (
    <div className="rounded-lg border border-red-400/30 bg-red-950/60 px-4 py-3 text-left text-sm text-red-100">
      <p className="font-medium">Auth0 could not start sign in.</p>
      <p className="mt-1 text-red-100/80">
        {errorDescription ?? error ?? 'Try another sign-in method.'}
      </p>
    </div>
  )
}

export default function AuthButtons() {
  const { loginWithRedirect, isLoading } = useAuth0()
  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <AuthCallbackError />
      <Button
        onClick={() => loginWithRedirect()}
        className="h-12 w-full border-0 bg-white text-lg font-semibold text-zinc-950 shadow-lg shadow-black/20 hover:bg-zinc-200"
      >
        {isLoading ? (
          <Spinner className="h-5 w-5 text-zinc-950" />
        ) : (
          <>
            Get Started
            <SvgArrow />
          </>
        )}
      </Button>

      <Button
        onClick={() =>
          loginWithRedirect({ authorizationParams: { connection: 'email' } })
        }
        className="h-11 w-full border-white/15 bg-white/10 text-zinc-100 backdrop-blur-sm hover:bg-white/15"
        variant="outline"
      >
        {isLoading ? (
          <Spinner className="h-5 w-5 text-white" />
        ) : (
          <>
            Continue with email
            <Mail />
          </>
        )}
      </Button>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() =>
            loginWithRedirect({ authorizationParams: { connection: 'github' } })
          }
          className="h-11 flex-1 border-white/15 bg-white/10 text-zinc-100 backdrop-blur-sm hover:bg-white/15"
          variant="outline"
        >
          {isLoading ? (
            <Spinner className="h-5 w-5 text-white" />
          ) : (
            <>
              Login with GitHub
              <GithubIcon className="ml-1 size-6" color="#ffffff" size={24} />
            </>
          )}
        </Button>

        <Button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: { connection: 'google-oauth2' },
            })
          }
          className="h-11 flex-1 border-white/15 bg-white/10 text-zinc-100 backdrop-blur-sm hover:bg-white/15"
          variant="outline"
        >
          Login with Google
          <GoogleIcon className="ml-1 size-6" size={24} />
        </Button>
      </div>
    </div>
  )
}
