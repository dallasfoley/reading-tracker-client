export class ApiError extends Error {
  status?: number
  url?: string
  details?: string
  isNetworkError: boolean

  constructor({
    message,
    status,
    url,
    details,
    isNetworkError = false,
    cause,
  }: {
    message: string
    status?: number
    url?: string
    details?: string
    isNetworkError?: boolean
    cause?: unknown
  }) {
    super(message, { cause })
    this.name = 'ApiError'
    this.status = status
    this.url = url
    this.details = details
    this.isNetworkError = isNetworkError
  }
}

function getApiBaseUrl() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  if (!apiBaseUrl) {
    throw new ApiError({
      message: 'API base URL is not configured.',
      details: 'Set VITE_API_BASE_URL in your client environment.',
    })
  }

  return apiBaseUrl.replace(/\/$/, '')
}

async function readErrorMessage(response: Response) {
  const fallback = `API request failed: ${response.status} ${response.statusText}`
  const contentType = response.headers.get('content-type') ?? ''

  try {
    if (contentType.includes('application/json')) {
      const body = (await response.json()) as unknown

      if (body && typeof body === 'object') {
        const record = body as Record<string, unknown>
        const message = record.message ?? record.error ?? record.detail

        if (typeof message === 'string' && message.trim()) {
          return message
        }

        return JSON.stringify(body)
      }
    }

    const text = await response.text()
    return text.trim() || fallback
  } catch {
    return fallback
  }
}

export async function apiFetch<T>(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  headers.set('Authorization', `Bearer ${token}`)

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response: Response
  const url = `${getApiBaseUrl()}${path}`

  try {
    response = await fetch(url, {
      ...init,
      headers,
    })
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiError({
        message:
          'Cannot reach the API. Check that the server is running and CORS allows this request.',
        details: `Request: ${init.method ?? 'GET'} ${url}`,
        isNetworkError: true,
        url,
        cause: error,
      })
    }
    throw error
  }

  if (!response.ok) {
    const message = await readErrorMessage(response)
    throw new ApiError({
      message,
      status: response.status,
      url,
      details: `Request: ${init.method ?? 'GET'} ${url}`,
    })
  }

  return response.json() as Promise<T>
}
