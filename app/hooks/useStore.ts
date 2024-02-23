import AppUser from "root/domain/auth/types/User";
import { setSessionEvent, setSessionUser } from "root/domain/system/services/LocalStorage";
import { create } from "zustand";

type State = {
    user: AppUser | null,
    event: Event | null
}

type Actions = {
    setUser: (user: AppUser | null) => Promise<void>,
    setEvent: (event: Event | null) => Promise<void>
}

const useStore = create<State & Actions>((set) => ({
    user: null,
    event: null,
    setUser: async (user) => {
        await setSessionUser(user)

        set(() => ({ user }))
    },
    setEvent: async (event) => {
        await setSessionEvent(event)

        set(() => ({ event }))
    },
}))

export default useStore