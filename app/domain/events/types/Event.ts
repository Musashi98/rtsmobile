import { EventPicture } from "./EventPicture";

export type Event = {
    id: string;
    code: string;
    name: string;
    date: Date;
    active: boolean;
    picture: EventPicture;
}