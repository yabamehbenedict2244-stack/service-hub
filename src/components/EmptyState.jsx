export default function EmptyState({ title, description, action }) {
  return (
    <div
      className="card"
      style={{ textAlign: 'center', padding: '2.5rem 1.5rem', color: 'var(--color-text-muted)' }}
    >
      <h3 style={{ margin: '0 0 0.5rem', color: 'var(--color-text)' }}>{title}</h3>
      {description && <p style={{ margin: '0 0 1rem' }}>{description}</p>}
      {action}
    </div>
  )
}
