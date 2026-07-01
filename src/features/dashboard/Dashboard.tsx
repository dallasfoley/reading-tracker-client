import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '#/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Suspense } from 'react'
import UserbooksList from './UserbooksList'

export default function Dashboard() {
  return (
    <Card className="rounded-lg border-zinc-800 bg-zinc-900/70 p-1">
      <CardHeader className="gap-3 md:flex md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-zinc-100">
            Reading List
          </h3>
          <CardDescription className="mt-1 text-zinc-400">
            Update status, page progress, and ratings from one place.
          </CardDescription>
        </div>
        <Button className="w-fit" size="sm" asChild>
          <Link to="/browse">
            Browse Books
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <Suspense fallback={<UserBooksListSkeleton />}>
          <UserbooksList />
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
          <li key={i} className="h-56 rounded-lg bg-zinc-800"></li>
        ))}
      </ul>
    </div>
  )
}
