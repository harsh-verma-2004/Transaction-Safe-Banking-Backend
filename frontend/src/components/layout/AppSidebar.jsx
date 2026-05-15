import { Link, NavLink } from 'react-router-dom'
import { Landmark, LogIn, LogOut, Sparkles } from 'lucide-react'
import { MAIN_NAV } from '@/config/navigation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuth } from '@/features/auth/useAuth'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const { isAuthenticated, logout, claims } = useAuth()
  const userId = claims?.user_id

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="border-b border-sidebar-border/80">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="transition-opacity hover:opacity-90">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-sidebar-primary to-primary/80 text-sidebar-primary-foreground shadow-md shadow-primary/20">
                  <Landmark className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-tight">
                    VaultBank
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Private banking
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_NAV.map((item) => {
                if (item.auth && !isAuthenticated) return null
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                          cn(
                            'relative transition-all duration-200',
                            isActive &&
                              'bg-sidebar-accent font-medium text-sidebar-accent-foreground shadow-sm before:absolute before:left-0 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-sidebar-primary',
                          )
                        }
                      >
                        <Icon className="transition-transform duration-200 group-hover/menu-button:scale-105" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAuthenticated ? (
          <SidebarGroup className="mt-auto">
            <SidebarGroupLabel>Status</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="mx-2 rounded-lg border border-sidebar-border/80 bg-sidebar-accent/50 p-3 group-data-[collapsible=icon]:hidden">
                <div className="flex items-center gap-2 text-xs font-medium text-sidebar-foreground">
                  <Sparkles className="size-3.5 text-primary" />
                  Secure session
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  JWT active · transfers protected
                </p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Sign in">
                    <NavLink to="/login">
                      <LogIn />
                      <span>Sign in</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/80">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex w-full items-center justify-between gap-2 px-1 py-0.5 group-data-[collapsible=icon]:flex-col">
              <ThemeToggle />
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 flex-1 justify-start text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0"
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Sign out
                  </span>
                </Button>
              ) : null}
            </div>
          </SidebarMenuItem>
          {isAuthenticated && userId != null ? (
            <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
              <Badge variant="secondary" className="mx-2 w-fit font-normal">
                User #{String(userId)}
              </Badge>
            </SidebarMenuItem>
          ) : null}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
