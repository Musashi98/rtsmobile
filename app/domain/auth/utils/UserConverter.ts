import { User } from "firebase/auth";
import AppUser from "../types/User";


export const fromFirebaseUserToAppUser = async (user: User): Promise<AppUser> => {

    const accessToken = await user.getIdToken()

    return {
        id: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        accessToken,
        refreshToken: user.refreshToken
    }
}