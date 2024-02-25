import AsyncStorage from "@react-native-async-storage/async-storage"
import AppUser from "root/domain/auth/types/AppUser"
import Event from "root/domain/events/types/Event"


type GetLastSessionDataModel = () => Promise<{ user: AppUser | null, event: Event | null }>
type SetSessionUserModel = (user: AppUser | null) => Promise<void>
type SetSessionEventModel = (event: Event | null) => Promise<void>


export const getLastSessionData: GetLastSessionDataModel = async () => {
    const lastSessionUser = await AsyncStorage.getItem("user")
    const lastSessionEvent = await AsyncStorage.getItem("event")

    let user: AppUser | null = null
    let event: Event | null = null

    if (lastSessionUser) {
        user = JSON.parse(lastSessionUser) as AppUser
    }

    if (lastSessionEvent) {
        event = JSON.parse(lastSessionEvent) as Event
    }

    return { user, event }
}

export const setSessionUser: SetSessionUserModel = async (user: AppUser | null) => {
    await AsyncStorage.setItem("user", JSON.stringify(user))
}

export const setSessionEvent: SetSessionEventModel = async (event: Event | null) => {
    await AsyncStorage.setItem("event", JSON.stringify(event))
}