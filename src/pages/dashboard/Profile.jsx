import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../../hooks/useAuth.jsx'
import { db } from '../../firebase/config'
import { getFriendlyErrorMessage } from '../../utils/errorMessages'
import Button from '../../components/Button'

export default function Profile() {
  const { user, profile } = useAuth()
  const [name, setName] = useState(profile?.name || user?.displayName || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (!name.trim()) {
      setError('Name cannot be empty.')
      return
    }
    setSaving(true)
    try {
      await updateProfile(user, { displayName: name.trim() })
      await updateDoc(doc(db, 'users', user.uid), { name: name.trim() })
      setSuccess(true)
    } catch (err) {
      setError(getFriendlyErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container-narrow" style={{ marginLeft: 0 }}>
      <h1 className="page-title">Profile</h1>
      <form className="card" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={user?.email || ''} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="role">Account type</label>
          <input id="role" type="text" value={profile?.role === 'admin' ? 'Administrator' : 'User'} disabled />
        </div>
        {error && (
          <p className="error-text" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p style={{ color: 'var(--color-success)', fontSize: '0.875rem' }} role="status">
            Profile updated.
          </p>
        )}
        <Button type="submit" variant="primary" loading={saving}>
          Save changes
        </Button>
      </form>
    </div>
  )
}
