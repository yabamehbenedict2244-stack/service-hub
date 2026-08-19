import StatusBadge from './StatusBadge'
import { formatDate } from '../utils/formatDate'

export default function RequestCard({ request, footer }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{request.service}</h3>
        <StatusBadge status={request.status} />
      </div>
      <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{request.description}</p>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
        {request.userEmail && <span>{request.userEmail} · </span>}
        Submitted {formatDate(request.createdAt)}
      </div>
      {footer}
    </div>
  )
}
