import { create } from 'zustand'
interface CalledState {
    called: boolean
    setCalled: (called: boolean) => void
}

export const useCalledStore = create<CalledState>(set => ({
    called: true,
    setCalled: (called: boolean) => set({ called }),
}))
