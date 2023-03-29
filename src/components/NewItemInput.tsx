import { useState, Fragment, ChangeEvent, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { SmallButton } from "./SmallButton";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getListData } from "@/pages/list/[slug]";
import clsx from "clsx";
import { capitalizeCategory, capitalizeWord } from "./CapitalizeFunctions";
import { handleClick } from "./ListItem";
import { units } from "./EditModal";

type Item = {
	id: number;
	name: string;
};
type InputProps = {
	listID: string;
};

export function NewItemInput({ listID }: InputProps) {
	const [query, setQuery] = useState("");
	const [list, setList] = useState<string[]>([""]);
	const [inputValue, setInputValue] = useState("");

	const queryClient = useQueryClient();
	const { mutate: refresh } = useMutation(getListData, {
		onSuccess: () => {
			queryClient.invalidateQueries(["data"]);
		},
	});

	//@ts-ignore
	const onType = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			onSelect(inputValue);
		}
		setInputValue(event.target.value);
		setQuery(event.target.value);
		await axios
			.get(`http://localhost:3000/api/autocomplete?name=${query}`)
			.then((res) => {
				setList(
					res.data.results
						.reverse()
						.map((x: any) => capitalizeCategory(x.name))
				);
			});
		// refresh(listID);
	};

	const onSelect = async (value: string) => {
		try {
			// Send a POST request to your backend server to add the selected item to the database
			const regex = new RegExp(
				`^(\\d+)?\\s?(${units.join("|")})?\\s?(.*)$`
			);
			const match = value.match(regex);

			if (match) {
				const response = await axios
					.post("http://localhost:3000/api/addItem", {
						query: match[3].toLowerCase(),
						number: match[1],
						units: match[2],
						inputList: listID,
					})
					.then((res) => res.data);

				refresh(listID);

				// Clear the value of the input state
				setInputValue("");

				setTimeout(() => {
					const bla = document.getElementById(String(response));
					bla?.scrollIntoView({
						block: "center",
						behavior: "smooth",
					});
				}, 200);
			}
		} catch (error) {
			// If there was an error, show an error message
			alert(`Failed to add ${value} to the database: ${error}`);
		}
	};
	// const newList = list.push(inputValue);

	return (
		<Combobox>
			<div className="w-full mt-1">
				<Combobox.Options
					className={clsx(
						"ui-absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base",
						list.length > 1 &&
							"border-2 border-primary-default-Solid"
					)}
				>
					{list.length > 1 &&
						list.map((listItem) => (
							<Combobox.Option
								key={listItem}
								value={listItem}
								onClick={() => onSelect(listItem)}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active
											? "hover:bg-secondary-transparent"
											: " "
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
											{listItem}
										</span>
										{selected ? (
											<span
												className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
													active ? "text-black" : ""
												}`}
											></span>
										) : null}
									</>
								)}
							</Combobox.Option>
						))}
				</Combobox.Options>
				<div className="w-full flex cursor-default overflow-hidden rounded-md bg-white text-end">
					<Combobox.Input
						className=" border border-secondary-default rounded-md w-full h-14 p-5 focus:outline-none focus-visible  focus:border-purple-700"
						displayValue={(i: Item) => i.name}
						onKeyUp={(x) => onType(x)}
						placeholder={"Add items here"}
					/>
					<SmallButton
						onClick={() =>
							Boolean(inputValue) && onSelect(inputValue)
						}
						label="Enter"
					></SmallButton>
				</div>
			</div>
		</Combobox>
	);
}
function useQueryClientlient() {
	throw new Error("Function not implemented.");
}
