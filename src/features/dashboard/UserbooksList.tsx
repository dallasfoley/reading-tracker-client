import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Select } from '#/components/ui/select'
import { Spinner } from '#/components/ui/spinner'
import {
  updateUserBookCurrentPage,
  updateUserBookRating,
  updateUserBookStatus,
} from '#/features/books/books.api'
import type { ReadingStatus, UserBook } from '#/features/books/book.types'
import { useAuth0Context } from '#/features/auth/auth0'
import { Route } from '#/routes/_authenticated/dashboard'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BookOpen, Save, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const statusOptions: Array<{ label: string; value: ReadingStatus }> = [
  { label: 'Not Started', value: 'NOT_STARTED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Completed', value: 'COMPLETED' },
]

export default function UserbooksList() {
  const { userbooks } = Route.useLoaderData()

  if (userbooks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-700 p-8 text-center">
        <BookOpen className="mx-auto mb-3 size-8 text-zinc-500" />
        <h4 className="text-lg font-medium text-zinc-100">No books yet</h4>
        <p className="mt-1 text-sm text-zinc-400">
          Browse for a book and add it to start tracking your reading.
        </p>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {userbooks.map((userbook) => (
        <UserBookCard key={userbook.id} userbook={userbook} />
      ))}
    </ul>
  )
}

function UserBookCard({ userbook }: { userbook: UserBook }) {
  const { getAccessToken } = useAuth0Context()
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<ReadingStatus>(userbook.status)
  const [currentPage, setCurrentPage] = useState(
    String(userbook.currentPage ?? 0),
  )
  const [rating, setRating] = useState(
    userbook.userRating ? String(userbook.userRating) : '',
  )

  useEffect(() => {
    setStatus(userbook.status)
    setCurrentPage(String(userbook.currentPage ?? 0))
    setRating(userbook.userRating ? String(userbook.userRating) : '')
  }, [userbook])

  async function getToken() {
    const token = await getAccessToken()
    if (!token) {
      throw new Error('Unable to get access token')
    }
    return token
  }

  function refreshUserBooks() {
    queryClient.invalidateQueries({ queryKey: ['userbooks'] })
  }

  const statusMutation = useMutation({
    mutationFn: async (nextStatus: ReadingStatus) => {
      return updateUserBookStatus(userbook.bookId, nextStatus, await getToken())
    },
    onSuccess: (updatedUserBook) => {
      setStatus(updatedUserBook.status)
      refreshUserBooks()
    },
  })

  const pageMutation = useMutation({
    mutationFn: async () => {
      return updateUserBookCurrentPage(
        userbook.bookId,
        normalizeWholeNumber(currentPage),
        await getToken(),
      )
    },
    onSuccess: (updatedUserBook) => {
      setCurrentPage(String(updatedUserBook.currentPage ?? 0))
      refreshUserBooks()
    },
  })

  const ratingMutation = useMutation({
    mutationFn: async (nextRating: number) => {
      return updateUserBookRating(userbook.bookId, nextRating, await getToken())
    },
    onSuccess: (updatedUserBook) => {
      setRating(
        updatedUserBook.userRating ? String(updatedUserBook.userRating) : '',
      )
      refreshUserBooks()
    },
  })

  function handleStatusChange(nextStatus: ReadingStatus) {
    setStatus(nextStatus)
    statusMutation.mutate(nextStatus)
  }

  function handleRatingChange(nextRating: string) {
    setRating(nextRating)
    ratingMutation.mutate(Number(nextRating))
  }

  const error =
    statusMutation.error?.message ??
    pageMutation.error?.message ??
    ratingMutation.error?.message

  return (
    <li className="grid gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 sm:grid-cols-[6rem_1fr]">
      {userbook.bookCoverUrl ? (
        <img
          alt={`${userbook.bookTitle} cover`}
          className="h-36 w-24 rounded-md object-cover ring-1 ring-zinc-700"
          src={userbook.bookCoverUrl}
        />
      ) : (
        <div className="flex h-36 w-24 items-center justify-center rounded-md bg-zinc-800 ring-1 ring-zinc-700">
          <BookOpen className="size-7 text-zinc-500" />
        </div>
      )}

      <div className="min-w-0">
        <div className="flex flex-col gap-1">
          <h4 className="line-clamp-2 font-medium text-zinc-100">
            {userbook.bookTitle}
          </h4>
          <p className="line-clamp-1 text-sm text-zinc-400">
            {userbook.bookAuthor}
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Label>
            Status
            <Select
              className="border-zinc-700 bg-zinc-950 text-zinc-100"
              disabled={statusMutation.isPending}
              onChange={(event) =>
                handleStatusChange(event.target.value as ReadingStatus)
              }
              value={status}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Label>

          <Label>
            Current Page
            <div className="flex gap-2">
              <Input
                className="min-w-0 flex-1 border-zinc-700 bg-zinc-950 text-zinc-100"
                inputMode="numeric"
                min={0}
                onChange={(event) => setCurrentPage(event.target.value)}
                type="number"
                value={currentPage}
              />
              <Button
                aria-label={`Save current page for ${userbook.bookTitle}`}
                disabled={pageMutation.isPending}
                onClick={() => pageMutation.mutate()}
                size="icon"
                type="button"
              >
                {pageMutation.isPending ? <Spinner /> : <Save />}
              </Button>
            </div>
          </Label>
        </div>

        {status === 'COMPLETED' ? (
          <Label className="mt-3">
            Rating
            <div className="flex flex-wrap gap-1">
              {[1, 2, 3, 4, 5].map((ratingOption) => {
                const isSelected = Number(rating) >= ratingOption
                return (
                  <Button
                    aria-label={`Rate ${userbook.bookTitle} ${ratingOption} stars`}
                    className="text-zinc-400 data-[selected=true]:text-yellow-300"
                    data-selected={isSelected}
                    disabled={ratingMutation.isPending}
                    key={ratingOption}
                    onClick={() => handleRatingChange(String(ratingOption))}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Star className={isSelected ? 'fill-current' : ''} />
                  </Button>
                )
              })}
            </div>
          </Label>
        ) : null}

        {error ? (
          <p className="mt-3 rounded-md border border-red-900/70 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}
      </div>
    </li>
  )
}

function normalizeWholeNumber(value: string) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0
  }
  return Math.floor(parsed)
}
