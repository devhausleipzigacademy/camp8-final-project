import { EyeIcon } from "@heroicons/react/24/solid";

type InputProps = {
	type: string;
};

export default function Input(props: InputProps) {
	// let placeholder = "";

	// if (props.type === "email") {
	// 	placeholder = "Email";
	// } else if (props.type === "password") {
	// 	placeholder = "Password";
	// }

	let placeholder: string = props.type === "email" ? "Email" : "Password";

	return (
		<>
			<label className="relative">
				<input
					className="flex items-center text-center gap-3 pr-8 border border-primary-default-background focus:border-[#7751C7]focus:border-2 invalid:border-x-ux-error ring-[#7751C7] rounded-md py-3 px-5 w-full"
					type={props.type}
					placeholder={placeholder}
				/>
				{props.type === "email" &&
					null ===
					(
						<EyeIcon className="absolute right-0 flex h-full top-0 mr-2 justify-center w-6 aspect-square " />
					)}
			</label>
		</>
	);
}
