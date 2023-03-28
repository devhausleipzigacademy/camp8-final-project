import React from "react";
import { IconButton } from "./IconButton";
import { HeaderTitle } from "./HeaderTitle";

type FullHeader = {
	classes: string;
	name: string;
};

export function FullHeader(props: FullHeader) {
	return (
		<div className="flex items-center gap-24">
			<HeaderTitle
				classes="text-title text-4xl text-primary-default-Solid "
				name={""}
			></HeaderTitle>
			<IconButton classes="w-12 h-12"></IconButton>
		</div>
	);
}
