import { AppUser } from "root/domain/auth/types/AppUser";
import { AppEvent } from "root/domain/events/types/AppEvent";
import { setSessionEvent, setSessionUser } from "root/domain/system/services/LocalStorage";
import { SelfieParams } from "root/domain/system/types/SelfieParams";
import { create } from "zustand";

type State = {
    user: AppUser | null,
    event: AppEvent | null,
    selfieParams: SelfieParams | null
}

type Actions = {
    setUser: (user: AppUser | null, avoidSave?: boolean) => Promise<void>,
    setEvent: (event: AppEvent | null, avoidSave?: boolean) => Promise<void>,
    setSelfieParams: (params: SelfieParams) => void
}

const useStore = create<State & Actions>((set) => ({
    user: null,
    event: null,
    selfieParams: null,
    setUser: async (user, avoidSave) => {
        if (!avoidSave)
            await setSessionUser(user)

        set(() => ({ user }))
    },
    setEvent: async (event, avoidSave) => {
        if (!avoidSave)
            await setSessionEvent(event)

        set(() => ({ event }))
    },
    setSelfieParams: (params) => {
        set(() => ({ selfieParams: params }))
    }
}))

export default useStore