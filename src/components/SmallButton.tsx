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
				"text-center rounded-md w-32 h-44 disabled:cursor-not-allowed"
			}
			disabled={disabled}
			{...props}
		>
			<div></div>
			{label}
		</button>
	);
}
