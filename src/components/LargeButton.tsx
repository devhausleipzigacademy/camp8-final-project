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
	disabled?: boolean;
}

// Need to add the onPress state for both primary and secondary.
// first must research how to do this on css

export function LargeButton({
	variant,
	label,
	disabled,
	...props
}: LargeButtonProps) {
	return (
		<button
			/* 		className={clsx(
				"flex items-center text-center border-box rounded-lg w-full h-12",
				variant == "primary" && !disabled
					? "bg-primary-default-background button-large justify-around text-text-white active:shadow-buttonShadow"
					: variant == "primary" && disabled
					? "bg-ux-inactive justify-around button-large text-text-white"
					: variant == "secondary" && !disabled
					? "bg-text-white border-2 button-bold justify-center text-primary-default-Solid active:shadow-buttonShadow"
					: "text-ux-inactive border-2 button-bold justify-center"
			)}
			{...props} */
			className={clsx(
				"flex items-center text-center border-box rounded-lg w-full h-12 active:shadow-buttonShadow disabled:cursor-not-allowed",
				variant == "primary"
					? "bg-text-white button-large justify-around text-text-white disabled:bg-ux-inactive"
					: "bg-text-white border-2 button-bold justify-center text-primary-default-Solid disabled:text-ux-inactive"
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
