import "@/styles/globals.css";
import type { AppProps } from "next/app";
import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface LargeButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant: "primary" | "secondary";
	label: string;
	disabled?: boolean;
}

export default function LargeButton({
	variant,
	label,
	disabled,
	...props
}: LargeButtonProps) {
	return (
		<button
			className={
				clsx(/* "text-center rounded-lg w-full",  variant === "primary" && !disabled ? */)
			}
			{...props}
		>
			{label}
		</button>
	);
}
