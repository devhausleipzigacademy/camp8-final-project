//import functions that return mutation
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { SingleCard, UserList, UserLists } from "./SingleCard";

//TO GET ALL THE LISTS
////Send request to the backend
function askApiForCards(user_id: string) {
  return axios.get(`/api/getCards?id=${user_id}`).then((res) => {
    return res.data;
  });
}

////Function to sort by (favorite === true) or (favorite === false)
function filterFavorites(dataArray: UserLists, isFavorite: boolean, pushTo: UserLists, firstListId: string) {
  dataArray.map((element: UserList) => {
    if (element.favorite === isFavorite) {
      pushTo.push(element);
    }
  });
}

////Function to sort by (favorite === true) or (favorite === false)
function takeThisFirst(dataArray: UserLists, pushTo: UserLists, firstListId: string) {
  dataArray.map((element: UserList) => {
    if ((element.id === firstListId)&&(element.id !== firstListId)) {
      pushTo.push(element);
    }
  });
}

////Take all Data, call sorting algorithm on it, push to a new array, take each element of the array and return a Node
const returnOrderedNodes = (allCardsData: UserLists, newCardId: string) => {
  const allCardsSorted: UserLists = [] as UserLists;
  filterFavorites(allCardsData, false, allCardsSorted, newCardId);
  filterFavorites(allCardsData, true, allCardsSorted, newCardId);
  takeThisFirst(allCardsData, allCardsSorted, newCardId);
  if (allCardsData) {
    return allCardsSorted.map((element: UserList) => {
      return (
        <SingleCard cardData={element} key={element.id} newCardId={newCardId} />
      );
    });
  } else {
    return <>isLoading</>;
  }
};

////Based on a user_id provided to You as prop while rendering
////Component must first ask Api for all the Data, then pass them to 'returnOrderedNodes()'.
///Api Call is wrapped into a mutation Hook, so we are going to call this mutation Hook instead of the Api itself
////Render a component with all Nodes included.
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

  if (!allCards) {
    return <div>"Waiting for data"</div>;
  } else {
    return (
      <div className="flex flex-col-reverse gap-3 pt-[160px]">
        {returnOrderedNodes(allCards, newCardId)}
      </div>
    );
  }
}
