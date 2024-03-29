import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage"
import { firebaseStorage } from "./FirebaseInstances"
import { FirebaseError, extractFirebaseError } from "../utils/FirebaseErrors"
import { firebaseGetUser, firebaseUpsertUser } from "./FirebaseDb"
import { UserSelfie } from "root/domain/auth/types/UserSelfie"


export const firebaseUploadUserSelfie = async (userId: string, eventCode: string, file: Blob, name: string): Promise<UserSelfie | FirebaseError> => {
    try {
        const storageRef = ref(firebaseStorage, name)

        await uploadBytes(storageRef, file)

        const resourceUrl = await getDownloadURL(storageRef)

        const getUserResult = await firebaseGetUser(userId)

        if ("error" in getUserResult) {
            return getUserResult
        }

        getUserResult.selfies.push({ event: eventCode, picture: resourceUrl, description: "" })

        const upsertUserResult = await firebaseUpsertUser(getUserResult)

        if (upsertUserResult) {
            return upsertUserResult
        }

        return { event: eventCode, picture: resourceUrl, description: "" }
    }
    catch (e: any) {
        return extractFirebaseError("Firebase Storage", e.message)
    }
}

export const firebaseDeleteSelfies = async (selfies: string[]): Promise<FirebaseError | void> => {
    try {
        for (const url of selfies) {
            const storageRef = ref(firebaseStorage, url)

            await deleteObject(storageRef)
        }
    }
    catch (e: any) {
        return extractFirebaseError("Firebase Storage", e.message)
    }
}