import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface Input
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  component: ReactNode;
}

export default function Input({
  value,
  onChange,
  component,
  placeholder,
}: Input) {
  return (
    <div className="gap-4 flex items-center relative mb-3">
      <input
        type="text"
        className="w-96 py-4 px-5 rounded-md border border-primary-default-Solid bg-transparent text-center focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {component}
    </div>
  );
}
