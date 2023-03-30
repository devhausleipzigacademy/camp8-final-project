import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  image: string;
};

type AuthStore = {
  user: User | null;
  token: string;
  setUser: (user: User) => void;
  setToken: (tokenResponse: string) => void;
  clear: () => void;
};

const initialState = {
  user: {
    name: "",
    email: "",
    image: "",
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      token: "",
      setUser: (user) => set({ user }),
      setToken: (tokenResponse) => set({ token: tokenResponse }),
      clear: () => set({ ...initialState }),
    }),
    {
      name: "user-auth",
    }
  )
);
