//THIS DATA ARE SAMPLE DATA TO IMITATE HTTP-RESPOND // they dont reflect the http-respont structure very well yet, though
//GET http://localhost:3000/api/seeLists?id=3c34daba-20e9-4a99-b3fb-204406a63c37

import { CardProps, listProps, userLists } from "./Cards";

export const example_list: listProps = {
  id: "845d8198-7089-4618-891b-47a2b5038c83",
  listName: "new list",
  createdAt: "2023.03.03",
  itemsTotal: 0,
  itemsChecked: 0,
  // userIdentifier: "3c34daba-20e9-4a99-b3fb-204406a63c37",
  favorite: false,
};

export const example_card: CardProps = {
  data: example_list,
  createNewCard: false,
};

export const user_lists: userLists = [example_list];