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
			className={
				"enabled:bg-grad-default text-center text-text-white text-button-small rounded-md w-16 h-11 disabled:cursor-not-allowed disabled:bg-ux-inactive"
			}
			disabled={disabled}
			{...props}
		>
			<div></div>
			{label}
		</button>
	);
}
