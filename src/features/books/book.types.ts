export type ReadingStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

export interface Book {
  id: number | null
  openLibraryKey: string | null
  title: string
  author: string
  yearPublished: number | null
  genre: string | null
  pageCount: number | null
  coverUrl: string | null
  description: string | null
}

export interface UserBook {
  id: number
  status: ReadingStatus
  userRating: number | null
  currentPage: number | null
  bookId: number
  bookTitle: string
  bookAuthor: string
  bookCoverUrl: string | null
}

export interface AddUserBookRequest {
  bookId?: number
  openLibraryKey?: string
  status: ReadingStatus
  userRating?: number
  currentPage?: number
}
