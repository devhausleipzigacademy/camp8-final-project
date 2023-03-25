//import functions that return mutation
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { SingleCard, UserList, UserLists } from "./SingleCard";

//TO GET ALL THE LISTS
////send request to the backend
function askApiForCards(user_id: string) {
  return axios.get(`/api/getCards?id=${user_id}`).then((res) => {
    return res.data;
  });
}

////TO CREATE ALL THE CARDS
//map over data passed as argument, return a card (a Node) for each
const returnNodes = (allCardsData: UserLists, newCardId: string) => {
    if (allCardsData){
    return allCardsData.map((element: UserList) => {
    return <SingleCard cardData={element} key={element.id} newCardId={newCardId} />;
  });} else {return <>isLoading</>}
};

//render a component with all Nodes included. Based on id provided to You as prop, passed forward to getCards
type Props = {
  user_id: string;
  newCardId: string;
};

export default function CardsWrapper({ user_id, newCardId }: Props) {
  const { data: allCards } = useQuery<UserLists>(
    ["cards"],
    () => askApiForCards(user_id),
    {
      enabled: Boolean(user_id),
    }
  );

  const router = useRouter();

  if (!allCards){return(<div>"Waiting for data"</div>)}
  else {
    return (
      <div className="flex flex-col gap-3 pt-[160px]">
        {returnNodes(allCards, newCardId)}
      </div>
    );
  }
}