import { useAuth } from '../../hooks/useAuth.jsx'
import { useNotifications } from '../../hooks/useNotifications'
import { markNotificationRead } from '../../firebase/firestore'
import { formatDate } from '../../utils/formatDate'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'

export default function Notifications() {
  const { user } = useAuth()
  const { notifications, loading, error } = useNotifications(user?.uid)

  return (
    <div>
      <h1 className="page-title">Notifications</h1>

      {loading && <LoadingSpinner label="Loading notifications…" />}
      {error && <p className="error-text" role="alert">{error}</p>}

      {!loading && !error && notifications.length === 0 && (
        <EmptyState title="You're all caught up" description="New notifications will show up here." />
      )}

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="card"
            style={{ borderLeft: notification.read ? undefined : '3px solid var(--color-primary)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
              <strong>{notification.title}</strong>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => markNotificationRead(notification.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.85rem' }}
                >
                  Mark as read
                </button>
              )}
            </div>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--color-text-muted)' }}>{notification.message}</p>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
              {formatDate(notification.createdAt)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
