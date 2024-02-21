import AsyncStorage from "@react-native-async-storage/async-storage"
import User from "root/domain/auth/types/User"

type GetLastSessionData = () => Promise<{ user: User | null, event: Event | null }>

export const getLastSessionData: GetLastSessionData = async () => {
    const lastSessionUser = await AsyncStorage.getItem("user")
    const lastSessionEvent = await AsyncStorage.getItem("event")

    let user: User | null = null
    let event: Event | null = null

    if (lastSessionUser) {
        user = JSON.parse(lastSessionUser) as User
    }

    if (lastSessionEvent) {
        event = JSON.parse(lastSessionEvent) as Event
    }

    return { user, event }
}