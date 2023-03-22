//import functions that return mutation
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { SingleCard, UserList, UserLists } from "./Card";

//send request to the backend
function askApiForCards(user_id: string) {
  return axios.get(`/api/getCards?id=${user_id}`).then((res) => {
    return res.data;
  });
}

type Props = {
  user_id: string;
};

//map over data passed as argument, return a card (a Node) for each
export const returnNodes = (data: UserLists) => {
  return data.map((element: UserList) => {
    return <SingleCard data={element} key={element.id} new_card={false} />;
  });
};

//render a component with all Nodes included. Based on id provided to You as prop, passed forward to getCards
export default function CardsWrapper({ user_id }: Props) {

    const { data, isLoading } = useQuery<Array<UserList>>(["cards"], () => askApiForCards(user_id), {
      enabled: Boolean(user_id),
    });

  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 pt-[160px]">
      {data ? returnNodes(data) : "isLoading"}
    </div>
  );
}
