import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export default function Input({ ...props }: InputProps) {
	let placeholder: string;
	props.className = "bg-dark-light w-full";
	if (props.type === "email") {
		placeholder = "your@email.com";
	} else {
		placeholder = "enter your password";
	}
	return (
		<>
			<label className="focus-within:border-white-dimmed-heavy flex items-center gap-3 bg-dark-light border-2 rounded-md border-dark-light py-3 px-5 w-full">
				{props.type === "email" ? (
					<EnvelopeIcon className="w-6 aspect-square text-white-dimmed" />
				) : (
					<LockClosedIcon className="w-6 aspect-square text-white-dimmed" />
				)}
				<input {...props} />
			</label>{" "}
		</>
	);
}
