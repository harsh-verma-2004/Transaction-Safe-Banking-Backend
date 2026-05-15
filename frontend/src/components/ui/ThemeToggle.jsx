import { Monitor, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTheme } from '@/hooks/useTheme'

const ICONS = {
  system: Monitor,
  light: Sun,
  dark: Moon,
}

const LABELS = {
  system: 'System theme',
  light: 'Light theme',
  dark: 'Dark theme',
}

export function ThemeToggle({ className }) {
  const { theme, cycleTheme } = useTheme()
  const Icon = ICONS[theme] ?? Monitor

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={className}
          onClick={cycleTheme}
          aria-label={`${LABELS[theme]}. Click to cycle.`}
        >
          <Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{LABELS[theme]}</TooltipContent>
    </Tooltip>
  )
}
