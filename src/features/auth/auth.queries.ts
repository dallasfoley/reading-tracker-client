import { apiFetch } from '#/lib/api'

export interface AppUser {
  id: number
  email: string
  createdAt: string
}

export function provisionUser(token: string) {
  return apiFetch<AppUser>('/auth/provision', token, {
    method: 'POST',
  })
}
