import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/features/auth/useAuth'

export function DashboardHero() {
  const { isAuthenticated, claims } = useAuth()
  const userId = claims?.user_id

  if (!isAuthenticated) {
    return (
      <Card className="animate-fade-up overflow-hidden border-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-lg shadow-primary/25">
        <CardContent className="relative p-6 sm:p-8">
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 right-1/4 size-32 rounded-full bg-white/5 blur-xl" />
          <p className="relative text-sm font-medium uppercase tracking-wider opacity-90">
            Welcome
          </p>
          <h2 className="relative mt-1 font-heading text-2xl font-semibold sm:text-3xl">
            Modern banking, built for developers
          </h2>
          <p className="relative mt-2 max-w-lg text-sm opacity-90 sm:text-base">
            JWT auth, idempotent transfers, and a production-style Django backend.
          </p>
          <Button
            variant="secondary"
            className="relative mt-6 gap-2 bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link to="/login">
              Get started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-fade-up overflow-hidden border-0 bg-gradient-to-br from-primary via-primary/95 to-chart-2/80 text-primary-foreground shadow-lg shadow-primary/20">
      <CardContent className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="absolute -right-6 -top-6 size-36 rounded-full bg-white/10 blur-2xl" />
        <div>
          <p className="text-sm font-medium opacity-90">
            Good {getGreeting()} · User {userId != null ? String(userId) : ''}
          </p>
          <h2 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">
            $12,450.00
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm opacity-90">
            <TrendingUp className="size-4" />
            +2.4% from last month
          </p>
        </div>
        <Button
          variant="secondary"
          className="relative shrink-0 gap-2 bg-white/95 text-primary hover:bg-white"
          asChild
        >
          <Link to="/transfer">
            Transfer money
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
