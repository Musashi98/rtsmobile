import { EventPicture } from "root/domain/auth/types/UserSelfie"


export type DbUser = {
    id: string,
    name: string,
    email: string,
    selfies: EventPicture[],
}