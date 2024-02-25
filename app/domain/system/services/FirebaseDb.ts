import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb } from "./FirebaseInstances";
import { AppUser } from "root/domain/auth/types/AppUser";
import UserConverter from "root/domain/auth/utils/UserConverter";
import { DbUser } from "root/domain/system/types/DbUser";
import { FirebaseError, extractFirebaseError } from "../utils/FirebaseErrors";


export const firebaseUpsertUser = async (user: AppUser): Promise<FirebaseError | void> => {
    const dbUser: DbUser = UserConverter.appUserToDbUser(user)

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