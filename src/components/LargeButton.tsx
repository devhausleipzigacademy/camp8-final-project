import type { AppProps } from "next/app";
import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { FiLock } from "react-icons/fi";

export interface LargeButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "primary" | "secondary";
  label: string;
  disabled: boolean;
}

export function LargeButton({
  variant,
  label,
  disabled,
  ...props
}: LargeButtonProps) {
	return (
		<button
			className={clsx(
				"flex items-center w-full text-center border-box rounded-md disabled:cursor-not-allowed",
				variant == "primary"
					? "enabled:bg-gradient-bl-primary-background text-button-large px-5 py-3 justify-around text-text-white disabled:bg-ux-inactive enabled:active:shadow-primaryButtonShadow"
					: "bg-text-white border-2 text-button-bold px-6 py-3.5 justify-center text-primary-default-Solid  disabled:text-ux-inactive enabled:active:shadow-secondaryButtonShadow"
			)}
			disabled={disabled}
			{...props}
		>
			<div className="h-6 aspect-square"></div>
			{label}
			{variant === "primary" && (
				<FiLock className="button-large aspect-square" />
			)}
		</button>
	);
}
