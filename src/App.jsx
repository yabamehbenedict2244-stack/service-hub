import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'

import Dashboard from './pages/Dashboard'
import Requests from './pages/dashboard/Requests'
import Notifications from './pages/dashboard/Notifications'
import Profile from './pages/dashboard/Profile'

import Admin from './pages/admin/Admin'
import AdminRequests from './pages/admin/AdminRequests'

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Authenticated user routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout variant="user" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/requests" element={<Requests />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin-only routes */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout variant="admin" />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
