import { create } from "zustand";
import { persist } from "zustand/middleware";

type fontStore = {
  isFontSizeBig: boolean;
  setSize: () => void;
};

export const useSzieStore = create<fontStore>()(
  persist(
    (set, get) => ({
      isFontSizeBig: false,
      setSize: () => set({ isFontSizeBig: !get().isFontSizeBig }),
    }),
    {
      name: "isFontSizeBig",
    }
  )
);
