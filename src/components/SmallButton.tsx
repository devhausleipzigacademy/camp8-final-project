import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface SmallButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  disabled?: boolean;
}

export function SmallButton({ label, disabled, ...props }: SmallButtonProps) {
  return (
    <button
      className={
        "h-14 enabled:bg-grad-default px-1 py-2.5 text-center text-text-white text-secondary min-w-min rounded-md w-20 disabled:cursor-not-allowed disabled:bg-ux-inactive"
      }
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
}
