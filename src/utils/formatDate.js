/**
 * Formats a Firestore Timestamp (or Date, or null while server timestamp
 * is pending) into a readable string.
 */
export function formatDate(timestamp) {
  if (!timestamp) return 'Just now'
  const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp)
  if (Number.isNaN(date.getTime())) return 'Just now'
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
