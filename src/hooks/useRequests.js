import { useEffect, useState } from 'react'
import { subscribeToUserRequests, subscribeToAllRequests } from '../firebase/firestore'
import { getFriendlyErrorMessage } from '../utils/errorMessages'

/**
 * Live-subscribes to requests. Pass { all: true } for the admin view,
 * otherwise it scopes to the given uid.
 */
export function useRequests(uid, { all = false } = {}) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!all && !uid) {
      setRequests([])
      setLoading(false)
      return undefined
    }

    setLoading(true)
    const onData = (data) => {
      setRequests(data)
      setLoading(false)
      setError('')
    }
    const onError = (err) => {
      setError(getFriendlyErrorMessage(err))
      setLoading(false)
    }

    const unsubscribe = all
      ? subscribeToAllRequests(onData, onError)
      : subscribeToUserRequests(uid, onData, onError)

    return unsubscribe
  }, [uid, all])

  return { requests, loading, error }
}
