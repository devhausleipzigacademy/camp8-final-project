import SingleCard from "./Card";
import { user_lists } from "./Lists";

// without the just created list
// check Date type, Date has too many characters

//for incoming Data
export type UserList = {
  id: string;
  listName: string;
  createdAt: String;
  itemsTotal: Number;
  itemsChecked: Number;
  favorite?: boolean;
};
export type CardProps = {
  data: UserList;
  createNewCard?: Boolean;
};

export type UserLists = Array<UserList>;

//should take a just created list as a prop
export default function Cards() {
  return (
    <div className="flex flex-col gap-[10px] overflow-hidden pt-[160px]"></div>
  );
}

user_lists.map((element: UserList) => {
  <SingleCard data={element} />;
});
