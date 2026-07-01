import { Button } from '#/components/ui/button'
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from '#/components/ui/card'
import { Route } from '#/routes/_authenticated/dashboard'
import { Link } from '@tanstack/react-router'
import { Suspense } from 'react'

export default function Dashboard() {
  const { userbooks } = Route.useLoaderData()
  return (
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
          {userbooks.length} books in your list
          {/* <UserBooksList /> */}
        </Suspense>
      </CardContent>
    </Card>
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
