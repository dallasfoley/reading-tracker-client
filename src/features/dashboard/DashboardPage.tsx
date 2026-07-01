import UserGreeting from './UserGreeting'
import Dashboard from './Dashboard'

export default function DashboardPage() {
  return (
    <main className="container flex flex-col items-center mx-auto py-8">
      <UserGreeting />
      <Dashboard />
    </main>
  )
}
