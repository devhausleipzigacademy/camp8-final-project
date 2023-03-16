import {
  SwipeableListItem,
  Type,
  SwipeAction,
  TrailingActions,
  LeadingActions,
} from "react-swipeable-list";
import clsx from "clsx";
import axios from "axios"
import { Trash, Bookmark } from "react-feather";
import 'react-swipeable-list/dist/styles.css';
import { useState } from "react";

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

export const user_lists: UserLists = [example_list];

export default function SingleCard({
  data,
  createNewCard,
}: CardProps) {

  //binding, to determine behavior of Card (Title turns into Inputfield, when changingName is set to true. changingName will be set to true on CLick.
  const [changingName, setChangingName] = useState(false)

  //to store Error and optionally display it on the screen
  const [isError, setIsError] = useState(false)

  //define a Type for Data we are going to send
  type RequestData = {
    id: string
    newName: string
  }

  //create a binding to store the Name provided by event, when clicking enter
  const [inputName, setInputName] = useState("")
  const [inputId, setInputId] = useState("")

  async function ApiCall(){
    try {
      const response = await axios.patch("http://localhost:3000/api/updateListName", {id: inputId, newName: inputName} as RequestData)
    } catch (err){
      setIsError(true)
      console.log(err)
    }
  }

  return (
    <SwipeableListItem
      listType={Type.IOS}
      className="rounded-2xl"
      leadingActions={leadingActions(data.id)}
      trailingActions={trailingActions(data.id)}
      key={data.id}
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
          {(changingName === true) ? (
            <form
            onSubmit={

              (event)=>{console.log("CLICK ON LINE 100!")}

              // (event) =>{
              // event.preventDefault();
              // const { target } = event
              // setInputName((target as HTMLInputElement).value);
              // setInputId(data.id);
              // ApiCall()}

            }>
            <input
              type="Text"
              placeholder={clsx(!data.listName ? "New Name" : data.listName )}
              className="uppercase cards-title font-heading bg-transparent placeholder:text-primary-transparent text-primary-default-Solid focus:outline-none"
            />
            </form>
          ) : (
            <p
              onClick={()=>setChangingName(true)}
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
          <p>{data.createdAt}</p>
        </div>
      </div>
    </SwipeableListItem>
  );
}

export const handleDelete = (id: string) => () => {
  console.log("[Handle DELETE]", id);
};

export const handlePin = (id: string) => () => {
  console.log("[Handle PIN]", id);
};

export const leadingActions = (id: string) => (
  <LeadingActions>
    <SwipeAction onClick={handlePin(id)}>
      <div
        onClick={() => {console.log("CLICK!")}}
        className="bg-primary-default-Solid flex justify-center content-center text-text-white place-items-center rounded-l-2xl"
      >
        <div
        className="flex gap-7 ml-7 mr-7 m-0 content-center">
          <span className="h-6 w-6 m-0">
            <Bookmark />
          </span>
          <p className="bg-white text-links pt-[0.1rem]">Pin</p>
        </div>
      </div>
    </SwipeAction>
  </LeadingActions>
);

export const trailingActions = (id: string) => (
  <TrailingActions>
    <SwipeAction onClick={handleDelete(id)}>
      <div
        onClick={() => {console.log("CLICK!")}}
        className="bg-ux-error flex justify-center content-center text-text-white place-items-center rounded-r-2xl"
      >
        <div
        className="flex gap-7 ml-7 mr-7 m-0 content-center">
          <p className="bg-white text-links pt-[0.1rem]">Delete</p>
          <span className="h-6 w-6">
            <Trash className="stroke-text-white" />
          </span>
        </div>
      </div>
    </SwipeAction>
  </TrailingActions>
);
