import DashboardPage from '#/features/dashboard/DashboardPage'
import { createFileRoute } from '@tanstack/react-router'

// Note the trailing slash, which is used to target index routes
export const Route = createFileRoute('/_authenticated/dashboard/')({
  loader: async ({ context: { queryClient, auth } }) => {
    const token = await auth.getAccessToken()
    const userbooks = await queryClient.prefetchQuery({
      queryKey: ['userbooks'],
      queryFn: async () => {
        console.log('Fetching userbooks with token:', token)
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/userbooks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        )
        return response.json()
      },
    })
    return { userbooks }
  },
  component: DashboardPage,
})
