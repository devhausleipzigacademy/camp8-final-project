import { askApiForCards } from "@/pages/home/apiCalls";
import { UserLists, UserList, CardsWrapperProps } from "@/pages/home/Types";
import { List, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { SingleCard } from "../../components/SingleCard";

//Take all Data, call sorting algorithm on it, push to a new array, take each element of the array and return a Node
const returnOrderedNodes = (allCardsData: List[]) => {
  let allCardsSorted: List[] = [] as List[];

  // 1. alphabetical sort ascending,
  // 2. pinned get sorted to top,
  // 3. draft entries placed at top
  allCardsSorted = allCardsData
    .sort((a, b) => (b.listName! < a.listName! ? -1 : 1))
    .sort((a, b) => Number(a.favorite) - Number(b.favorite))
    .sort((a, b) => Number(Boolean(b.listName)) - Number(Boolean(a.listName)));

  if (allCardsData) {
    return allCardsSorted.map((element: List) => (
      <SingleCard cardData={element} key={element.id} />
    ));
  } else {
    return <>isLoading</>;
  }
};

////Based on a user_id provided to You as prop while rendering
////Component must first ask Api for all the Data, then pass them to 'returnOrderedNodes()'.
///Api Call is wrapped into a mutation Hook, so we are going to call this mutation Hook instead of the Api itself
////Render a component with all Nodes included.

export default function CardsWrapper({ user_id }: CardsWrapperProps) {
  const { data: allCards } = useQuery<List[]>(["cards"], () =>
    askApiForCards(user_id)
  );

  if (!allCards) {
    return <div>Waiting for data</div>;
  } else {
    return (
      <div className="flex flex-col-reverse gap-3">
        {returnOrderedNodes(allCards)}
      </div>
    );
  }
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const user: User = await axios.get(`/api/user?email=${session?.user?.email}`);

  return {
    props: {
      user: user,
    },
  };
};
