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
import React, { useState } from "react";
import {
  apiChangeListName,
  apiDeleteList,
  apiPinList,
} from "../pages/home/apiCalls";
import { CardProps } from "@/pages/home/Types";
import { useRouter } from "next/router";

export function SingleCard({ cardData }: CardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [xpos, setXPos] = useState<number>();

  let {
    id: listId,
    listName,
    createdAt,
    itemsTotal,
    itemsChecked,
    favorite: pinned,
  } = cardData;

  let isDraftCard = listName === "";

  const { mutate: updateListName } = useMutation({
    mutationFn: (inputValue: string) => apiChangeListName(listId, inputValue),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  const { mutate: pinList } = useMutation({
    mutationFn: () => apiPinList(listId),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  const { mutate: unpinList } = useMutation({
    mutationFn: () => apiPinList(listId),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  const { mutate: deleteList } = useMutation({
    mutationFn: () => apiDeleteList(listId),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  function togglePinned() {
    pinned ? unpinList() : pinList();
  }

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
      <div
        onMouseDown={(e) => setXPos(e.clientX)}
        onMouseUp={(e) => {
          if (Math.abs(e.clientX - xpos!) < 5) {
            console.log(xpos, e.clientX);

            router.push(`/list/${listId}`);
          } else {
            setXPos(NaN);
          }
        }}
      >
        <SwipeableListItem
          listType={Type.IOS}
          className={clsx(
            "rounded-2xl cursor:pointer ring-0 gap-2.5 h-44 justify-between bg-secondary-transparent focus:ring-primary-default-Solid focus:ring-4",
            isDraftCard
              ? "text-primary-transparent"
              : "text-primary-default-Solid"
          )}
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
          fullSwipe={true}
          // onClick={()=>router.push(`/list/${listId}`)}
        >
          <div className="flex flex-col p-5 justify-around">
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
      </div>
    );
  } else {
    return <>isLoading</>;
  }
}
