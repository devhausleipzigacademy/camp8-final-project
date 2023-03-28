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
import { useRef, useState } from "react";
import {
  ApiChangeListName,
  ApiDeleteList,
  ApiPnList,
  ApiUnpinList,
} from "../pages/home/apiCallsHome";
import { CardProps } from "@/pages/home/homeTypes";

export function SingleCard({
  cardData,
  newCardId,
  setNewCardId,
}: CardProps) {
  //link to queryClient in app.tsx
  const queryClient = useQueryClient();

  //current list Id
  const listId = cardData.id;

  const isNewCard = (newCardId === cardData.id);

  //for clsx & functions for focus  / blur
  const [isFocus, setIsFocus] = useState(false);

  //binding, to determine behavior of Card (Title turns into Inputfield, when changingName is set to true. changingName will be set to true on CLick.
  const [changingName, setChangingName] = useState(false);

  const [inputName, setInputName] = useState("");

  const inputWrapper = useRef(null);


  //API CALLS WRAPPED IN MUTATIONS
  const { mutate: updateListName } = useMutation(
    (list_id: string) => ApiChangeListName(list_id, inputName),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]), //how can I invalidate a single card?
    }
  );

  const { mutate: pinList } = useMutation(
    (list_id: string) => ApiPnList(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

  const { mutate: unpinList } = useMutation(
    (list_id: string) => ApiUnpinList(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

  const { mutate: deleteList } = useMutation(
    (list_id: string) => ApiDeleteList(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

  //handling Pin/Unpin
  function PinOrUnpin(list_id: string, pinned: boolean) {
    pinned && pinList(list_id);
    !pinned && unpinList(list_id);
  }

  const functionWrapper = (
    passed_function: Function,
    list_id: string,
    pinned: boolean
  ) => {
    return passed_function(list_id, pinned);
  };

  //lirary Component
  const trailingActions = (list_id: string) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          deleteList(list_id);
        }}
      >
        <div className="bg-ux-error flex justify-center content-center text-text-white place-items-center rounded-r-2xl">
          <div className="flex justify-between fixed w-28 ml-7 mr-7 content-center">
            <p className="bg-white text-links pt-[0.2rem]">Delete</p>
            <span className="h-6 w-6">
              <Trash className="stroke-text-white" />
            </span>
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  ); //end of delete ist>

  const leadingActions = (
    passed_function: Function,
    list_id: string,
    pinned: boolean
  ) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          functionWrapper(passed_function, list_id, pinned);
        }}
      >
        <div className="bg-primary-default-Solid flex justify-center content-center text-text-white place-items-center rounded-l-2xl">
          <div className="flex justify-between fixed w-26 ml-7 mr-7 content-center">
            <span className="h-6 w-6 m-0">{pinned && <Bookmark />}</span>
            <p className="bg-white text-links pt-[0.2rem]">
              {clsx({ pinned } && "unpin", !{ pinned } && "pin")}
            </p>
          </div>
        </div>
      </SwipeAction>
    </LeadingActions>
  );
  //> end of pin list part1

  if (cardData) {
    return (
      <SwipeableListItem
        listType={Type.IOS}
        className="rounded-2xl"
        leadingActions={leadingActions(PinOrUnpin, listId, cardData.favorite)}
        trailingActions={trailingActions(listId)}
        fullSwipe={true}
      >
        <div
          className={clsx(
            "border rounded-[14px] gap-[10px] w-full h-44 p-5 justify-between bg-secondary-transparent",
            isNewCard
              ? "text-primary-transparent"
              : "text-primary-default-Solid",
            isFocus
              ? "border-primary-default-Solid"
              : "border-secondary-transparent"
          )}
          // onFocus={() => {setIsFocus(true)}}
          onClick={() => {
            console.log("217, your mouse clicked the component" + listId);
            (inputWrapper.current! as HTMLInputElement).focus();
            !isFocus && setIsFocus(true);
            // !isNewCard && setNewCardId("");
          }}
          onBlur={() => {
            console.log(
              "204, your mouse did smth outside the component" + listId
            );
            (inputWrapper.current! as HTMLInputElement).focus();
            setChangingName(false);
            isFocus && setIsFocus(false);
            (inputName!=="")&&updateListName(listId);
            !isNewCard && setNewCardId("");
          }}
          onMouseLeave={() => {
            console.log("210, your mouse left the component" + listId);
            (inputWrapper.current! as HTMLInputElement).focus();
            isFocus && setIsFocus(false);
            (inputName!=="")&&updateListName(listId);
            // !isNewCard && setNewCardId("");
          }}
        >
          <div
            className="flex flex-col gap-3 rounded-[14px]"
            onFocus={() => {
              !isFocus && setIsFocus(true);
            }}
            onClick={() => {
              !isFocus && setIsFocus(true);
            }}
            ref={inputWrapper}
          >
            <p className="button-bold font-semibold">
              {`${cardData.itemsChecked}/${cardData.itemsTotal} Items`}
            </p>
            {changingName === true ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  {
                    updateListName(listId);
                  }
                }}
              >
                <input
                  type="Text"
                  placeholder={clsx(
                    !cardData.listName ? "New Name" : cardData.listName
                  )}
                  className={clsx("uppercase cards-title font-heading bg-transparent placeholder:text-primary-transparent text-primary-default-Solid focus:outline-none")}
                  onChange={(event) => {
                    setInputName(event.target.value);
                  }}
                />
              </form>
            ) : (
              <p
                onClick={() => setChangingName(true)}
                className="cards-title uppercase font-heading "
              >
                {cardData.listName}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <div className="text-primary">
              {cardData.favorite && <Bookmark className="h-6 w-6" />}
            </div>
            <p>{cardData.createdAt && cardData.createdAt.slice(0, 9)}</p>
          </div>
        </div>
      </SwipeableListItem>
    );
  } else {
    return <>isLoading</>;
  }
}