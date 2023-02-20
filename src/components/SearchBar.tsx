import Image from "next/image";

export default function SearchBar() {
	return (
		<>
			<div className="flex">
				<input
					className=" border border-solid w-72 h-10 rounded-full p-2"
					type="text"
					placeholder="Search"
				/>

				<div className="">
					<Image
						src="/SearchNormal.png"
						alt="search"
						width={18}
						height={18}
					/>
				</div>
			</div>
			<div>
				<input
					className=" border border-solid w-72 h-10 rounded-full p-2 mt-5"
					type="text"
					placeholder="Search"
				/>
				{/* <Image
					src="search-normal.png"
					alt="search"
					width={100}
					height={100}
				/> */}
			</div>
		</>
	);
}
