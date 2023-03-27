import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type styleStore = {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useStyleStore = create<styleStore>()(
  persist(
    (set, get) => ({
      darkMode: false,
      toggleDarkMode: () => set({ darkMode: get().darkMode === true ? false : true}),
    }),
    {
      name: 'style-storage', // name of the item in the storage (must be unique)
    }
  )
)
