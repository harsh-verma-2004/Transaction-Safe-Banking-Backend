import { Outlet, Link } from 'react-router-dom'
import { Landmark } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function AuthLayout() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Link
        to="/"
        className="mb-8 flex items-center gap-2 font-semibold text-foreground no-underline"
      >
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Landmark className="size-5" />
        </div>
        VaultBank
      </Link>
      <Outlet />
    </div>
  )
}
