import { FiEdit } from "react-icons/fi";
import { SmallButton } from "./SmallButton";

type InputProps = {
	type: string;
};

export default function Input(props: InputProps) {
	let placeholder: string = props.type === "email" ? "Email" : "New name";

	return (
		<>
			<label className="relative">
				<input
					className="flex items-center text-center gap-3 pr-8 border border-primary-default-background focus:border-2 invalid:border-ux-error invalid:border-2
					  rounded-md py-3 px-5 w-full"
					type={props.type}
					placeholder={placeholder}
				/>

				{props.type === "New name" && (
					<>
						{/* <FiEdit className="absolute right-0 flex h-full top-0 mr-2 justify-center w-6 aspect-square " /> */}
						<div className="absolute right-0 flex h-full top-0 items-center mr-1 justify-center">
							<SmallButton label="Update" />
						</div>
					</>
				)}
			</label>
		</>
	);
}
