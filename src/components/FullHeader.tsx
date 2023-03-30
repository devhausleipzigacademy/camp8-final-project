import React from "react";
import { IconButton } from "./IconButton";
import { FiUser } from "react-icons/fi";
import clsx from "clsx";
import Link from "next/link";

type FullHeader = {
	classes: string;
	name: string;
};

export function FullHeader(props: FullHeader) {
	return (
		<div className="flex justify-between items-center p-3">
			<h1
				className={clsx(
					"cards-title text-primary-default-Solid font-heading flex items-center",
					"flex justify-between items-center h-12",
					props.classes
				)}
			>
				Hey, beautiful {props.name}!
			</h1>
			<Link href={"/account"}>
				{/* LINK GOES TO PAGE "ACCOUT/SETTINGS" */}
				<FiUser
					size={28}
					className="text-primary-default-Solid"
				></FiUser>
			</Link>
		</div>
	);
}
