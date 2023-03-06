import { useState, useEffect } from "react";
import ListItem from "./ListItem";

function ImpAddNewItem() {
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				//check placeholder of endpoint
				`http://localhost:3000/api/autocomplete?name=${searchTerm}`
			);
			const data = await response.json();
			console.log(data);

			return (
				<div>
					{data.items &&
						data.items.map(() => {
							// Return all List Item properties?
							return (
								<ListItem image={x.imageUrl} name={x.name} />
							);
						})}
					{/* Must find out what has happened with Search Input */}
					<SearchInput
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			);
		};
		fetchData();
		[searchTerm];
	});
}

export default ImpAddNewItem;

type ListItemProps = {
	name: string;
	image: string;
	quantity?: string;
	checked: boolean;
	onRemove: () => void;
};
