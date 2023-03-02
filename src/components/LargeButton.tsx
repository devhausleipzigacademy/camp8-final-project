import type { AppProps } from "next/app";
import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { MdOutlineLock } from "react-icons/md";

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
				"flex items-center text-center border-box rounded-md w-full h-12 disabled:cursor-not-allowed",
				variant == "primary"
					? "enabled:bg-grad-default button-large justify-around text-text-white disabled:bg-ux-inactive enabled:active:shadow-primaryButtonShadow"
					: "bg-text-white border-2 button-bold justify-center text-primary-default-Solid  disabled:text-ux-inactive enabled:active:shadow-secondaryButtonShadow"
			)}
			disabled={disabled}
			{...props}
		>
			<div></div>
			{label}
			{variant === "primary" && (
				<MdOutlineLock className="button-large aspect-square" />
			)}
		</button>
	);
}
