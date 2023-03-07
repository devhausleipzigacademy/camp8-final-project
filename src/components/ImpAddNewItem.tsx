import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { SearchBar } from "./SearchBar";

function ImpAddNewItem() {
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				//check placeholder of endpoint
				`http://localhost:3000/api/autocomplete?name=${searchTerm}`
			);
			const data = (await response.json()) as ListItem[];
			console.log(data);

			return (
				<div>
					{data.items &&
						data.items.map((x) => {
							// Return all List Item properties?
							return (
								<ListItem image={x.imageUrl} name={x.name} />
							);
						})}
					{/* Must find out what has happened with Search Input */}
					<SearchBar
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
