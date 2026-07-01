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
    <div className="mb-8">
      <Suspense fallback={<UserGreetingSkeleton />}>
        <h1 className="text-3xl text-center font-bold text-zinc-200">
          Welcome back, {displayName}
        </h1>
      </Suspense>
    </div>
  )
}

function UserGreetingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 bg-zinc-700 rounded w-64 mx-auto"></div>
    </div>
  )
}
