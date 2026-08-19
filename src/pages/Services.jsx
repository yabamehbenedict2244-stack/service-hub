import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import Button from '../components/Button'

const SERVICES = [
  { name: 'Home Cleaning', description: 'Regular or one-off cleaning for your home.' },
  { name: 'Plumbing Repair', description: 'Fix leaks, clogs, and installations.' },
  { name: 'Electrical Work', description: 'Wiring, fixtures, and safety inspections.' },
  { name: 'IT Support', description: 'Troubleshooting for devices and networks.' },
  { name: 'Landscaping', description: 'Lawn care, trimming, and garden upkeep.' },
  { name: 'Moving Assistance', description: 'Help packing, loading, and moving.' },
]

export default function Services() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="page-title">Our Services</h1>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {SERVICES.map((service) => (
          <div key={service.name} className="card">
            <h3 style={{ marginTop: 0 }}>{service.name}</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>{service.description}</p>
            <Link to={user ? '/dashboard/requests' : '/signin'}>
              <Button variant="secondary">Request this service</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
