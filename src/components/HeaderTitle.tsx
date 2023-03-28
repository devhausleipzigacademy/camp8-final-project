import clsx from "clsx";
import React from "react";

type HeaderTitle = {
	classes: string;
	name: string;
};

export function HeaderTitle(props: HeaderTitle) {
	return (
		<h1
			className={clsx(
				"text-title text-primary-default-Solid",
				props.classes
			)}
		>
			Hey, beautiful {props.name}!
		</h1>
	);
}
