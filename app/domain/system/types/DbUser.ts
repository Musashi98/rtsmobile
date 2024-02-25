import { EventPicture } from "root/domain/events/types/EventPicture"


export type DbUser = {
    id: string,
    name: string,
    email: string,
    selfies: EventPicture[],
}