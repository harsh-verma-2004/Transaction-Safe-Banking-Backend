import { apiFetch } from '@/lib/api/client'

/**
 * @param {{
 *   from_account_id: number
 *   to_account_id: number
 *   amount: string
 *   reference_id: string
 * }} body
 */
export function postTransfer(body) {
  return apiFetch('/api/transfer/', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
