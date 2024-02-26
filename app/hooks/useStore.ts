import { AppUser } from "root/domain/auth/types/AppUser";
import { AppEvent } from "root/domain/events/types/AppEvent";
import { setSessionEvent, setSessionUser } from "root/domain/system/services/LocalStorage";
import { create } from "zustand";

type State = {
    user: AppUser | null,
    event: AppEvent | null
}

type Actions = {
    setUser: (user: AppUser | null) => Promise<void>,
    setEvent: (event: AppEvent | null) => Promise<void>
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