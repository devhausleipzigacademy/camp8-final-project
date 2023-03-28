import CardsWrapper from "@/pages/home/CardsWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Home() {

//link to queryClient in app.tsx
const queryClient = useQueryClient();


  //create a binding to store the Name provided by event, obChange. Will be updated as typing. ApiChangeListName will be triggered when clicking enter
  const newCardId = (id_user: string) => {
    return axios
      .post(`http://localhost:3000/api/createList?id=${id_user}`);
  };

  //updates data linked to render all cards automatically as newCardId is called
  const { mutate: createNewCard } = useMutation(
    {
      mutationFn: (list_id: string) => newCardId(list_id),
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

  return (
    <>
      <div className="max-w-screen-sm h-screen gap-2">
        <button onClick={() => createNewCard("43b20ffc-ceea-43d5-b08c-9a1a6e4a1f98")}>HALLO TRY THIS</button>
        <CardsWrapper user_id="43b20ffc-ceea-43d5-b08c-9a1a6e4a1f98" />
      </div>
    </>
  );
}
