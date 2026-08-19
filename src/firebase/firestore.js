import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

/* ---------------------------------------------------------------- *
 *  Service Requests
 * ---------------------------------------------------------------- */

/**
 * Subscribe to the current user's own requests, newest first.
 * Returns an unsubscribe function.
 */
export function subscribeToUserRequests(uid, onData, onError) {
  const q = query(
    collection(db, 'requests'),
    where('userId', '==', uid),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  )
}

/**
 * Subscribe to ALL requests (admin view), newest first.
 */
export function subscribeToAllRequests(onData, onError) {
  const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  )
}

export async function createRequest({ userId, userEmail, service, description }) {
  return addDoc(collection(db, 'requests'), {
    userId,
    userEmail,
    service,
    description,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateRequestStatus(requestId, status) {
  return updateDoc(doc(db, 'requests', requestId), {
    status,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteRequest(requestId) {
  return deleteDoc(doc(db, 'requests', requestId))
}

/* ---------------------------------------------------------------- *
 *  Notifications
 * ---------------------------------------------------------------- */

export function subscribeToNotifications(uid, onData, onError) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', uid),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  )
}

export async function createNotification({ userId, title, message }) {
  return addDoc(collection(db, 'notifications'), {
    userId,
    title,
    message,
    read: false,
    createdAt: serverTimestamp(),
  })
}

export async function markNotificationRead(notificationId) {
  return updateDoc(doc(db, 'notifications', notificationId), { read: true })
}
