import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { Session } from "next-auth";
import Home from "../pages/home";

async function checkOrCreateUser(object: Session) {
	await axios
		.post("http://localhost:3000/api/createUser", object)
		.then((respuesta) => console.log(respuesta));
}

export default function Home1() {
	const { push } = useRouter();

	const { data: session } = useSession();
	useEffect(() => {
		if (!session) {
			push("/auth/signIn");
		} else checkOrCreateUser(session);
	}, [session]);

	const handleSignOut = () => {
		signOut({
			redirect: true,
			callbackUrl: "/auth/signIn",
		});
	};

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-red-600 text-4xl font-bold flex justify-center">
				Landing Page
			</h1>

			<div className="flex flex-row m-3 gap-4 items-center justify-center ">
				<button
					onClick={() => push("/auth/signIn")}
					className=" w-26 h-18 rounded-md bg-primary-default-Solid p-2"
				>
					Sign In
				</button>
				<button
					onClick={handleSignOut}
					className="w-26 h-18 rounded-md bg-primary-default-Solid p-2"
				>
					Sign Out
				</button>
			</div>
			<Home />
		</>
	);
}
