import create from "zustand";
import { persist } from "zustand/middleware";
import { AuthType } from "@/pages/api/createUser";

type AuthStore = {
	infos: AuthType;
	setInfos: (inputInfos: AuthType) => void;
	clearAuth: () => void;
};

const initState = {
	infos: {
		expired: "",
		user: {
			image: "",
			name: "",
			email: "",
		},
	},
};
export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			...initState,
			setInfos: (inputInfos: AuthType) => set({ infos: inputInfos }),
			clearAuth: () => set({ ...initState }),
		}),
		{
			name: "page-auth",
		}
	)
);
