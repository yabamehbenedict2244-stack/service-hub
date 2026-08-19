import { useEffect, useState } from 'react'
import { subscribeToNotifications } from '../firebase/firestore'
import { getFriendlyErrorMessage } from '../utils/errorMessages'

export function useNotifications(uid) {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!uid) {
      setNotifications([])
      setLoading(false)
      return undefined
    }

    setLoading(true)
    const unsubscribe = subscribeToNotifications(
      uid,
      (data) => {
        setNotifications(data)
        setLoading(false)
        setError('')
      },
      (err) => {
        setError(getFriendlyErrorMessage(err))
        setLoading(false)
      }
    )
    return unsubscribe
  }, [uid])

  const unreadCount = notifications.filter((n) => !n.read).length

  return { notifications, unreadCount, loading, error }
}
