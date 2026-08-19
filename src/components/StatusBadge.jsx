const STATUS_STYLES = {
  pending: { background: '#fff4d6', color: '#8a6100' },
  'in-progress': { background: '#dbe8ff', color: '#1c4aad' },
  completed: { background: '#dcf5e6', color: 'var(--color-success)' },
  rejected: { background: '#fbdede', color: 'var(--color-danger)' },
}

const STATUS_LABELS = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
  rejected: 'Rejected',
}

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending
  const label = STATUS_LABELS[status] || status

  return (
    <span
      style={{
        ...style,
        display: 'inline-block',
        padding: '0.2rem 0.65rem',
        borderRadius: 999,
        fontSize: '0.8rem',
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  )
}
