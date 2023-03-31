import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { FiLock } from "react-icons/fi";

export interface LargeButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "primary" | "secondary";
  disabled: boolean;
  className?: string;
}

export function LargeButton({ variant, disabled, className, ...props }: LargeButtonProps) {
  return (
    <button
      className={clsx(
        className,
        "flex items-center w-full text-center border-box rounded-md disabled:cursor-not-allowed",
        variant == "primary"
          ? "enabled:bg-grad-default text-button-large px-5 py-3 justify-between text-text-white disabled:bg-ux-inactive enabled:active:shadow-primaryButtonShadow"
          : "bg-text-white border-2 text-button-bold px-6 py-3.5 justify-center text-primary-default-Solid  disabled:text-ux-inactive enabled:active:shadow-secondaryButtonShadow"
      )}
      disabled={disabled}
      {...props}
    >
      <div className="h-6 aspect-square"></div>
      {props.children}
      {variant === "primary" && (
        <FiLock className="button-large aspect-square" />
      )}
    </button>
  );
}
