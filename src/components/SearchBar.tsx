import Image from "next/image";
import { useState, Fragment } from "react";
import { Combobox } from "@headlessui/react";
import { Search } from "feather-icons-react";

type Items = Array<Item>;
type Item = {
	id: number;
	name: string;
};
const items: Items = [
	{ id: 1, name: "B..." },
	{ id: 2, name: "Back" },
	{ id: 3, name: "Backe..." },
];

export function SearchBar() {
	const [selectedItems, setSelectedItems] = useState();
	const [query, setQuery] = useState("");

	const filteredItems =
		query === ""
			? items
			: items.filter((person) =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		<div className=" fixed top-16">
			<Combobox value={selectedItems} onChange={setSelectedItems}>
				<div className=" relative mt-1">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg">
						<Combobox.Input
							className=" border-2 pr-10 border-primary-transparent focus:outline-none focus-visible  hover:border-primary-default-background active:border-primary-default-Solid rounded-lg w-80 h-14 p-3"
							displayValue={(i: Item) => i.name}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={"Search"}
						/>

						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
							<Search
								className=" w-6 h-6 stroke-2"
								aria-hidden="true"
								auto-fill="none"
							/>
						</Combobox.Button>
					</div>

					<Combobox.Options className="ui-absolute mt-3 max-h-60 overflow-hidden rounded-lg border-primary-default-background">
						{filteredItems.map((list) => (
							<Combobox.Option
								key={list.id}
								value={list}
								className={({ active }) =>
									`relative cursor-default py-2 pl-4 ${
										active &&
										"text-primary-default-background"
									}`
								}
							>
								{({ selected, active }) => (
									<>
										<span
											className={`block truncate ${
												selected && "font-sans"
											}`}
										>
											{list.name}
										</span>
										{selected && (
											<span
												className={`absolute inset-y-0 left-0 flex items-center ${
													active && "text-text-white"
												}`}
											></span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				</div>
			</Combobox>
		</div>
	);
}
