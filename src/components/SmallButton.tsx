import type { AppProps } from "next/app";
import clsx from "clsx";
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
			className={clsx(
				"flex items-center text-center border-box rounded-lg w-full h-12 disabled:cursor-not-allowed",
				variant == "primary"
					? " bg-gradient-bl-primary-background button-large justify-around text-text-white disabled:bg-ux-inactive active:shadow-primaryButtonShadow"
					: "bg-text-white border-2 button-bold justify-center text-primary-default-Solid disabled:text-ux-inactive active:shadow-secondaryButtonShadow"
			)}
			disabled={disabled}
			{...props}
		>
			<div></div>
			{label}
		</button>
	);
}
