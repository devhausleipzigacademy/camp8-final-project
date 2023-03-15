import { ChangeEvent, useState } from "react";

export type UserList = {
  id: string;
  listName: string;
  createdAt: string;
  itemsTotal: number;
  itemsChecked: number;
  favorite?: boolean;
};
export type CardProps = {
  data: UserList;
  createNewCard?: boolean;
  changingName: "false" | "true";
};

export type UserLists = Array<UserList>;

export const [changingName, setChangingName] = useState(false);
export const [newName, setNewName] = useState("");

export const updateName = (event: ChangeEvent<HTMLInputElement>) => {
  setNewName(event.currentTarget.value);
  //send http Request
  setChangingName(changingName => !changingName)
};

//THIS DATA ARE SAMPLE DATA TO IMITATE HTTP-RESPOND // they dont reflect the http-respont structure very well yet, though
//GET http://localhost:3000/api/seeLists?id=3c34daba-20e9-4a99-b3fb-204406a63c37

export const example_list = {
  id: "845d8198-7089-4618-891b-47a2b5038c83",
  listName: "first custom list",
  createdAt: "2023.03.03",
  favorite: false,
  itemsTotal: 0,
  itemsChecked: 0,
};

export const example_card: CardProps = {
  data: example_list,
  createNewCard: false,
  changingName: "false"
};

export const user_lists: UserLists = [example_list];