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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";

//Default values for the new Card:
// export const dummyCard = {
//   id: "defaultId",
//   listName: "My New List",
//   createdAt: "",
//   itemsTotal: 0,
//   itemsChecked: 0,
//   favorite: false,
// };

///TYPES
export type UserList = {
  id: string;
  listName: string;
  createdAt: string;
  itemsTotal: number;
  itemsChecked: number;
  favorite: boolean;
};
export type CardProps = {
  cardData: UserList;
  newCardId: string;
};

export type UserLists = Array<UserList>;

export function SingleCard({ cardData, newCardId }: CardProps) {
  //link to queryClient in app.tsx
  const queryClient = useQueryClient();

  //current list Id
  const listId = cardData.id;


  const thisIsANewCard = (newCardId === cardData.id)
  console.log(cardData.id, thisIsANewCard)

  //COMPONENT FUNCTIONS:

  //1. <Delete list
  function ApiDeleteList(list_id: string) {
    return fetch(`http://localhost:3000/api/deleteList?id=${list_id}`, {
      method: "DELETE",
    }).then((response) => {
      return response;
    });
  }

  const { mutate: deleteList } = useMutation(
    (list_id: string) => ApiDeleteList(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

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

  //2. <Change name

  //create a binding to store the Name provided by event, obChange. Will be updated as typing. ApiChangeListName will be triggered when clicking enter
  const [inputName, setInputName] = useState("");

  //binding, to determine behavior of Card (Title turns into Inputfield, when changingName is set to true. changingName will be set to true on CLick.
  const [changingName, setChangingName] = useState(false);

  function ApiChangeListName(list_id: string) {
    return fetch("/api/updateListName", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        newName: inputName,
        id: list_id,
      }),
    }).then((response) => {
      return response;
    });
  }

  const { mutate: updateListName } = useMutation(
    (list_id: string) => ApiChangeListName(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]), //how can I invalidate a single card?
    }
  );
  //end of change Name>

  //3. <Pin List
  function ApiPnList(list_id: string) {
    return fetch(`http://localhost:3000/api/deleteList?id=${list_id}`, {
      method: "PATCH",
    }).then((response) => {
      return response.json();
    });
  }

  const { mutate: pinList } = useMutation(
    (list_id: string) => ApiPnList(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

  function ApiUnpinList(list_id: string) {
    return fetch(`http://localhost:3000/api/deleteList?id=${list_id}`, {
      method: "PATCH",
    }).then((response) => {
      return response.json();
    });
  }

  const { mutate: unpinList } = useMutation(
    (list_id: string) => ApiUnpinList(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

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
            "border border-secondary-transparent flex flex-col gap-[10px] w-full h-44 p-5 justify-between bg-secondary-transparent",
            thisIsANewCard
              ? "text-primary-transparent"
              : "text-primary-default-Solid"
          )}
        >
          <div className="flex flex-col gap-3 rounded-[14px]">
            <p className="button-bold font-semibold">
              {`${cardData.itemsChecked}/${cardData.itemsTotal} Items`}
            </p>
            {changingName === true ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  {
                    !thisIsANewCard && ApiChangeListName(listId);
                  }
                  // {createNewCard&&handleCreateNewCard(userId)};
                }}
              >
                <input
                  type="Text"
                  placeholder={clsx(
                    !cardData.listName ? "New Name" : cardData.listName
                  )}
                  className="uppercase cards-title font-heading bg-transparent placeholder:text-primary-transparent text-primary-default-Solid focus:outline-none"
                  onBlur={(event) => {
                    console.log("BLUR");
                    updateListName(listId)
                    setInputName(event.target.value)
                  }}
                  onChange={(event) => {
                    setInputName(event.target.value);
                  }} //change value every Type
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
