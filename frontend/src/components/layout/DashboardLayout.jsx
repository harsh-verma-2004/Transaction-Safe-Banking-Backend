import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { AppTopbar } from '@/components/layout/AppTopbar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset className="banking-mesh min-h-svh">
        <AppTopbar />
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
