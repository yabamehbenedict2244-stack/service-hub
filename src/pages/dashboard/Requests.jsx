import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useRequests } from '../../hooks/useRequests'
import { createRequest } from '../../firebase/firestore'
import { getFriendlyErrorMessage } from '../../utils/errorMessages'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import RequestCard from '../../components/RequestCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'

const SERVICE_OPTIONS = [
  'Home Cleaning',
  'Plumbing Repair',
  'Electrical Work',
  'IT Support',
  'Landscaping',
  'Moving Assistance',
  'Other',
]

export default function Requests() {
  const { user } = useAuth()
  const { requests, loading, error } = useRequests(user?.uid)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({ service: SERVICE_OPTIONS[0], description: '' })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!form.description.trim()) {
      setFormError('Please describe what you need.')
      return
    }
    setSubmitting(true)
    try {
      await createRequest({
        userId: user.uid,
        userEmail: user.email,
        service: form.service,
        description: form.description.trim(),
      })
      setForm({ service: SERVICE_OPTIONS[0], description: '' })
      setIsModalOpen(false)
    } catch (err) {
      setFormError(getFriendlyErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>My Requests</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          New request
        </Button>
      </div>

      {loading && <LoadingSpinner label="Loading your requests…" />}
      {error && <p className="error-text" role="alert">{error}</p>}

      {!loading && !error && requests.length === 0 && (
        <EmptyState
          title="No requests yet"
          description="Submit your first service request to get started."
          action={<Button variant="primary" onClick={() => setIsModalOpen(true)}>New request</Button>}
        />
      )}

      <div className="grid" style={{ gap: '0.9rem' }}>
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>

      <Modal title="New Service Request" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="service">Service type</label>
            <select id="service" name="service" value={form.service} onChange={handleChange}>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={form.description}
              onChange={handleChange}
            />
          </div>
          {formError && (
            <p className="error-text" role="alert">
              {formError}
            </p>
          )}
          <Button type="submit" variant="primary" fullWidth loading={submitting}>
            Submit request
          </Button>
        </form>
      </Modal>
    </div>
  )
}
