import SingleCard, { UserList, UserLists } from "./Card";

export const returnNodes = (list: UserLists) => {
  return (list.map((element: UserList) => {
    return (
      <SingleCard data={element}  createNewCard={false} />
    )}))
};

type Props = {
  list: UserLists
}

export const Wrapper = ({ list }: Props) => {
  return (
    <div className="overflow-hidden pt-[160px]">
      {returnNodes(list)}
    </div>
  );
};

