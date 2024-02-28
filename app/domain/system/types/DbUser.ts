import { UserSelfie } from "root/domain/auth/types/UserSelfie";


export type DbUser = {
    id: string,
    name: string,
    email: string,
    selfies: UserSelfie[],
}