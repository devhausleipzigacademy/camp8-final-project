import CardsWrapper from "@/components/CardsWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {

//link to queryClient in app.tsx
const queryClient = useQueryClient();

  const [lastCardCreated, setLastCardCreated] = useState("")

  const newCardId = (id_user: string) => {
    return axios
      .post(`http://localhost:3000/api/createList?id=${id_user}`)
      .then((res) => {
        setLastCardCreated(res.data.id);
        return res.data.id;
      });
  };

  //updates data linked to render all cards automatically as newCardId is called
  const { mutate: CreateNewCard } = useMutation(
    (list_id: string) => newCardId(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

  return (
    <>
      <div className="max-w-screen-sm h-screen gap-2 justify-self-center">
        <div className="">
          {//TESTs:
          }
          <button onClick={()=>{CreateNewCard("43b20ffc-ceea-43d5-b08c-9a1a6e4a1f98")}}>HALLO TRY THIS</button>
          <CardsWrapper user_id="43b20ffc-ceea-43d5-b08c-9a1a6e4a1f98" newCardId={lastCardCreated} />
        </div>
      </div>
    </>
  );
}
