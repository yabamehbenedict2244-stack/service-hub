import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { useNotifications } from '../hooks/useNotifications'

export default function NotificationBell() {
  const { user } = useAuth()
  const { unreadCount } = useNotifications(user?.uid)

  return (
    <Link
      to="/dashboard/notifications"
      aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', color: 'var(--color-text)' }}
    >
      <span aria-hidden="true" style={{ fontSize: '1.25rem' }}>🔔</span>
      {unreadCount > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -4,
            right: -6,
            background: 'var(--color-danger)',
            color: '#fff',
            borderRadius: 999,
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '1px 5px',
            minWidth: 16,
            textAlign: 'center',
          }}
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Link>
  )
}
