import { Link, useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { ROUTE_TITLES } from '@/config/navigation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/features/auth/useAuth'
import { cn } from '@/lib/utils'

function usePageTitle() {
  const { pathname } = useLocation()
  return ROUTE_TITLES[pathname] ?? 'VaultBank'
}

export function AppTopbar({ className }) {
  const title = usePageTitle()
  const { isAuthenticated, claims } = useAuth()
  const userId = claims?.user_id
  const initials = userId != null ? `U${String(userId).slice(-2)}` : 'VB'

  return (
    <header
      className={cn(
        'glass-nav sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 px-4 transition-[width,height] ease-linear md:px-6',
        className,
      )}
    >
      <SidebarTrigger className="-ml-1 md:hidden" />
      <Separator orientation="vertical" className="mr-1 h-5 md:hidden" />

      <div className="hidden min-w-0 flex-col md:flex">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          VaultBank
        </p>
        <h2 className="truncate font-heading text-sm font-semibold">{title}</h2>
      </div>

      <div className="relative ml-auto flex flex-1 items-center gap-2 sm:max-w-md md:mx-6 md:ml-0">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search transactions, accounts…"
          className="h-9 w-full bg-muted/50 pl-9 text-sm transition-colors focus-visible:bg-background"
          disabled={!isAuthenticated}
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative hidden sm:inline-flex"
          aria-label="Notifications"
          disabled={!isAuthenticated}
        >
          <Bell className="size-4" />
          {isAuthenticated ? (
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
          ) : null}
        </Button>

        <ThemeToggle />

        {isAuthenticated ? (
          <Button variant="ghost" size="sm" className="gap-2 pl-1.5 pr-2" asChild>
            <Link to="/profile">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {initials}
              </span>
              <span className="hidden text-sm font-medium lg:inline">
                Profile
              </span>
            </Link>
          </Button>
        ) : (
          <Button size="sm" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
