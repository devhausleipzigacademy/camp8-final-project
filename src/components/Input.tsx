import { Dispatch, SetStateAction } from "react";
import { SmallButton } from "./SmallButton";

export type UpdateInputProps = {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onClick: any;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function Input(props: UpdateInputProps) {
  let placeholder: string = props.type === "email" ? "Email" : "New name";

  return (
    <>
      <label className="relative flex">
        <input
          className="dark:text-white flex items-center text-center pr-8 invalid:border-ux-error focus:outline-primary-default-Solid focus:outline-2 border border-primary-default-Solid rounded-lg py-5  w-full h-auto"
          type={props.type}
          placeholder={props.placeholder}
          value={props.name}
          onChange={(e) => props.setValue(e.target.value)}
        />

        {props.type === "New name" && (
          <div className="absolute flex self-center right-1 items-center justify-center rounded-lg">
            <SmallButton label="Update" onClick={() => props.onClick(name)} />
          </div>
        )}
      </label>
    </>
  );
}
