import { AuthenticatedPage } from '#/components/layout/AuthenticatedPage'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'
import { addUserBook, searchBooks } from '#/features/books/books.api'
import type { Book } from '#/features/books/book.types'
import { useAuth0Context } from '#/features/auth/auth0'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, LibraryBig, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

export default function BrowsePage() {
  const { getAccessToken } = useAuth0Context()
  const queryClient = useQueryClient()
  const [searchText, setSearchText] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')

  const searchQuery = useQuery({
    queryKey: ['books', 'search', submittedQuery],
    enabled: submittedQuery.length > 1,
    queryFn: async () => {
      const token = await getAccessToken()
      if (!token) {
        throw new Error('Unable to get access token')
      }
      return searchBooks(submittedQuery, token)
    },
  })

  const addBookMutation = useMutation({
    mutationFn: async (book: Book) => {
      if (!book.openLibraryKey) {
        throw new Error('This search result cannot be added')
      }

      const token = await getAccessToken()
      if (!token) {
        throw new Error('Unable to get access token')
      }

      return addUserBook(
        {
          openLibraryKey: book.openLibraryKey,
          status: 'NOT_STARTED',
          currentPage: 0,
        },
        token,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userbooks'] })
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextQuery = searchText.trim()
    if (nextQuery.length > 1) {
      setSubmittedQuery(nextQuery)
    }
  }

  return (
    <AuthenticatedPage
      action={{ label: 'Back to Dashboard', to: '/dashboard' }}
      description="Search Open Library and add a title directly to your reading list."
      eyebrow={
        <>
          <LibraryBig className="size-4" />
          Browse Library
        </>
      }
      title="Find Your Next Book"
    >
      <form
        className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3 shadow-sm sm:flex-row"
        onSubmit={handleSubmit}
      >
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-10 pl-9"
            placeholder="Search by title, author, or keyword"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </label>
        <Button
          className="h-10"
          type="submit"
          disabled={searchText.trim().length < 2}
        >
          {searchQuery.isFetching ? <Spinner /> : <Search />}
          Search
        </Button>
      </form>

      {addBookMutation.isError ? (
        <p className="rounded-md border border-red-900/70 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {addBookMutation.error.message}
        </p>
      ) : null}

      <section>
        {submittedQuery.length === 0 ? (
          <EmptySearchState />
        ) : searchQuery.isLoading ? (
          <SearchSkeleton />
        ) : searchQuery.isError ? (
          <p className="rounded-md border border-red-900/70 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {searchQuery.error.message}
          </p>
        ) : searchQuery.data?.length ? (
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {searchQuery.data.map((book) => (
              <BookSearchResult
                key={book.openLibraryKey ?? `${book.title}-${book.author}`}
                book={book}
                isAdding={
                  addBookMutation.isPending &&
                  addBookMutation.variables.openLibraryKey ===
                    book.openLibraryKey
                }
                onAdd={() => addBookMutation.mutate(book)}
              />
            ))}
          </ul>
        ) : (
          <p className="rounded-md border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
            No books found for "{submittedQuery}".
          </p>
        )}
      </section>
    </AuthenticatedPage>
  )
}

function BookSearchResult({
  book,
  isAdding,
  onAdd,
}: {
  book: Book
  isAdding: boolean
  onAdd: () => void
}) {
  return (
    <li className="flex min-h-48 gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/30">
      <BookCover src={book.coverUrl} title={book.title} />
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="line-clamp-2 text-base font-semibold text-card-foreground">
          {book.title}
        </h2>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {book.author}
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <dt>Published</dt>
            <dd className="text-foreground">
              {book.yearPublished ?? 'Unknown'}
            </dd>
          </div>
          <div>
            <dt>Pages</dt>
            <dd className="text-foreground">{book.pageCount ?? 'Unknown'}</dd>
          </div>
        </dl>
        <Button
          className="mt-auto w-fit"
          disabled={isAdding || !book.openLibraryKey}
          onClick={onAdd}
          size="sm"
        >
          {isAdding ? <Spinner /> : <Plus />}
          Add
        </Button>
      </div>
    </li>
  )
}

function BookCover({ src, title }: { src: string | null; title: string }) {
  if (src) {
    return (
      <img
        alt={`${title} cover`}
        className="h-36 w-24 shrink-0 rounded-md object-cover ring-1 ring-border"
        src={src}
      />
    )
  }

  return (
    <div className="flex h-36 w-24 shrink-0 items-center justify-center rounded-md bg-muted ring-1 ring-border">
      <BookOpen className="size-8 text-muted-foreground" />
    </div>
  )
}

function EmptySearchState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/60 p-8 text-center">
      <BookOpen className="mb-3 size-9 text-muted-foreground" />
      <h2 className="text-lg font-medium text-foreground">
        Search Open Library
      </h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Results can be added straight to your reading list.
      </p>
    </div>
  )
}

function SearchSkeleton() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          className="flex min-h-48 gap-4 rounded-lg border border-border bg-card p-4"
          key={index}
        >
          <div className="h-36 w-24 shrink-0 animate-pulse rounded-md bg-muted" />
          <div className="flex flex-1 flex-col gap-3">
            <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="mt-auto h-8 w-20 animate-pulse rounded bg-muted" />
          </div>
        </li>
      ))}
    </ul>
  )
}
