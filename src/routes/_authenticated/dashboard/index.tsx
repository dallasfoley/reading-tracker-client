import DashboardPage from '#/features/dashboard/DashboardPage'
import { provisionUser } from '#/features/auth/auth.queries'
import { apiFetch } from '#/lib/api'
import { createFileRoute } from '@tanstack/react-router'

interface UserBook {
  id: number
  [key: string]: unknown
}

// Note the trailing slash, which is used to target index routes
export const Route = createFileRoute('/_authenticated/dashboard/')({
  loader: async ({ context: { queryClient, auth } }) => {
    const token = await auth.getAccessToken()
    if (!token) {
      throw new Error('Unable to get access token')
    }

    const appUser = await queryClient.ensureQueryData({
      queryKey: ['auth', 'provision', auth.user?.sub],
      queryFn: () => provisionUser(token),
    })

    const userbooks = await queryClient.ensureQueryData({
      queryKey: ['userbooks', appUser.id],
      queryFn: () => apiFetch<UserBook[]>('/userbooks', token),
    })

    return { appUser, userbooks }
  },
  component: DashboardPage,
})
