import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import { app } from "root/domain/system/services/FirebaseInstance"
import { fromFirebaseUserToAppUser } from "../utils/UserConverter"
import AppUser from "../types/User"
import { FirebaseError, extractFirebaseError } from "root/domain/system/utils/FirebaseErrors"


const auth = getAuth(app)

export const register = async (name: string, email: string, password: string): Promise<AppUser | FirebaseError> => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(userCredentials.user, {
            displayName: name,
        })

        const appUser = await fromFirebaseUserToAppUser(userCredentials.user)

        return appUser
    }
    catch (e: any) {
        return extractFirebaseError(e.message)
    }
}

export const login = async (email: string, password: string): Promise<AppUser | FirebaseError> => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)

        const appUser = await fromFirebaseUserToAppUser(userCredentials.user)

        return appUser
    }
    catch (e: any) {
        return extractFirebaseError(e.message)
    }
}