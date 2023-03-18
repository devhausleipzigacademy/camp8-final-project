import {
  SwipeableListItem,
  Type,
  SwipeAction,
  TrailingActions,
  LeadingActions,
} from "react-swipeable-list";
import clsx from "clsx";
import axios from "axios";
import { Trash, Bookmark } from "react-feather";
import "react-swipeable-list/dist/styles.css";
import { useState } from "react";

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
  createNewCard: boolean;
};

export type UserLists = Array<UserList>;

export const example_list = {
  id: "845d8198-7089-4618-891b-47a2b5038c83",
  listName: "first custom list",
  createdAt: "2023.03.03",
  favorite: false,
  itemsTotal: 0,
  itemsChecked: 0,
};

export const example_card: CardProps = {
  data: example_list,
  createNewCard: false,
};

export function SingleCard({ data, createNewCard }: CardProps) {

  //current list Id
  const listId = data.id;

  //binding to access favorite
  const pinned = data.favorite

  //binding, to determine behavior of Card (Title turns into Inputfield, when changingName is set to true. changingName will be set to true on CLick.
  const [changingName, setChangingName] = useState(false);

  //define Types for Data we are going to send
  type UpdateListNameRequestData = {
    id: string;
    newName: string;
  };

  type DeleteListRequestData = {
    id: string;
  };

  //create a binding to store the Name provided by event, obChange. Will be updated as typing. ApiChangeListName will be triggered when clicking enter
  const [inputName, setInputName] = useState("");

  async function ApiChangeListName(current_id: string) {
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/updateListName",
        { id: current_id, newName: inputName } as UpdateListNameRequestData,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.log(err);
    }
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
            : "text-primary-default-Solid "
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

function ApiDeleteList(current_id: string) {
  // A simple DELETE request with fetch
  fetch(`http://localhost:3000/api/deleteList?id=${current_id}`, {
    method: "DELETE",
  }).then((response) => {
    console.log(response);
  });
}

function ApiPnList(current_id: string) {
  fetch(`http://localhost:3000/api/deleteList?id=${current_id}`, {
    method: "PATCH",
  }).then((response) => {
    console.log(response);
  });
}

function ApiUnpinList(current_id: string) {
  fetch(`http://localhost:3000/api/deleteList?id=${current_id}`, {
    method: "PATCH",
  }).then((response) => {
    console.log(response);
  });
}

function PinOrUnpin(id: string, pinned: boolean){
  (pinned&&ApiPnList(id));
  (!pinned&&console.log("HUHUHUHUHUH"))
}

export const leadingActions = (id: string, pinned: boolean) => (
  <LeadingActions>
    <SwipeAction
      onClick={() => {
        PinOrUnpin(id, pinned);
        console.log("after click: pinned: " + pinned)
      }}
    >
      <div className="bg-primary-default-Solid flex justify-center content-center text-text-white place-items-center rounded-l-2xl">
        <div className="flex justify-between fixed w-26 ml-7 mr-7 content-center">
          <span className="h-6 w-6 m-0">
            <Bookmark />
          </span>
          <p className="bg-white text-links pt-[0.2rem]">{clsx((pinned&&"unpin"),(!pinned&&"pin"))}</p>
        </div>
      </div>
    </SwipeAction>
  </LeadingActions>
);

export const trailingActions = (id: string) => (
  <TrailingActions>
    <SwipeAction
      onClick={() => {
        console.log("CLICKED");
        ApiDeleteList(id);
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
);