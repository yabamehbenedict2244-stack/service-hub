import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'

/**
 * Create a new account, set the display name, and create the matching
 * /users/{uid} Firestore document with a default "user" role.
 */
export async function registerUser({ name, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName: name })

  await setDoc(doc(db, 'users', credential.user.uid), {
    uid: credential.user.uid,
    name,
    email,
    role: 'user',
    createdAt: serverTimestamp(),
  })

  return credential.user
}

export async function loginUser({ email, password }) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return credential.user
}

export async function logoutUser() {
  await signOut(auth)
}

/**
 * Fetch the Firestore profile document (contains role) for a given uid.
 */
export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, 'users', uid))
  if (!snapshot.exists()) return null
  return snapshot.data()
}
