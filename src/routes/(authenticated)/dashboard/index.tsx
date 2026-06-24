import { createFileRoute } from '@tanstack/react-router'

// Note the trailing slash, which is used to target index routes
export const Route = createFileRoute('/(authenticated)/dashboard/')({
  component: DashboardIndexComponent,
})

function DashboardIndexComponent() {
  return <div>Please select a post!</div>
}
