//import functions that return mutation
import { askApiForCards } from "@/pages/home/apiCalls";
import { UserLists, UserList, CardsWrapperProps } from "@/pages/home/Types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SingleCard } from "../../components/SingleCard";

////Function to sort by (favorite === true) or (favorite === false)
function takeThisFirst(
  dataArray: UserLists,
  pushTo: UserLists,
  firstListId: string
) {
  dataArray.map((element: UserList) => {
    if (element.id === firstListId && element.id !== firstListId) {
      pushTo.push(element);
    }
  });
}

////Function to sort by (favorite === true) or (favorite === false)
function filterFavorites(
  dataArray: UserLists,
  isFavorite: boolean,
  pushTo: UserLists,
  firstListId: string
) {
  dataArray.map((element: UserList) => {
    if (element.favorite === isFavorite) {
      pushTo.push(element);
    }
  });
}

////Take all Data, call sorting algorithm on it, push to a new array, take each element of the array and return a Node
const returnOrderedNodes = (
  allCardsData: UserLists,
  lastCardCreated: string,
  setLastCardCreated: Function
) => {
  const allCardsSorted: UserLists = [] as UserLists;
  filterFavorites(allCardsData, false, allCardsSorted, lastCardCreated);
  filterFavorites(allCardsData, true, allCardsSorted, lastCardCreated);
  takeThisFirst(allCardsData, allCardsSorted, lastCardCreated);
  if (allCardsData) {
    return allCardsSorted.map((element: UserList) => {
      return (
        <SingleCard
          cardData={element}
          key={element.id}
          newCardId={lastCardCreated}
          setNewCardId={setLastCardCreated}
        />
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

export default function CardsWrapper({
  user_id,
  newCardId,
  setNewCardId,
}: CardsWrapperProps) {

  const router = useRouter();

  const { data: allCards } = useQuery<UserLists>(
    ["cards"],
    () => askApiForCards(user_id),
    {
      enabled: Boolean(user_id),
    }
  );

  if (!allCards) {
    return <div>"Waiting for data"</div>;
  } else {
    return (
      <div className="flex flex-col-reverse gap-3 pt-[160px]">
        {returnOrderedNodes(allCards, newCardId, setNewCardId)}
      </div>
    );
  }
}
