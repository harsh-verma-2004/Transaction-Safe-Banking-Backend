import { Shield, User } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PageShell, PageSection } from '@/components/layout/PageShell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/features/auth/useAuth'

export function ProfilePage() {
  const { claims } = useAuth()
  const userId = claims?.user_id

  return (
    <PageShell narrow>
      <PageHeader
        title="Profile"
        description="Account identity from your JWT session."
      />

      <PageSection stagger={1}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <User className="size-7" />
              </div>
              <div>
                <CardTitle>Banking user</CardTitle>
                <CardDescription>
                  Authenticated via Django Simple JWT
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono font-medium">
                {userId != null ? String(userId) : '—'}
              </span>
            </div>
            <Separator />
            <div className="flex items-center gap-2 text-sm">
              <Shield className="size-4 text-primary" />
              <span>Session secured with Bearer token</span>
              <Badge className="ml-auto">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </PageSection>
    </PageShell>
  )
}
