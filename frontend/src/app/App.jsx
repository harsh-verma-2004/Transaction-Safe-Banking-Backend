import { AuthProvider } from '@/features/auth/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppRouter } from '@/app/router'

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
