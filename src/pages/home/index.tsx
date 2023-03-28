import AddListCard from "@/components/AddListCard";
import Head from "next/head";
import { PlusButton } from "@/components/PlusButton";
import { SearchBar } from "@/components/SearchBar";
import { FullHeader } from "@/components/FullHeader";

export default function Home() {
	const date = new Date();
	const year = date.getFullYear();
	return (
		<>
			<div className="m-4">
				<div className="flex items-center justify-center mt-3 inset-y-0 right-0 ">
					<FullHeader classes={""} name={""}></FullHeader>
				</div>
				<div className="ml-4 mt-4">
					<SearchBar></SearchBar>
				</div>
			</div>
			<div className=" flex items-center justify-center mb-5 absolute inset-x-0 bottom-0">
				<PlusButton></PlusButton>
			</div>
		</>
	);
}
