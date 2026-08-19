import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
      <h1>404 — Page not found</h1>
      <p style={{ color: 'var(--color-text-muted)' }}>The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="primary">Back to home</Button>
      </Link>
    </div>
  )
}
