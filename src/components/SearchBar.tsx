import Image from "next/image";
import { useState, Fragment } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Items = Array<Item>;
type Item = {
	id: number;
	name: string;
};
const items: Items = [
	{ id: 1, name: "Apple" },
	{ id: 2, name: "Beverages" },
	{ id: 3, name: "Cheese" },
	{ id: 4, name: "Dairy Products" },
	{ id: 5, name: "Egg" },
	{ id: 6, name: "Fish" },
];

export function SearchBar() {
	const [selectedItems, setSelectedItems] = useState(items[0]);
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
					<div className="relative w-full cursor-default overflow-hidden rounded-full">
						<Combobox.Input
							className=" border border-primary-transparent rounded-full w-80 h-14 ml-8 p-5 focus:outline-none focus-visible  focus:border-primary-default-Solid"
							displayValue={(i: Item) => i.name}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={"Search"}
						/>

						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-8">
							<MagnifyingGlassIcon width={18} height={18} />
						</Combobox.Button>
					</div>

					<Combobox.Options className=" ui-absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-secondary-transparent py-1 from-text-white_transparent">
						{filteredItems.map((list) => (
							<Combobox.Option
								key={list.id}
								value={list}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active
											? " bg-primary-default-Solid text-text-white"
											: " "
									}`
								}
							>
								{({ selected, active }) => (
									<>
										<span
											className={`block truncate ${
												selected
													? "font-sans"
													: "font-thin"
											}`}
										>
											{list.name}
										</span>
										{selected && (
											<span
												className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
													active
														? "text-text-white"
														: "text-primary-transparent"
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
