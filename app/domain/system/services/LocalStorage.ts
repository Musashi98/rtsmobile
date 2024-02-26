import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppUser } from "root/domain/auth/types/AppUser"
import { AppEvent } from "root/domain/events/types/AppEvent"


type GetLastSessionDataModel = () => Promise<{ user: AppUser | null, event: AppEvent | null }>
type SetSessionUserModel = (user: AppUser | null) => Promise<void>
type SetSessionEventModel = (event: AppEvent | null) => Promise<void>


export const getLastSessionData: GetLastSessionDataModel = async () => {
    const lastSessionUser = await AsyncStorage.getItem("user")
    const lastSessionEvent = await AsyncStorage.getItem("event")

    let user: AppUser | null = null
    let event: AppEvent | null = null

    if (lastSessionUser) {
        user = JSON.parse(lastSessionUser) as AppUser
    }

    if (lastSessionEvent) {
        event = JSON.parse(lastSessionEvent) as AppEvent
    }

    return { user, event }
}

export const setSessionUser: SetSessionUserModel = async (user: AppUser | null) => {
    await AsyncStorage.setItem("user", JSON.stringify(user))
}

export const setSessionEvent: SetSessionEventModel = async (event: AppEvent | null) => {
    await AsyncStorage.setItem("event", JSON.stringify(event))
}