import React, { useEffect, useState } from "react";
import { SingleCard, UserList, UserLists } from "./Card";

export const returnNodes = (data: UserLists) => {
  return (data.map((element: UserList) => {
    return (
      <SingleCard data={element} key={element.id} createNewCard={false} />
    )}))
};

type Props = {
  id: string
}

export const CardsWrapper = ({id}: Props) => {

  ///API-Request:
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api//seeLists?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])


  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>Press plus button to create Your first list!</p>

  return (
    <div className="overflow-hidden pt-[160px]">
      {returnNodes(data)}
    </div>
  );
};

