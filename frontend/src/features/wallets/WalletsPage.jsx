import { CreditCard, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PageShell, PageSection } from '@/components/layout/PageShell'
import { StatCard } from '@/components/dashboard/StatCard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const MOCK_WALLETS = [
  { id: 1, number: '**** 4821', label: 'Primary checking', balance: '$12,450.00', status: 'ACTIVE' },
  { id: 2, number: '**** 9034', label: 'Savings', balance: '$8,200.00', status: 'ACTIVE' },
  { id: 3, number: '**** 1102', label: 'Business', balance: '$2,150.00', status: 'ACTIVE' },
]

export function WalletsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Wallets"
        description="Manage account balances linked to your Django wallet model."
      />

      <PageSection stagger={1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total balance"
          value="$22,800.00"
          description="Across 3 accounts"
          icon={Wallet}
        />
        <StatCard
          title="Active accounts"
          value="3"
          icon={CreditCard}
        />
      </PageSection>

      <PageSection stagger={2} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_WALLETS.map((w) => (
          <Card
            key={w.id}
            className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{w.label}</CardTitle>
                <Badge variant="secondary">{w.status}</Badge>
              </div>
              <CardDescription className="font-mono">{w.number}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums tracking-tight">
                {w.balance}
              </p>
            </CardContent>
          </Card>
        ))}
      </PageSection>
    </PageShell>
  )
}
