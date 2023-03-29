import CardsWrapper from "@/pages/home/CardsWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AddListCard from "@/components/AddListCard";
import Head from "next/head";
import { PlusButton } from "@/components/PlusButton";
import { SearchBar } from "@/components/SearchBar";
import { FullHeader } from "@/components/FullHeader";


export default function Home(id_user: string) {

    //link to queryClient in app.tsx
    const queryClient = useQueryClient();

    //create a binding to store the Name provided by event, obChange. Will be updated as typing. ApiChangeListName will be triggered when clicking enter
    const newCardId = (id_user: string) => {
      return axios.post(`http://localhost:3000/api/createList?id=${id_user}`);
    };

    //updates data linked to render all cards automatically as newCardId is called
    const { mutate: createNewCard } = useMutation({
      mutationFn: (list_id: string) => newCardId(list_id),
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    });


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
				<PlusButton
        onClick={()=>{
          createNewCard(id_user)}
        }></PlusButton>
        <CardsWrapper user_id="43b20ffc-ceea-43d5-b08c-9a1a6e4a1f98" />
			</div>
		</>
	);
}
