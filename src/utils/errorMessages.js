const FIREBASE_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in instead.',
  'auth/invalid-credential': 'That email or password is incorrect. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-not-found': 'No account found with that email.',
  'auth/wrong-password': 'That email or password is incorrect. Please try again.',
  'auth/weak-password': 'Password should be at least 6 characters long.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/popup-closed-by-user': 'The sign-in window was closed before finishing.',
  'auth/requires-recent-login': 'Please sign in again to complete this action.',
  'permission-denied': "You don't have permission to do that.",
  'unavailable': 'Service is temporarily unavailable. Please try again shortly.',
}

/**
 * Converts a Firebase error (auth or Firestore) into a friendly,
 * user-facing message. Falls back to a generic message for anything
 * not explicitly mapped.
 */
export function getFriendlyErrorMessage(error) {
  const code = error?.code || ''
  const normalized = code.replace(/^firestore\//, '')
  if (FIREBASE_ERROR_MESSAGES[code]) return FIREBASE_ERROR_MESSAGES[code]
  if (FIREBASE_ERROR_MESSAGES[normalized]) return FIREBASE_ERROR_MESSAGES[normalized]
  if (code) {
    return 'Something went wrong. Please try again.'
  }
  return error?.message || 'Something went wrong. Please try again.'
}
