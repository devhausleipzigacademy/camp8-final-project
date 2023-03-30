import { ToggleDarkmode } from "@/components/ToggleDarkmode";
import { ToggleView } from "@/components/ToggleView";
import Head from "next/head";

export default function Settings() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<hr className="my-5 mx-8 bg-primary-transparent" />
			<ToggleDarkmode />
			<ToggleView />
		</>
	);
}
