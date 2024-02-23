import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import { app } from "root/domain/system/services/FirebaseInstance"
import { fromFirebaseUserToAppUser } from "../utils/UserConverter"


const auth = getAuth(app)

export const register = async (name: string, email: string, password: string) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(userCredentials.user, {
        displayName: name,
    })

    const appUser = await fromFirebaseUserToAppUser(userCredentials.user)

    return appUser
}

export const login = async (email: string, password: string) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)

    const appUser = await fromFirebaseUserToAppUser(userCredentials.user)

    return appUser
}