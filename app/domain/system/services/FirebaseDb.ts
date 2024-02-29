import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb } from "./FirebaseInstances";
import { AppUser } from "root/domain/auth/types/AppUser";
import UserConverter from "root/domain/auth/utils/UserConverter";
import { DbUser } from "root/domain/system/types/DbUser";
import { FirebaseError, extractFirebaseError } from "../utils/FirebaseErrors";
import { AppEvent } from "root/domain/events/types/AppEvent";


export const firebaseUpsertUser = async (user: AppUser | DbUser): Promise<FirebaseError | void> => {
    const dbUser: DbUser = ("accessToken" in user) ? UserConverter.appUserToDbUser(user) : user

    try {
        await setDoc(doc(firebaseDb, "users", user.id), dbUser)
    }
    catch (e: any) {
        return extractFirebaseError(e.message)
    }
}

export const firebaseGetUser = async (id: string): Promise<DbUser | FirebaseError> => {
    try {
        const userDocSnap = await getDoc(doc(firebaseDb, "users", id))

        if (userDocSnap.exists()) {
            const user: DbUser = {
                id,
                name: userDocSnap.data().name,
                email: userDocSnap.data().email,
                selfies: userDocSnap.data().selfies
            }

            return user
        }
        else {
            const error: FirebaseError = { module: "firestore", error: "invalid-credentials" }

            return error
        }
    }
    catch (e: any) {
        return extractFirebaseError(e.message)
    }
}

export const firebaseUpsertEvent = async (name: string, code: string, dateNumber: number): Promise<FirebaseError | void> => {
    try {
        await setDoc(doc(firebaseDb, "events", code), {
            code,
            name,
            dateNumber,
            active: true
        })
    }
    catch (e: any) {
        return extractFirebaseError(e.message)
    }
}

export const firebaseGetEvent = async (code: string): Promise<AppEvent | FirebaseError> => {
    try {
        const eventResult = await getDoc(doc(firebaseDb, "events", code))

        if (eventResult.exists()) {
            const event: AppEvent = {
                code: eventResult.data().code,
                name: eventResult.data().name,
                dateNumber: eventResult.data().dateNumber,
                picture: eventResult.data().picture,
                active: eventResult.data().active,
                location: eventResult.data().location,
                description: eventResult.data().description
            }

            return event
        }
        else {
            const error: FirebaseError = { module: "firestore", error: "No event exists with that code" }

            return error
        }
    }
    catch (e: any) {
        return extractFirebaseError(e.message)
    }
}