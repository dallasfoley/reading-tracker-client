import { AuthenticatedPage } from '#/components/layout/AuthenticatedPage'
import { LibraryBig } from 'lucide-react'
import Dashboard from './Dashboard'
import UserGreeting from './UserGreeting'

export default function DashboardPage() {
  return (
    <AuthenticatedPage
      action={{ label: 'Browse Books', to: '/browse' }}
      description="Manage your reading list, update progress, and keep your completed books rated."
      eyebrow={
        <>
          <LibraryBig className="size-4" />
          Dashboard
        </>
      }
      title="Your Reading Tracker"
    >
      <UserGreeting />
      <Dashboard />
    </AuthenticatedPage>
  )
}
