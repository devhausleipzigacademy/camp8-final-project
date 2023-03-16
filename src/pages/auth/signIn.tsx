import { Transition } from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Lock } from "react-feather";
import { Edit } from "react-feather";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const { data: session } = useSession();
	const { push } = useRouter();

	const handleSignInGoogle = () => signIn("google");
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signIn("email", { email });
	};
	const emailCheck = new RegExp(`[A-z]+@[a-z]+.com`);
	console.log(session);

	if (session) {
		push("/");
	}

	return (
		<div className="h-screen flex flex-col justify-around items-center bg-primary-transparent">
			<div></div>
			<div className="w-96 aspect-square bg-secondary-default"></div>
			<div className="flex flex-col justify-around items-center">
				<form onSubmit={handleSubmit} className="flex flex-col">
					<div className="flex  relative">
						<input
							type="text"
							className="w-96 p-2 m-2 ml-22 rounded-md border border-primary-default-Solid bg-transparent text-center focus:outline-none
							"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Edit className="w-6 h-6 absolute top-1/4 right-4 text-primary-default-Solid pointer-events-none" />
					</div>

					<Transition
						show={emailCheck.test(email)}
						enter="transform transition duration-400"
						enterFrom="opacity-0 scale-y-0"
						enterTo="opacity-100 scale-y-100"
						leave="transform duration-400 transition ease-in-out"
						leaveFrom="opacity-100 scale-y-100"
						leaveTo="opacity-0 scale-y-0"
					>
						<button className="w-96 p-2 m-2 ml-22 rounded-md bg-grad-default text-center text-text-white flex justify-between">
							<div className="w-6"></div>
							<div>get link</div>
							<Lock className="w-6 h-6" />
						</button>
					</Transition>
				</form>
				<div className="flex items-center gap-1 ">
					<div className="h-[2px] w-10 bg-secondary-default"></div>
					or
					<div className="h-[2px] w-10 bg-secondary-default"></div>
				</div>
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
