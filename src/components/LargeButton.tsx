import "@/styles/globals.css";
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
			className={clsx(
				"text-center rounded-lg w-full h-12 disabled:cursor-not-allowed",
				variant == "primary" && !disabled
					? "bg-primary-default-background text-text-white active:shadow-buttonShadow"
					: variant == "primary" && disabled
					? "bg-ux-inactive text-text-white"
					: variant == "secondary" && !disabled
					? "bg-text-white text-primary-default-Solid active:shadow-buttonShadow"
					: "bg-ux-inactive text-ux-inactive"
			)}
			{...props}
		>
			{label}
			{"primary" && (
				<MdOutlineLock className="absolute right-0 flex h-full top-0 mr-2 justify-center w-6 aspect-square" />
			)}
		</button>
	);
}
