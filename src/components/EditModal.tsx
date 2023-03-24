import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { Tab } from "@headlessui/react";

import { type } from "os";

type Category = string;
type Quantity = number;
type Units = string;

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function EditModal() {
	let [quantityInput] = useState({
		Quantity: [
			{
				id: 1,
				title: "enter quantity",
			},
		],
	});
	let [categories] = useState({
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
			{
				id: 5,
				title: "endless ",
			},
			{
				id: 6,
				title: "amount",
			},
			{
				id: 7,
				title: "of categories",
			},
			{
				id: 8,
				title: "...",
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
				title: "cups",
			},
		],
	});
	// FUNCTIONALITY FOR SELECTING UNITS MAYBE
	const [selectedUnits, setSelectedUnits] = useState<string>("");

	function clickUnit(toCheck: string) {
		if (selectedUnits == toCheck) {
			return setSelectedUnits("");
		} else {
			setSelectedUnits(toCheck);
		}
	}

	return (
		<div className="w-full h-full gap-0 flex flex-col font-sans outline-primary-default-background">
			{/* ---MODIFIED */}

			<Tab.Group>
				<Tab.List className="flex rounded-xl bg-text-white px-3 py-3">
					{Object.keys(categories).map((category) => (
						<Tab
							key={category}
							className={({ selected }) =>
								classNames(
									"w-full rounded-2xl py-2 font-medium leading-5 focus:outline-none",
									selected
										? "bg-primary-default-Solid text-text-white"
										: "bg-text-white text-text-typo"
								)
							}
						>
							{category}
						</Tab>
					))}
				</Tab.List>

				<Tab.Panels className="mt-2 w-screen h-8">
					{Object.values(categories).map((options, idx) => (
						<Tab.Panel
							key={idx}
							className={classNames(
								"rounded-xl w-screen bg-white px-3 py-0 outline-1 outline-primary-default-Solid font-sans text-text-typo",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}
						>
							<ul className="rounded-xl outline outline-offset-2 outline-primary-default-Solid overflow-y-auto max-h-44">
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
												"focus:z-10 focus:outline-none focus:bg-primary-default-Solid focus:opacity-10"
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
