import { cn } from '@/lib/utils'

/**
 * Reusable page wrapper: consistent max-width, spacing, and entrance animation.
 */
export function PageShell({ children, className, narrow = false }) {
  return (
    <div
      className={cn(
        'animate-fade-up mx-auto w-full flex-1',
        narrow ? 'max-w-3xl' : 'max-w-7xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function PageSection({ children, className, stagger = 0 }) {
  const delay =
    stagger > 0 ? `animate-stagger-${Math.min(stagger, 5)}` : undefined
  return (
    <section className={cn('animate-fade-up', delay, className)}>
      {children}
    </section>
  )
}
