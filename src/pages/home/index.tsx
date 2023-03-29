import CardsWrapper from "@/pages/home/CardsWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AddListCard from "@/components/AddListCard";
import Head from "next/head";
import { PlusButton } from "@/components/PlusButton";
import { SearchBar } from "@/components/SearchBar";
import { FullHeader } from "@/components/FullHeader";
import { newCardId } from "./apiCalls";

export default function Home(id_user: string) {
  //link to queryClient in app.tsx
  const queryClient = useQueryClient();

  //updates data linked to render all cards automatically as newCardId is called
  const { mutate: createNewCard } = useMutation({
    mutationFn: (id_user: string) => newCardId(id_user),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  return (
    <div className="grid grid-row-2 h-full relative">
      <div className="row-span-1">
        <FullHeader classes={""} name={""}></FullHeader>
      </div>
      <div className="row-span-1 h-full overflow-y-scroll">
        <CardsWrapper user_id={id_user} />
      </div>
      <PlusButton
    onClick={() => {
      createNewCard(id_user);
    }}
  ></PlusButton>
    </div>
  );
}
