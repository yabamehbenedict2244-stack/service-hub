import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { logoutUser } from '../firebase/auth'
import NotificationBell from './NotificationBell'
import Button from './Button'

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
  fontWeight: isActive ? 700 : 500,
})

export default function Navbar() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    navigate('/signin')
  }

  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 64,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          height: '100%',
          padding: '0 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <Link to="/" style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-text)' }}>
          ServiceHub
        </Link>

        <nav aria-label="Main navigation" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <NavLink to="/services" style={navLinkStyle}>Services</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
          <NavLink to="/contact" style={navLinkStyle}>Contact</NavLink>
          {isAdmin && <NavLink to="/admin" style={navLinkStyle}>Admin</NavLink>}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              <NotificationBell />
              <Link to="/dashboard" style={{ color: 'var(--color-text)' }}>Dashboard</Link>
              <Button variant="secondary" onClick={handleLogout}>Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/signin">Sign in</Link>
              <Button variant="primary" onClick={() => navigate('/signup')}>Sign up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
