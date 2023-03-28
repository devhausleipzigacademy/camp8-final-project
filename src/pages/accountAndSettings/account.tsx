import { LargeButton } from "@/components/LargeButton";
import { FiChevronLeft, FiUser } from "react-icons/fi";
import axios from "axios";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { useState } from "react";
import { UseMutateFunction } from "@tanstack/react-query";
import Link from "next/link";

export type SettingsProps = {
	user: User;
	refresh: UseMutateFunction<User, unknown, string, unknown>;
};

export type UpdateNameResponse = {
	name: string;
	userId: string;
};

export default function AccountView({ user, refresh }: SettingsProps) {
	const [inputName, setInputName] = useState("");

	const handleSignOut = () => {
		signOut({ redirect: true, callbackUrl: "/auth/signIn" });
	};
	const router = useRouter();
	const redirect = () => {
		router.push("/accountAndSettings/changeEmail");
	};

	async function updateName() {
		const bla = await axios.patch("http://localhost:3000/api/changeNameUser", {
			email: user.email,
			name: inputName,
		});
		return bla;
	}

	function clickHandler() {
		updateName();
		refresh(user.email as string);
		console.log(user.name);
	}

	return (
		<>
			<div className="px-8 flex flex-col h-full">
				<header className="w-full flex items-center h-10 pt-8"></header>
				<div className="w-full flex-grow flex flex-col justify-around">
					<div className="flex w-full flex-col items-center gap-5">
						{/* This section will change depending on the account status of the User */}
						<div>
							<FiUser size={28} />
						</div>
						<div className="text-primary-default-Solid font-heading text-4xl">
							Hey,&nbsp;
							{user?.name ? user.name : user?.email}
						</div>
						<div className="w-full flex flex-col gap-5">
							<Input
								type={"New name"}
								name={inputName}
								setValue={setInputName}
								value={""}
								placeholder={"New name"}
								onClick={clickHandler}
							></Input>
							{/* <SmallButton label="Update" /> */}

							<LargeButton
								variant="primary"
								label="Change E-Mail"
								onClick={redirect}
								disabled={false}
							/>
							<LargeButton
								variant="secondary"
								label="Log-Out"
								onClick={handleSignOut}
								disabled={false}
							/>
							<></>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
