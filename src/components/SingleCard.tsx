import {
  LeadingActions,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import clsx from "clsx";
import { Trash, Bookmark } from "react-feather";
import "react-swipeable-list/dist/styles.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  apiChangeListName,
  apiDeleteList,
  apiPinList,
  apiUnpinList,
} from "../pages/home/apiCalls";
import { CardProps } from "@/pages/home/Types";

export function SingleCard({ cardData }: CardProps) {
  //link to queryClient in app.tsx
  const queryClient = useQueryClient();

  let {
    id: listId,
    listName,
    createdAt,
    itemsTotal,
    itemsChecked,
    favorite: pinned
  } = cardData;

  let isDraftCard = (listName === "");  

  //API CALLS

  const { mutate: updateListName } = useMutation({
    mutationFn: (inputValue: string) => apiChangeListName(listId, inputValue),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  const { mutate: pinList } = useMutation({
    mutationFn: () => apiPinList(listId),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  const { mutate: unpinList } = useMutation({
    mutationFn: () => apiUnpinList(listId),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  const { mutate: deleteList } = useMutation({
    mutationFn: () => apiDeleteList(listId),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  function togglePinned() {
    pinned ? unpinList(): pinList();
  }

  //library Component
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteList()}>
        <div className="bg-ux-error flex justify-center content-center text-text-white place-items-center rounded-r-2xl">
          <div className="flex justify-between w-28 ml-7 mr-7 content-center">
            <p className="bg-white text-links pt-[0.2rem]">Delete</p>
            <span className="h-6 w-6">
              <Trash className="stroke-text-white" />
            </span>
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={togglePinned}>
        <div className="bg-primary-default-Solid flex justify-center content-center text-text-white place-items-center rounded-l-2xl">
          <div className="flex justify-between w-28 ml-7 mr-7 content-center">
            <span className="h-6 w-6">{pinned && <Bookmark />}</span>
            <p className="bg-white text-links pt-[0.2rem]">
              {pinned ? "Unpin" : "Pin"}
            </p>
          </div>
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  if (cardData) {
    return (
      <SwipeableListItem
        listType={Type.IOS}
        className={clsx(
          "rounded-2xl ring-0 gap-2.5 w-full h-44 justify-between bg-secondary-transparent focus:ring-primary-default-Solid focus:ring-4",
          isDraftCard
            ? "text-primary-transparent"
            : "text-primary-default-Solid"
        )}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        fullSwipe={true}
      >
        <div className="flex flex-col p-5 h-full w-full justify-around">
          <p className="button-bold font-semibold">
            {`${itemsChecked}/${itemsTotal} Items`}
          </p>
          <input
            autoFocus
            type="Text"
            placeholder="New Name"
            defaultValue={listName}
            className={clsx(
              "uppercase cards-title font-heading bg-transparent",
              "focus:outline-none",
              "placeholder:text-primary-transparent text-primary-default-Solid"
            )}
            onBlur={(event) => updateListName(event.target.value)}
          />
          <div className="flex justify-between">
            <div className="text-primary">
              {pinned && <Bookmark className="h-6 w-6" />}
            </div>
            <p>{createdAt && createdAt.slice(0, 9)}</p>
          </div>
        </div>
      </SwipeableListItem>
    );
  } else {
    return <>isLoading</>;
  }
}