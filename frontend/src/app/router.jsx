import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { LoginPage } from '@/features/auth/LoginPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { TransactionsPage } from '@/features/transactions/TransactionsPage'
import { WalletsPage } from '@/features/wallets/WalletsPage'
import { TransferPage } from '@/features/transfers/TransferPage'
import { ProfilePage } from '@/features/profile/ProfilePage'

function Protected({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route
            path="transactions"
            element={
              <Protected>
                <TransactionsPage />
              </Protected>
            }
          />
          <Route
            path="wallets"
            element={
              <Protected>
                <WalletsPage />
              </Protected>
            }
          />
          <Route
            path="transfer"
            element={
              <Protected>
                <TransferPage />
              </Protected>
            }
          />
          <Route
            path="profile"
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
