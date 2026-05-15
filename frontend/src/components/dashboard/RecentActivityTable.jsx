import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MOCK_RECENT_ACTIVITY } from '@/data/mockActivity'

function statusVariant(status) {
  if (status === 'SUCCESS') return 'default'
  if (status === 'PENDING') return 'secondary'
  return 'destructive'
}

function formatDate(iso) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

export function RecentActivityTable({ rows = MOCK_RECENT_ACTIVITY }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>
          Sample ledger entries — connect a transactions API to load live data.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead className="hidden sm:table-cell">Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell text-right">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="max-w-[120px] truncate font-mono text-xs sm:max-w-[180px]">
                  {row.reference.slice(0, 8)}…
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {row.account}
                </TableCell>
                <TableCell>
                  <Badge variant={row.type === 'CREDIT' ? 'default' : 'outline'}>
                    {row.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  ${row.amount}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                </TableCell>
                <TableCell className="hidden text-right text-muted-foreground lg:table-cell">
                  {formatDate(row.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
