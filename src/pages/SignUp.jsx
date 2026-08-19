import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../firebase/auth'
import { getFriendlyErrorMessage } from '../utils/errorMessages'
import Button from '../components/Button'

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password should be at least 6 characters long.')
      return
    }

    setLoading(true)
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(getFriendlyErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-narrow">
      <h1 className="page-title">Create an Account</h1>
      <form className="card" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && (
          <p className="error-text" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" variant="primary" fullWidth loading={loading}>
          Sign up
        </Button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  )
}
