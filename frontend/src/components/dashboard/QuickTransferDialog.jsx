import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function QuickTransferDialog({ trigger }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <ArrowRightLeft className="size-4" />
            Quick transfer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start a transfer</DialogTitle>
          <DialogDescription>
            Use the full transfer form to send money with idempotency keys and JWT
            auth. Your backend validates account ownership on the sender.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button asChild onClick={() => setOpen(false)}>
            <Link to="/transfer">Open transfer form</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
