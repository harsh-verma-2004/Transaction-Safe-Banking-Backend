import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { postTransfer } from '@/features/transfers/transferApi'

function newReferenceId() {
  return crypto.randomUUID()
}

export function TransferPage() {
  const [fromAccountId, setFromAccountId] = useState('')
  const [toAccountId, setToAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const [referenceId, setReferenceId] = useState(() => newReferenceId())
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  async function executeTransfer() {
    setError('')
    setResult(null)
    setPending(true)

    const body = {
      from_account_id: Number(fromAccountId),
      to_account_id: Number(toAccountId),
      amount: String(amount),
      reference_id: referenceId,
    }

    try {
      const res = await postTransfer(body)
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const msg =
          typeof data?.error === 'string'
            ? data.error
            : data?.detail ?? `Request failed (${res.status})`
        throw new Error(msg)
      }

      setResult(data)
      setReferenceId(newReferenceId())
      setConfirmOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed.')
      setConfirmOpen(false)
    } finally {
      setPending(false)
    }
  }

  function handleReview(e) {
    e.preventDefault()
    setError('')
    setConfirmOpen(true)
  }

  return (
    <PageShell narrow className="flex flex-col gap-6">
      <PageHeader
        title="Transfer funds"
        description="POST /api/transfer/ with a UUID reference_id for idempotency. Only your own accounts can be debited."
      />

      <Card>
        <CardHeader>
          <CardTitle>Transfer details</CardTitle>
          <CardDescription>
            Review amounts carefully before confirming.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleReview}>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="from_account_id">From account ID</Label>
                <Input
                  id="from_account_id"
                  inputMode="numeric"
                  value={fromAccountId}
                  onChange={(e) => setFromAccountId(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="to_account_id">To account ID</Label>
                <Input
                  id="to_account_id"
                  inputMode="numeric"
                  value={toAccountId}
                  onChange={(e) => setToAccountId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reference_id">Reference ID</Label>
              <div className="flex gap-2">
                <Input
                  id="reference_id"
                  className="font-mono text-xs"
                  value={referenceId}
                  readOnly
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setReferenceId(newReferenceId())}
                  aria-label="New reference ID"
                >
                  <RefreshCw className="size-4" />
                </Button>
              </div>
            </div>
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t bg-muted/30 sm:flex-row sm:justify-end">
            <Button type="submit" disabled={pending}>
              Review transfer
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result ? (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      ) : null}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm transfer</DialogTitle>
            <DialogDescription>
              Send <strong>${amount}</strong> from account{' '}
              <strong>{fromAccountId}</strong> to account{' '}
              <strong>{toAccountId}</strong>?
            </DialogDescription>
          </DialogHeader>
          <p className="font-mono text-xs text-muted-foreground">
            Ref: {referenceId}
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button onClick={executeTransfer} disabled={pending}>
              {pending ? 'Submitting…' : 'Confirm & send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
