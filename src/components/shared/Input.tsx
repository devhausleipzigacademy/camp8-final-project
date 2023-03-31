import clsx from "clsx";
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Edit } from "react-feather";

export interface Input
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  placeholder?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ value, onChange, placeholder, className }: Input) {
  return (
    <div className="gap-4 flex items-center relative mb-3">
      <input
        type="text"
        className={clsx(className, "py-3 px-5 rounded-md border border-primary-default-Solid bg-transparent text-center focus:outline-none")}
        placeholder={placeholder ?? "Type here..."}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <Edit className="absolute top-1/2 -translate-y-1/2 right-4 text-primary-default-Solid pointer-events-none" />
    </div>
  );
}
