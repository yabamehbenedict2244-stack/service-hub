export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '1.5rem 1.25rem',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
      }}
    >
      © {new Date().getFullYear()} ServiceHub. All rights reserved.
    </footer>
  )
}
