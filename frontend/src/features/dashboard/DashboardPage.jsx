import { Link } from 'react-router-dom'
import { DollarSign, Receipt, ShieldCheck, Wallet, Zap } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { DashboardHero } from '@/components/dashboard/DashboardHero'
import { QuickTransferDialog } from '@/components/dashboard/QuickTransferDialog'
import { RecentActivityTable } from '@/components/dashboard/RecentActivityTable'
import { StatCard } from '@/components/dashboard/StatCard'
import { PageShell, PageSection } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/features/auth/useAuth'

export function DashboardPage() {
  const { isAuthenticated } = useAuth()

  return (
    <PageShell>
      <PageSection>
        <DashboardHero />
      </PageSection>

      {isAuthenticated ? (
        <>
          <PageSection stagger={1}>
            <PageHeader
              title="Overview"
              description="Your financial snapshot at a glance."
            >
              <QuickTransferDialog />
              <Button variant="outline" asChild>
                <Link to="/transactions">View all</Link>
              </Button>
            </PageHeader>
          </PageSection>

          <PageSection
            stagger={2}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <StatCard
              title="Available balance"
              value="$12,450.00"
              description="Primary wallet"
              icon={Wallet}
              trend="+2.4% vs last month"
            />
            <StatCard
              title="Transfers today"
              value="3"
              description="Successful"
              icon={Zap}
            />
            <StatCard
              title="Pending review"
              value="1"
              description="Fraud checks (async)"
              icon={ShieldCheck}
            />
            <StatCard
              title="Volume (30d)"
              value="$4,820"
              icon={DollarSign}
            />
          </PageSection>

          <PageSection stagger={3}>
            <RecentActivityTable />
          </PageSection>
        </>
      ) : (
        <PageSection stagger={2} className="grid gap-4 sm:grid-cols-3">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <Receipt className="mb-2 size-5 text-primary" />
              <CardTitle className="text-base">Transactions</CardTitle>
              <CardDescription>Immutable ledger entries</CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <Wallet className="mb-2 size-5 text-primary" />
              <CardTitle className="text-base">Wallets</CardTitle>
              <CardDescription>Per-account balances</CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <ShieldCheck className="mb-2 size-5 text-primary" />
              <CardTitle className="text-base">Secure transfers</CardTitle>
              <CardDescription>Row locks & idempotency</CardDescription>
            </CardHeader>
          </Card>
        </PageSection>
      )}
    </PageShell>
  )
}
