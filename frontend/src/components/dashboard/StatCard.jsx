import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}) {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {value}
          </CardTitle>
        </div>
        {Icon ? (
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Icon className="size-4" />
          </div>
        ) : null}
      </CardHeader>
      {(description || trend) && (
        <CardContent className="pt-0">
          {trend ? (
            <p className="text-xs font-medium text-primary">{trend}</p>
          ) : null}
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </CardContent>
      )}
    </Card>
  )
}
