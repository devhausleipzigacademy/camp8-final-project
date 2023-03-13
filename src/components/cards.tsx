import { SwipeableListItem } from "react-swipeable-list";
import React, { Key } from "react";
import { LeadingActions, TrailingActions } from "react-swipeable-list";
import { example_card } from "./Lists";
import SingleCard from "./Card";

// without the just created list
// color definition for Bookmark missing
// chech Date type, Date has too many characters
// where do CardComponentProps go?

//for incoming Data
export type listProps = {
  id: string | number;
  listName: string;
  createdAt: String;
  itemsTotal: Number;
  itemsChecked: Number;
  favorite?: boolean;
};
export type CardProps = {
  data: listProps;
  createNewCard?: Boolean;
};

export type userLists = Array<listProps>;

export default function Cards() {
  return(
  <div className="flex flex-col gap-[10px] overflow-hidden pt-[160px]">
    <SingleCard {...example_card}/>
    {/* {
        lists.map((element: listProps) => {
          <SwipeableListItem

          createNewCard = {false}

          data={element.data}
          key={data.id}
          leadingActions={LeadingActions(element.id)}
          trailingActions={TrailingActions(element.id)} />
        })
      }*/}
  </div>)
}
