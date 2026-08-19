import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { useRequests } from '../hooks/useRequests'
import Button from '../components/Button'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const { requests } = useRequests(user?.uid)

  const pendingCount = requests.filter((r) => r.status === 'pending').length
  const inProgressCount = requests.filter((r) => r.status === 'in-progress').length
  const completedCount = requests.filter((r) => r.status === 'completed').length

  return (
    <div>
      <h1 className="page-title">Welcome back{profile?.name ? `, ${profile.name}` : ''}</h1>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', marginBottom: '1.5rem' }}>
        <div className="card">
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{requests.length}</div>
          <div style={{ color: 'var(--color-text-muted)' }}>Total requests</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{pendingCount}</div>
          <div style={{ color: 'var(--color-text-muted)' }}>Pending</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{inProgressCount}</div>
          <div style={{ color: 'var(--color-text-muted)' }}>In progress</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{completedCount}</div>
          <div style={{ color: 'var(--color-text-muted)' }}>Completed</div>
        </div>
      </div>

      <Link to="/dashboard/requests">
        <Button variant="primary">View my requests</Button>
      </Link>
    </div>
  )
}
