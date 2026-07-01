import { createFileRoute } from '@tanstack/react-router'
import HeroPage from '#/features/hero/HeroPage'

export const Route = createFileRoute('/')({ component: HeroPage })
