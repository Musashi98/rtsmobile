import { FirebaseError, extractFirebaseError } from "../utils/FirebaseErrors"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { firebaseAuth } from "./FirebaseInstances"
import { AppUser } from "root/domain/auth/types/AppUser"
import { DbUser } from "root/domain/system/types/DbUser"
import { firebaseGetUser, firebaseUpsertUser } from "./FirebaseDb"


export const firebaseRegister = async (name: string, email: string, password: string): Promise<AppUser | FirebaseError> => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password)

        await updateProfile(userCredentials.user, {
            displayName: name,
        })

        const registeredUser: AppUser = {
            id: userCredentials.user.uid,
            email: email,
            name,
            selfies: [],
            refreshToken: userCredentials.user.refreshToken,
            accessToken: await userCredentials.user.getIdToken()
        }

        const upsertError = await firebaseUpsertUser(registeredUser)

        if (upsertError) {
            return upsertError
        }

        return registeredUser
    }
    catch (e: any) {
        if (e.message.contains("("))
            return extractFirebaseError(e.message)

        return e.message
    }
}

export const firebaseLogin = async (email: string, password: string): Promise<AppUser | FirebaseError> => {
    try {
        const userCredentials = await signInWithEmailAndPassword(firebaseAuth, email, password)

        const dbUserData = await firebaseGetUser(userCredentials.user.uid)

        if ("error" in dbUserData) {
            return dbUserData
        }

        return {
            ...dbUserData,
            accessToken: await userCredentials.user.getIdToken(),
            refreshToken: userCredentials.user.refreshToken
        }
    }
    catch (e: any) {
        if (e.message.contains("("))
            return extractFirebaseError(e.message)

        return e.message
    }
}