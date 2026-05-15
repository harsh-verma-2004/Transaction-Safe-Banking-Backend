import { RecentActivityTable } from '@/components/dashboard/RecentActivityTable'
import { PageHeader } from '@/components/common/PageHeader'
import { PageShell, PageSection } from '@/components/layout/PageShell'

export function TransactionsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Transactions"
        description="View credits, debits, and transfer references across your accounts."
      />
      <PageSection stagger={1}>
        <RecentActivityTable />
      </PageSection>
    </PageShell>
  )
}
