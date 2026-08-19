import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingSpinner label="Checking your session…" />

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />
  }

  return <Outlet />
}
