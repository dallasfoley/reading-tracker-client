import BrowsePage from '#/features/browse/BrowsePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/browse/')({
  component: BrowsePage,
})
