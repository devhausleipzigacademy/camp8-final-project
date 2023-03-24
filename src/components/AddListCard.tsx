import Card from "@/components/Card";
import { useState } from "react";
import { PlusButton } from "./PlusButton";

export default function AddListCard() {
  const [newCardList, setNewCardList] = useState(false);

  return (
    <>
      <PlusButton onClick={() => setNewCardList(true)}></PlusButton>

      {newCardList && (
        <Card
          createNewCard={true}
          data={cardData()}
          onRemove={() => setNewCardList(false)}
        />
      )}
    </>
  );
}
function cardData() {
  return {
    dateCreated: new Date(),
    checkedItems: 0,
    totalItems: 0,
    title: "",
  };
}
