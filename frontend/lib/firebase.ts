import { getApps, initializeApp, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

/**
 * Safely initialise Firebase.
 * If correct environment variables aren’t supplied, we fall back to
 * no-op mocks so the UI can still load in preview mode.
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Helpers ────────────────────────────────────────────────────────────
function createMock<T extends object>(name: string): T {
  return new Proxy(
    {},
    {
      get() {
        // Warn once per missing service call
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `[BookBridge] Tried to use Firebase ${name} without valid keys. ` +
              "Add your Firebase env vars to enable full functionality.",
          )
        }
        return () => {}
      },
    },
  ) as T
}

let app: FirebaseApp
let auth: Auth
let db: Firestore
let storage: FirebaseStorage

try {
  // Only attempt real initialisation when apiKey is present
  if (firebaseConfig.apiKey && !getApps().length) {
    app = initializeApp(firebaseConfig)
  } else if (firebaseConfig.apiKey) {
    app = getApp()
  } else {
    throw new Error("Missing Firebase API Key")
  }

  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
} catch (error) {
  // Fallback to mocks so pages that import auth/db/storage don’t crash
  console.error("[BookBridge] Firebase initialisation skipped:", (error as Error).message)
  app = {} as FirebaseApp
  auth = createMock<Auth>("Auth")
  db = createMock<Firestore>("Firestore")
  storage = createMock<FirebaseStorage>("Storage")
}

export { app, auth, db, storage }
