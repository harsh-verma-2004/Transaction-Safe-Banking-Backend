import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/common/PageHeader'
import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function PlaceholderPage({
  title,
  description,
  hint = 'This section will connect to Django read APIs when available.',
}) {
  return (
    <PageShell>
      <PageHeader title={title} description={description} />
      <Card className="animate-fade-up animate-stagger-1 border-dashed shadow-sm">
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>{hint}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link to="/">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  )
}
