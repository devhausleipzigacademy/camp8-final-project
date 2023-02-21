import Image from "next/image";
import { useState, Fragment } from "react";
import { Combobox } from "@headlessui/react";

{
	/* <div className="flex  items-center justify-between border border-solid w-32 h-12 p-2 ">
				<input type="text" placeholder="Search" />

				<div>
					<Image
						src="/SearchNormal.png"
						alt="search"
						width={18}
						height={18}
					/>
				</div>
			</div> */
}

const items = [
	{ id: 1, name: "Apple" },
	{ id: 2, name: "Beverages" },
	{ id: 3, name: "Cheese" },
	{ id: 4, name: "Dairy Products" },
	{ id: 5, name: "Egg" },
	{ id: 6, name: "Fish" },
];

export default function SearchBar() {
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
		<div className=" fixed top-16 w-52">
			<Combobox value={selectedItems} onChange={setSelectedItems}>
				<div className=" relative mt-1">
					<div className="relative w-full cursor-default overflow-hidden rounded-full bg-white text-end">
						<Combobox.Input
							className=" border border-indigo-600 rounded-full w-34 h-12 p-2 "
							displayValue={(value) => value.name}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={"Search"}
						/>

						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-8">
							<Image
								src="/SearchNormal.png"
								alt="search"
								width={18}
								height={18}
							/>
						</Combobox.Button>
					</div>

					<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base">
						{filteredItems.length === 0 && query !== "" ? (
							<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
								Nothing found.
							</div>
						) : (
							filteredItems.map((person) => (
								<Combobox.Option
									key={person.id}
									value={person}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active
												? "bg-teal-600 text-white"
												: "text-gray-900"
										}`
									}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`block truncate ${
													selected
														? "font-medium"
														: "font-normal"
												}`}
											>
												{person.name}
											</span>
											{selected ? (
												<span
													className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
														active
															? "text-white"
															: "text-teal-600"
													}`}
												></span>
											) : null}
										</>
									)}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</div>
			</Combobox>
		</div>
	);
}
{
	/* <li
									className={clsx(
										"bg-white-200 text-black",
										active ? " bg-white" : " "
									)}
								>
									{/* {
										selected && 
										// <Image
										// 	src="/SearchNormal.png"
										// 	alt="search"
										// 	width={18}
										// 	height={18}
										// />
									} */
}
{
	/* {person.name}
								</li>
							)}
						
					))}
				
			</Combobox>
		</div>
	);
}
<div className=" flex flex-row"></div>; */
}
