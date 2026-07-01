import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '#/components/ui/card'
import { Route } from '#/routes/_authenticated/dashboard'
import { Link } from '@tanstack/react-router'
import { Suspense } from 'react'
import { useAuth0Context } from '../auth/auth0'

export default function DashboardPage() {
  const { user } = useAuth0Context()
  const { userbooks } = Route.useLoaderData()
  return (
    <main className="container flex flex-col items-center mx-auto py-8">
      <div className="mb-8">
        <Suspense fallback={<UserGreetingSkeleton />}>
          <h1 className="text-3xl text-center font-bold text-zinc-200">
            Welcome back
          </h1>
        </Suspense>
      </div>
      <Card className="p-2 md:p-4 max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <CardHeader>
          <h3 className="text-4xl font-semibold text-center">
            Your Reading List
          </h3>
        </CardHeader>
        <CardDescription className="text-xl text-center">
          Here you can manage your reading list, add new books, and track your
          progress.
        </CardDescription>
        <div className="flex justify-center">
          <Button className="max-w-48" asChild>
            <Link to="/browse">
              <h4>Browse Books</h4>
            </Link>
          </Button>
        </div>
        <CardContent>
          <Suspense fallback={<UserBooksListSkeleton />}>
            UserBooksList
            {/* <UserBooksList /> */}
          </Suspense>
        </CardContent>
      </Card>
    </main>
  )
}

// Skeleton components for loading states
function UserGreetingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 bg-zinc-700 rounded w-64 mx-auto"></div>
    </div>
  )
}

function UserBooksListSkeleton() {
  return (
    <div className="animate-pulse">
      <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="h-48 bg-zinc-700 rounded"></li>
        ))}
      </ul>
    </div>
  )
}
