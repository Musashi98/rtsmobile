import { FirebaseError } from "root/domain/system/utils/FirebaseErrors"
import { firebaseRegister, firebaseLogin } from "root/domain/system/services/FirebaseAuth"
import { AppUser } from "../types/AppUser"


export const register = async (name: string, email: string, password: string): Promise<AppUser | FirebaseError> => {
    return await firebaseRegister(name, email, password)
}

export const login = async (email: string, password: string): Promise<AppUser | FirebaseError> => {
    return await firebaseLogin(email, password)
}