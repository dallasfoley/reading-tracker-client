import { Suspense } from 'react'
import { useAuth0Context } from '../auth/auth0'
import { Route } from '#/routes/_authenticated/dashboard'

export default function UserGreeting() {
  const { user } = useAuth0Context()
  const { appUser } = Route.useLoaderData()
  const displayName =
    user?.name ??
    user?.nickname ??
    (appUser.email.endsWith('@placeholder.local') ? 'reader' : appUser.email)

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 px-4 py-3">
      <Suspense fallback={<UserGreetingSkeleton />}>
        <h2 className="text-lg font-medium text-zinc-100">
          Welcome back, {displayName}
        </h2>
      </Suspense>
    </div>
  )
}

function UserGreetingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-64 rounded bg-zinc-700"></div>
    </div>
  )
}
