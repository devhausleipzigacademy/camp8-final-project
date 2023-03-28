export type UserList = {
  id: string;
  listName: string;
  createdAt: string;
  itemsTotal: number;
  itemsChecked: number;
  favorite: boolean;
};

export type UserLists = Array<UserList>;

export type CardProps = {
  cardData: UserList;
  newCardId: string;
  setNewCardId: Function;
};

export type CardsWrapperProps = {
  user_id: string;
  newCardId: string;
  setNewCardId: Function;
};