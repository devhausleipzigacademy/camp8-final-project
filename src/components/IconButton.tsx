import React from "react";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";

type IconButton = {
	classes: string;
};

export function IconButton(props: IconButton) {
	return (
		<Link href="/account">
			<FiUser className={clsx(" text-primary-default-Solid", props.classes)} />
		</Link>
	);
}
