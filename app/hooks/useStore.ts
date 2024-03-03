import { AppUser } from "root/domain/auth/types/AppUser";
import { UserSelfie } from "root/domain/auth/types/UserSelfie";
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
    setSelfieParams: (params: SelfieParams) => void,
    pushSelfie: (selfie: UserSelfie, avoidSave?: boolean) => void,
    updateUser: (params: { [key: string]: AppUser[keyof AppUser] }, avoidSave?: boolean) => void
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
    },
    pushSelfie: (selfie: UserSelfie, avoidSave?: boolean) => {
        set(state => {
            const newUser = { ...(state.user as AppUser) }

            newUser.selfies.push(selfie)

            if (!avoidSave) {
                setSessionUser(newUser)
            }

            return ({ user: newUser })
        })
    },
    updateUser: (params: { [key: string]: AppUser[keyof AppUser] }, avoidSave?: boolean) => {
        set(state => {
            const newUser = { ...(state.user as AppUser), ...params }

            if (!avoidSave) {
                setSessionUser(newUser)
            }

            return ({ user: newUser })
        })
    }
}))

export default useStore