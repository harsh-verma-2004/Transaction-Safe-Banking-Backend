import {
  ArrowLeftRight,
  LayoutDashboard,
  Receipt,
  User,
  Wallet,
} from 'lucide-react'

/** @typedef {{ to: string, label: string, icon: import('lucide-react').LucideIcon, end?: boolean, auth?: boolean, description?: string }} NavItem */

/** @type {NavItem[]} */
export const MAIN_NAV = [
  {
    to: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    end: true,
    description: 'Overview & insights',
  },
  {
    to: '/transactions',
    label: 'Transactions',
    icon: Receipt,
    auth: true,
    description: 'Ledger & history',
  },
  {
    to: '/wallets',
    label: 'Wallets',
    icon: Wallet,
    auth: true,
    description: 'Balances & accounts',
  },
  {
    to: '/transfer',
    label: 'Transfer Money',
    icon: ArrowLeftRight,
    auth: true,
    description: 'Send funds securely',
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: User,
    auth: true,
    description: 'Account & security',
  },
]

/** @type {Record<string, string>} */
export const ROUTE_TITLES = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/wallets': 'Wallets',
  '/transfer': 'Transfer Money',
  '/profile': 'Profile',
  '/login': 'Sign in',
}
