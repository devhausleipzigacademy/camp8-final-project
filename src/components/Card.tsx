import {
  SwipeableListItem,
  Type,
  SwipeAction,
  TrailingActions,
  LeadingActions,
} from "react-swipeable-list";
import clsx from "clsx";
import { Trash, Bookmark } from "react-feather";
import "react-swipeable-list/dist/styles.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

//Issues:
//fixed position of the card description, no rounding
//swip-right falls back automatically
//no animation / user feedback after delete-Function triggered

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
  data: UserList;
  new_card: boolean;
};

export type UserLists = Array<UserList>;

//define Types for Data we are going to send or receive
type UpdateListNameRequestData = {
  list_id: string;
  newName: string;
};

export function SingleCard({ data, new_card }: CardProps) {
  //current list Id
  const listId = data.id;

  //make prop "new_card" usable / changable
  const [createNewCard, setCreateNewCard] = useState(false);
  // setCreateNewCard(new_card); //triggered rerender

  //link to queryClient in app.tsx
  const queryClient = useQueryClient();

  //COMPONENT FUNCTIONS:

  //1. <Delete list
  function ApiDeleteList(list_id: string) {
    return fetch(`http://localhost:3000/api/deleteList?id=${list_id}`, {
      method: "DELETE",
    }).then((response) => {
      return response.json();
    });
  }

  const { mutate: deleteList } = useMutation(
    (list_id: string) => ApiDeleteList(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]),
    }
  );

  const trailingActions = (id: string) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          deleteList(id);
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
    return fetch("http:localhost:3000/api/updateListName", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: list_id,
        newName: inputName,
      }),
    }).then((response) => {
      console.log("updated list with id " + list_id + response);
      return response.json();
    });
  }

  const { mutate: updateListName } = useMutation(
    (list_id: string) => ApiChangeListName(list_id),
    {
      onSuccess: () => queryClient.invalidateQueries(["cards"]), //how can I invalidate a single card?
    }
  );

  //end of change Name>

  //< Pin list
  const leadingActions = (list_id: string, pinned: boolean) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
        }}
      >
        <div className="bg-primary-default-Solid flex justify-center content-center text-text-white place-items-center rounded-l-2xl">
          <div className="flex justify-between fixed w-26 ml-7 mr-7 content-center">
            <span className="h-6 w-6 m-0">
              <Bookmark />
            </span>
            <p className="bg-white text-links pt-[0.2rem]">
              {clsx(pinned && "unpin", !pinned && "pin")}
            </p>
          </div>
        </div>
      </SwipeAction>
    </LeadingActions>
  );
  //> End of pin list

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
      onSuccess: () => queryClient.invalidateQueries(["cards"])
    }
  )

  function PinOrUnpin(list_id: string, pinned: boolean) {
    pinned && pinList(list_id);
    !pinned && unpinList(list_id);
  }

  return (
    <SwipeableListItem
      listType={Type.IOS}
      className="rounded-2xl"
      leadingActions={leadingActions(data.id, data.favorite)}
      trailingActions={trailingActions(data.id)}
    >
      <div
        className={clsx(
          "border border-secondary-transparent flex flex-col gap-[10px] w-full h-44 p-5 justify-between bg-secondary-transparent",
          createNewCard
            ? "text-primary-transparent"
            : "text-primary-default-Solid"
        )}
      >
        <div className="flex flex-col gap-3 rounded-[14px]">
          <p className="button-bold font-semibold">
            {`${data.itemsChecked}/${data.itemsTotal} Items`}
          </p>
          {changingName === true ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                ApiChangeListName(listId);
              }}
            >
              <input
                type="Text"
                placeholder={clsx(!data.listName ? "New Name" : data.listName)}
                className="uppercase cards-title font-heading bg-transparent placeholder:text-primary-transparent text-primary-default-Solid focus:outline-none"
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
              {data.listName}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="text-primary">
            {data.favorite && <Bookmark className="h-6 w-6" />}
          </div>
          <p>{data.createdAt.slice(0, 9)}</p>
        </div>
      </div>
    </SwipeableListItem>
  );
}
