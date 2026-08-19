import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import Button from '../components/Button'

export default function Home() {
  const { user } = useAuth()

  return (
    <div>
      <section style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h1 style={{ fontSize: '2.25rem', margin: '0 0 1rem' }}>
          Get things done with ServiceHub
        </h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: 560, margin: '0 auto 1.5rem' }}>
          Submit a service request, track its status in real time, and stay
          notified every step of the way.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Link to={user ? '/dashboard/requests' : '/signup'}>
            <Button variant="primary">{user ? 'Go to my requests' : 'Get started'}</Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary">Browse services</Button>
          </Link>
        </div>
      </section>

      <section className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: '2rem' }}>
        <div className="card">
          <h3>Submit a request</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Tell us what you need in a couple of clicks.</p>
        </div>
        <div className="card">
          <h3>Track progress</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>See live status updates on your dashboard.</p>
        </div>
        <div className="card">
          <h3>Get notified</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>We'll let you know the moment something changes.</p>
        </div>
      </section>
    </div>
  )
}
