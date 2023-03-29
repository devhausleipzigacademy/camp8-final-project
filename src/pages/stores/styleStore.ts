import { create } from "zustand";
import { persist } from "zustand/middleware";

type styleStore = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

type fontStore = {
  size: boolean;
  setSize: () => void;
};

export const useStyleStore = create<styleStore>()(
  persist(
    (set, get) => ({
      darkMode: false,
      toggleDarkMode: () =>
        set({ darkMode: get().darkMode === true ? false : true }),
    }),
    {
      name: "style-storage", // name of the item in the storage (must be unique)
    }
  )
);

export const useSzieStore = create<fontStore>()(
  persist(
    (set, get) => ({
      size: false,
      setSize: () => set({ size: get().size === true ? false : true }),
    }),
    {
      name: "size-storage",
    }
  )
);
