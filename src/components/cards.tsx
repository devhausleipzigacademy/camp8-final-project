import SingleCard from "./Card";
import { user_lists } from "./CardsUtilities";
import axios from "axios";

export default function CardsWrapper() {
  return (
    <div className="flex flex-col gap-[10px] overflow-hidden pt-[160px]">
      {user_lists.map((element: UserList) => {
        <SingleCard data={element} changingName={"false"} />;
      })}
    </div>
  );
}
