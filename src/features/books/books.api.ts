import { apiFetch } from '#/lib/api'
import type {
  AddUserBookRequest,
  Book,
  ReadingStatus,
  UserBook,
} from './book.types'

export function searchBooks(query: string, token: string) {
  const searchParams = new URLSearchParams({ query })
  return apiFetch<Book[]>(`/books/search?${searchParams.toString()}`, token)
}

export function getUserBooks(token: string) {
  return apiFetch<UserBook[]>('/userbooks', token)
}

export function addUserBook(request: AddUserBookRequest, token: string) {
  return apiFetch<UserBook>('/userbooks', token, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

export function updateUserBookStatus(
  bookId: number,
  status: ReadingStatus,
  token: string,
) {
  const searchParams = new URLSearchParams({ status })
  return apiFetch<UserBook>(
    `/userbooks/${bookId}/status?${searchParams.toString()}`,
    token,
    { method: 'PATCH' },
  )
}

export function updateUserBookCurrentPage(
  bookId: number,
  currentPage: number,
  token: string,
) {
  const searchParams = new URLSearchParams({
    currentPage: String(currentPage),
  })
  return apiFetch<UserBook>(
    `/userbooks/${bookId}/current-page?${searchParams.toString()}`,
    token,
    { method: 'PATCH' },
  )
}

export function updateUserBookRating(
  bookId: number,
  rating: number,
  token: string,
) {
  const searchParams = new URLSearchParams({ rating: String(rating) })
  return apiFetch<UserBook>(
    `/userbooks/${bookId}/rating?${searchParams.toString()}`,
    token,
    { method: 'PATCH' },
  )
}
