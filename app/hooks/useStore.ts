import User from "root/domain/auth/types/User";
import { create } from "zustand";

type State = {
    user: User | null,
    event: Event | null
}

type Actions = {
    setUser: (user: User | null) => void,
    setEvent: (event: Event | null) => void
}

const useStore = create<State & Actions>((set) => ({
    user: null,
    event: null,
    setUser: (user) => set(() => ({ user })),
    setEvent: (event) => set(() => ({ event })),
}))

export default useStore