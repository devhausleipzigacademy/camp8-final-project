import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
export default function SignIn() {
	const [email, setEmail] = useState("");
	const { data: session } = useSession();
	const { push } = useRouter();

	const handleSignInGoogle = () => signIn("google");
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	const emailCheck = new RegExp(`[A-z]+@[a-z]+.com`);
	console.log(session);

	if (session) {
		push("/");
	}

	return (
		<div className="h-screen flex flex-col justify-around items-center">
			<div></div>
			<div className="w-96 aspect-square bg-secondary-default"></div>
			<div className="flex flex-col justify-around">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className=" w-96 p-2 m-2 ml-22 rounded-md border-2 border-primary-transparent focus:outline-primary-default-Solid"
						placeholder="Enter Email"
						onChange={(e) => setEmail(e.target.value)}
					/>

					{emailCheck.test(email) && (
						<button className="text-text-white p-2 h-7 rounded-md bg-primary-default-Solid">
							Send Link to email
						</button>
					)}
				</form>
				<span className="text-center">or</span>
				<a
					href="#"
					className="p-3 rounded-md text-center text-primary-default-Solid underline"
					onClick={handleSignInGoogle}
				>
					Login with Google
				</a>
			</div>
		</div>
	);
}
