import { EventPicture } from "root/domain/events/types/EventPicture"

export type AppUser = {
    id: string,
    name: string,
    email: string,
    selfies: EventPicture[],
    accessToken: string,
    refreshToken: string
}