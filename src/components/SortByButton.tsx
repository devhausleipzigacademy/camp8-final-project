import { Tab } from "@headlessui/react";

export default function SortByButton() {
	return (
		<div className="w-full max-w-md px-2 py-16 sm:px-0">
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-primary-transparent p-1">
					<Tab className="bg-primary-frame">RECENT</Tab>
					<Tab>CATEGORY</Tab>
					<Tab>ALPHABETIC</Tab>
				</Tab.List>
			</Tab.Group>
		</div>
	);
}
