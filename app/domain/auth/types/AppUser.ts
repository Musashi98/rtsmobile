import { UserSelfie } from "root/domain/auth/types/UserSelfie"

export type AppUser = {
    id: string,
    name: string,
    email: string,
    selfies: UserSelfie[],
    accessToken: string,
    refreshToken: string
}