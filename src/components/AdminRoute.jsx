import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import LoadingSpinner from './LoadingSpinner'

export default function AdminRoute() {
  const { user, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingSpinner label="Checking your permissions…" />

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
