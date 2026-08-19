import { useState } from 'react'
import { useRequests } from '../../hooks/useRequests'
import { updateRequestStatus, deleteRequest, createNotification } from '../../firebase/firestore'
import { getFriendlyErrorMessage } from '../../utils/errorMessages'
import RequestCard from '../../components/RequestCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import Button from '../../components/Button'

const STATUS_OPTIONS = ['pending', 'in-progress', 'completed', 'rejected']

export default function AdminRequests() {
  const { requests, loading, error } = useRequests(null, { all: true })
  const [filter, setFilter] = useState('all')
  const [actionError, setActionError] = useState('')

  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter)

  const handleStatusChange = async (request, status) => {
    setActionError('')
    try {
      await updateRequestStatus(request.id, status)
      await createNotification({
        userId: request.userId,
        title: 'Request status updated',
        message: `Your request "${request.service}" is now ${status.replace('-', ' ')}.`,
      })
    } catch (err) {
      setActionError(getFriendlyErrorMessage(err))
    }
  }

  const handleDelete = async (requestId) => {
    setActionError('')
    try {
      await deleteRequest(requestId)
    } catch (err) {
      setActionError(getFriendlyErrorMessage(err))
    }
  }

  return (
    <div>
      <h1 className="page-title">All Requests</h1>

      <div className="form-group" style={{ maxWidth: 220, marginBottom: '1.25rem' }}>
        <label htmlFor="filter">Filter by status</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading && <LoadingSpinner label="Loading requests…" />}
      {(error || actionError) && (
        <p className="error-text" role="alert">
          {error || actionError}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No requests found" description="Try a different filter." />
      )}

      <div className="grid" style={{ gap: '0.9rem' }}>
        {filtered.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            footer={
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <select
                  aria-label={`Update status for ${request.service}`}
                  value={request.status}
                  onChange={(e) => handleStatusChange(request, e.target.value)}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: '1px solid var(--color-border)' }}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Button variant="danger" onClick={() => handleDelete(request.id)}>
                  Delete
                </Button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  )
}
