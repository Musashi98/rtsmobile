import firebaseConfig from "firebase.config"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
