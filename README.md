# ServiceHub

A React + Vite + Firebase web app for submitting and managing service
requests, with a user dashboard and an admin panel.

## 1. Project structure

```
src/
  components/     Reusable UI: Navbar, Footer, Button, Modal, NotificationBell,
                   ProtectedRoute, AdminRoute, RequestCard, StatusBadge,
                   LoadingSpinner, EmptyState
  pages/          Route-level pages (Home, Services, About, Contact,
                   SignIn, SignUp, Dashboard, admin pages, NotFound)
  pages/dashboard Requests, Notifications, Profile (user dashboard)
  pages/admin     Admin overview + AdminRequests
  layouts/        MainLayout (public), DashboardLayout (user/admin)
  firebase/       config.js (init), auth.js, firestore.js (data access)
  hooks/          useAuth (auth context), useRequests, useNotifications
  utils/          errorMessages.js, formatDate.js
  App.jsx         Route definitions
  main.jsx        App entry point
  index.css       Global styles
firestore.rules          Firestore security rules
firestore.indexes.json   Composite indexes
firebase.json             Firebase Hosting + Firestore config
vercel.json / netlify.toml   SPA rewrite config for those hosts
.env.example              Environment variable template
```

## 2. Firebase project setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and
   create a new project (or use an existing one).
2. **Enable Authentication**: Build > Authentication > Get started >
   Sign-in method > enable **Email/Password**.
3. **Enable Firestore**: Build > Firestore Database > Create database
   (start in production mode — the rules in `firestore.rules` will govern
   access).
4. **Register a Web App**: Project Settings (gear icon) > General >
   scroll to "Your apps" > click the `</>` (Web) icon > register an app
   (no need to set up Firebase Hosting at this step if you don't want to).
5. Firebase will show you a `firebaseConfig` object. Copy each value into
   your `.env` file (see below) — that's exactly where the values for
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc. come from.

## 3. Environment variables

```bash
cp .env.example .env
```

Fill in `.env` with the values from step 5 above:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

`.env` is git-ignored — never commit real credentials.

## 4. Run locally

```bash
npm install
npm run dev
```

Visit the printed local URL (typically `http://localhost:5173`).

## 5. Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## 6. Firestore collection structure

**`users/{uid}`**
```
uid: string
name: string
email: string
role: "user" | "admin"
createdAt: timestamp
```

**`requests/{requestId}`**
```
userId: string
userEmail: string
service: string
description: string
status: "pending" | "in-progress" | "completed" | "rejected"
createdAt: timestamp
updatedAt: timestamp
```

**`notifications/{notificationId}`**
```
userId: string
title: string
message: string
read: boolean
createdAt: timestamp
```

## 7. Firestore security rules

Rules live in `firestore.rules` (deploy with the Firebase CLI — see
below). Summary of what they enforce:

- A user can only read/write their **own** `users/{uid}` doc, and can
  never set their own `role` to `admin` (prevents privilege escalation).
  Admins can read/write any user doc.
- A user can create and read their **own** requests; only admins can
  read every request or change a request's `status`.
- A user can only create/read their own notifications and can only ever
  update the `read` field on them; only admins can create notifications
  (this happens automatically when an admin changes a request's status).

Deploy rules and indexes with the [Firebase CLI](https://firebase.google.com/docs/cli):

```bash
npm install -g firebase-tools
firebase login
firebase use --add        # select your Firebase project
firebase deploy --only firestore:rules,firestore:indexes
```

## 8. Creating the first admin account

There's no UI for this by design — the rules explicitly block a user
from setting their own role to `admin`. To promote your first admin:

**Option A — Firebase Console (easiest)**
1. Sign up for a normal account in the app.
2. Go to Firebase Console > Firestore Database.
3. Open `users/{your-uid}` (find the uid in Authentication > Users).
4. Edit the `role` field from `"user"` to `"admin"`.
5. Sign out and back in (or refresh) — you'll now see the **Admin** link
   in the navbar and can access `/admin`.

**Option B — Firebase CLI / Admin SDK script** (for repeatable setups)
```js
// promote-admin.mjs — run with: node promote-admin.mjs <uid>
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
// Requires a service account key — see Firebase Console >
// Project Settings > Service accounts > Generate new private key
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' }

initializeApp({ credential: cert(serviceAccount) })
const uid = process.argv[2]
await getFirestore().doc(`users/${uid}`).update({ role: 'admin' })
console.log(`Promoted ${uid} to admin.`)
```

## 9. Deployment

### Vercel
1. Push this project to a Git repository.
2. Import it in the Vercel dashboard (Framework preset: Vite).
3. Add the six `VITE_FIREBASE_*` environment variables in Vercel's
   Project Settings > Environment Variables.
4. Deploy. `vercel.json` already handles SPA rewrites so client-side
   routes like `/dashboard` work on refresh.

### Netlify
1. Push to a Git repository and "Add new site" in Netlify from that repo,
   or run `netlify deploy` from the CLI.
2. Build command `npm run build`, publish directory `dist` (already set
   in `netlify.toml`).
3. Add the six `VITE_FIREBASE_*` environment variables in Site settings
   > Environment variables.
4. `netlify.toml` already includes the SPA redirect rule.

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```
`firebase.json` is already configured to serve `dist` with SPA rewrites.
Set your `VITE_FIREBASE_*` values in `.env` before building — Vite bakes
them into the build at build time.

## 10. Feature checklist

- [x] Public routes: `/`, `/services`, `/about`, `/contact`
- [x] Auth routes: `/signin`, `/signup`
- [x] Protected user routes: `/dashboard`, `/dashboard/requests`,
      `/dashboard/notifications`, `/dashboard/profile`
- [x] Protected admin routes: `/admin`, `/admin/requests`
- [x] Unauthenticated users redirected to `/signin` on protected routes
- [x] Non-admin users redirected away from `/admin*`
- [x] Email/password sign up + sign in via Firebase Auth
- [x] User profile doc auto-created in Firestore on sign up (`role: "user"`)
- [x] Create / view service requests (real-time via `onSnapshot`)
- [x] Admin can view all requests, filter by status, update status, delete
- [x] Notifications created automatically when an admin updates a request
- [x] Notification bell with unread count
- [x] Friendly error messages for common Firebase error codes
- [x] Environment-variable-based Firebase config, `.env.example` provided
- [x] Firestore security rules enforcing per-user access + admin checks
- [x] Deployment config for Vercel, Netlify, and Firebase Hosting
- [x] Semantic HTML, labeled inputs, keyboard-accessible controls, focus states
