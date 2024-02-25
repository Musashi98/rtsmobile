import AppUser from "root/domain/auth/types/User"
import { FirebaseError, extractFirebaseError } from "../utils/FirebaseErrors"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { firebaseAuth } from "./FirebaseInstances"
import { fromFirebaseUserToAppUser } from "root/domain/auth/utils/UserConverter"


export const firebaseRegister = async (name: string, email: string, password: string): Promise<AppUser | FirebaseError> => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password)

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

export const firebaseLogin = async (email: string, password: string): Promise<AppUser | FirebaseError> => {
    try {
        const userCredentials = await signInWithEmailAndPassword(firebaseAuth, email, password)

        const appUser = await fromFirebaseUserToAppUser(userCredentials.user)

        return appUser
    }
    catch (e: any) {
        return extractFirebaseError(e.message)
    }
}