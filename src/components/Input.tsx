<<<<<<< HEAD
export default function Input() {
	return (
		<>
			<div className="flex justify-center">
				<input
					className=" w-80 h-12 text-center border border-primary-default-Solid focus:outline-none  hover:border-primary-default-Solid active:border-primary-default-Solid invalid:border-ux-error invalid:border-2
					  rounded-md "
					type="email"
					placeholder="Email"
				/>
			</div>
		</>
	);
=======
import { FiEdit } from "react-icons/fi";

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
          <FiEdit className="absolute right-0 flex h-full top-0 mr-2 justify-center w-6 aspect-square " />
        )}
      </label>
    </>
  );
>>>>>>> main
}
