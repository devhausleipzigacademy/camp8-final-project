import { SwipeableListItem } from "react-swipeable-list";
import React, { Key } from "react";
import { LeadingActions, TrailingActions } from "react-swipeable-list";
import { example_card } from "./Lists";
import SingleCard from "./Card";
import {user_lists} from "./Lists"

// without the just created list
// color definition for Bookmark missing
// check Date type, Date has too many characters

//for incoming Data
export type listProps = {
  id: string;
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
  </div>
  )}


  user_lists.map((element: listProps) => {
    <SingleCard
      data={element}
    />})
