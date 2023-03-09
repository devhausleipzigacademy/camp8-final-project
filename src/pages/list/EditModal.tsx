import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import ListItem from "@/components/ListItem";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function EditModal() {
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
		<div className="w-full max-w-md px-2 py-16 font-sans sm:px-0 outline-1 outline-primary-default-background">
			<ListItem
				name={""}
				image={""}
				checked={false}
				onRemove={function (): void {
					throw new Error("Function not implemented.");
				}}
			/>
			{/* empty reusable TABS COMPONENT goes here */}
			<Tab.Group>
				{/* ///////// TABS START */}
				<Tab.List className="flex space-x-1 rounded-xl p-1 ">
					{Object.keys(categories).map((category) => (
						<Tab
							key={category}
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5",
									"ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
									selected
										? "bg-primary-default-background text-text-white"
										: "text-text-typo hover:bg-white/[0.12] hover:text-white"
								)
							}
						>
							{category}
						</Tab>
					))}
				</Tab.List>
				{/* //////// TABS END */}

				{/* IMPLEMENT FUNCTIONALITY */}
				<Tab.Panels className="mt-2">
					{Object.values(categories).map((options, idx) => (
						<Tab.Panel
							key={idx}
							className={classNames(
								"rounded-xl bg-white p-3 outline-1 outline-primary-default-background font-sans text-text-typo",
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
		</div>
	);
}
