import { create } from 'zustand'
interface FeatureState {
    offline: boolean
    setOffline: (offline: boolean) => void
}

export const useFeatureStore = create<FeatureState>(set => ({
    offline: false,
    setOffline: (offline: boolean) => set({ offline }),
}))
