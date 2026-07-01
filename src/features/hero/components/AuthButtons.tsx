import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import GithubIcon from './auth-button-components/GitHubIcon'
import GoogleIcon from './auth-button-components/GoogleIcon'
import SvgArrow from './auth-button-components/SvgArrow'
import { useAuth0 } from '@auth0/auth0-react'

export default function AuthButtons() {
  const { loginWithRedirect, isLoading } = useAuth0()
  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <Button
        onClick={() =>
          loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })
        }
        className="w-full h-12 text-lg font-semibold bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? (
          <Spinner className="w-5 h-5 text-white" />
        ) : (
          <>
            Sign up
            <SvgArrow />
          </>
        )}
      </Button>

      <div className="flex space-x-3">
        <Button
          onClick={() =>
            loginWithRedirect({ authorizationParams: { connection: 'github' } })
          }
          className="flex-1 h-11 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 border border-zinc-600/50 hover:border-zinc-500/50 backdrop-blur-sm transition-all duration-300"
        >
          {isLoading ? (
            <Spinner className="w-5 h-5 text-white" />
          ) : (
            <>
              Login with GitHub
              <GithubIcon color="#ffffff" />
            </>
          )}
        </Button>

        <Button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: { connection: 'google-oauth2' },
            })
          }
          className="flex-1 h-11 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 border border-zinc-600/50 hover:border-zinc-500/50 backdrop-blur-sm transition-all duration-300"
        >
          Login with Google
          <GoogleIcon />
        </Button>
      </div>
    </div>
  )
}
