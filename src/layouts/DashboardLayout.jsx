import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const linkClass = ({ isActive }) => (isActive ? 'active' : undefined)

export default function DashboardLayout({ variant = 'user' }) {
  const links =
    variant === 'admin'
      ? [
          { to: '/admin', label: 'Overview', end: true },
          { to: '/admin/requests', label: 'All Requests' },
        ]
      : [
          { to: '/dashboard', label: 'Overview', end: true },
          { to: '/dashboard/requests', label: 'My Requests' },
          { to: '/dashboard/notifications', label: 'Notifications' },
          { to: '/dashboard/profile', label: 'Profile' },
        ]

  return (
    <div className="app-shell">
      <Navbar />
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar" aria-label={`${variant === 'admin' ? 'Admin' : 'Dashboard'} navigation`}>
          <nav>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}
