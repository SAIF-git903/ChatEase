import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCYKs4BS8TBopDj7w0T5cfYN-DWJon52gQ",
  authDomain: "chatease-921db.firebaseapp.com",
  projectId: "chatease-921db",
  storageBucket: "chatease-921db.appspot.com",
  messagingSenderId: "356520404001",
  appId: "1:356520404001:web:6127615a85c1288ae92f60"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = initializeFirestore(app, { experimentalForceLongPolling: true })

export { db, auth }


