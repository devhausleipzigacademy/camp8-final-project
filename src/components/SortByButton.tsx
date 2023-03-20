import { useState } from "react";
import { Tab } from "@headlessui/react";

type Category = string;
type Post = {
	id: number;
	title: string;
};

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export function SortByButton() {
	// let [categories] = useState<Record<Category, Post[]>>({
	// 	RECENT: [{ id: 1 }],
	// 	CATEGORY: [{ id: 2 }],
	// 	ALPHABETIC: [{ id: 3 }],
	// });

	let [categories] = useState<Record<Category, Post[]>>({
		Category: [
			//infinite categories can be created (somehow)
			{
				id: 1,
				title: "Category A",
			},
			{
				id: 2,
				title: "Category B",
			},
			{
				id: 3,
				title: "Category C",
			},
			{
				id: 4,
				title: "Category D",
			},
		],
		Quantity:
			//NEW INPUT COMPONENT
			[
				{
					id: 1,
					title: "enter quantity",
				},
			],
		Units: [
			{
				id: 1,
				title: "ml Mililiters)",
			},
			{
				id: 2,
				title: "l (Liters)",
			},
			{
				id: 3,
				title: "g (Grams)",
			},
			{
				id: 4,
				title: "kg (Kilograms)",
			},
			{
				id: 5,
				title: "kg (Kilograms)",
			},
		],
	});

	return (
		<div className="w-full h-full flex flex-col px-2 py-16 font-sans sm:px-0 outline-1 outline-primary-default-background">
			{/* ---ORIGINAL FROM COMPONENT */}
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-secondary-transparent p-1">
					{Object.keys(categories).map((category) => (
						<Tab
							key={category}
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 font-medium leading-5  text-text-white focus:outline-none",
									selected
										? "bg-primary-default-Solid text-text-white"
										: "text-ux-inactive"
								)
							}
						>
							{category}
						</Tab>
					))}
				</Tab.List>
			</Tab.Group>
			{/* ---ORIGINAL FROM COMPONENT */}
			{/* ---MODIFIED */}
			<Tab.Group>
				<Tab.Panels className="mt-2 max-w-[354px] h-8">
					{Object.values(categories).map((options, idx) => (
						<Tab.Panel
							key={idx}
							className={classNames(
								"rounded-xl max-w-[354px] bg-white p-3 outline-1 outline-primary-default-background font-sans text-text-typo",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}
						>
							<ul className="rounded-xl outline outline-offset-2 outline-primary-default-background">
								{options.map((option) => (
									<li
										key={option.id}
										className="relative rounded-md p-3"
									>
										<h3 className="text-sm font-medium leading-5">
											{option.title}
										</h3>

										<a
											href="#"
											className={classNames(
												"absolute inset-0 rounded-md",
												"focus:z-10 focus:outline-none focus:bg-primary-default-background focus:opacity-10"
											)}
										/>
									</li>
								))}
							</ul>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
			{/* ---MODIFIED */}
		</div>
	);
}
