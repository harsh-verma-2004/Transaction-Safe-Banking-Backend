/** Placeholder activity until Django read APIs exist. */
export const MOCK_RECENT_ACTIVITY = [
  {
    id: '1',
    reference: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'DEBIT',
    amount: '250.00',
    account: 'Account #1',
    status: 'SUCCESS',
    date: '2026-05-14T10:32:00Z',
  },
  {
    id: '2',
    reference: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    type: 'CREDIT',
    amount: '1,200.00',
    account: 'Account #2',
    status: 'SUCCESS',
    date: '2026-05-13T16:05:00Z',
  },
  {
    id: '3',
    reference: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    type: 'DEBIT',
    amount: '75.50',
    account: 'Account #1',
    status: 'SUCCESS',
    date: '2026-05-12T09:18:00Z',
  },
  {
    id: '4',
    reference: 'd4e5f6a7-b8c9-0123-def0-234567890123',
    type: 'CREDIT',
    amount: '500.00',
    account: 'Account #3',
    status: 'PENDING',
    date: '2026-05-11T14:42:00Z',
  },
]
