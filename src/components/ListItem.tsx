import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { Tick } from "./Tick";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import axios from "axios";

type ListItemProps = {
  name: string;
  image: string;
  quantity?: string;
  checked: boolean;
  onRemove: () => void;
};
// onRemove is added so higher level page can trigger a function when an item is removed.
export default function ListItem(props: ListItemProps) {
  const [swiped, setSwiped] = useState(true);
  const onDelete = () => {
    setSwiped(false);
    props.onRemove();
  };
  // const checked = ()=>{
  //   axios.patch()
  // }
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.log("Checked")} Tag="div">
        <div
          id="Tick_Action"
          className="w-full h-full bg-grad-default button-bold text-text-white flex items-center"
        >
          Tick
        </div>
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={onDelete} Tag="div">
        <div
          id="Delete_Action"
          className=" bg-ux-error button-bold text-text-white flex items-center justify-center text-left"
        >
          <p>Delete</p>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Transition
      show={swiped}
      appear={true}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0 scale-y-0"
      enterTo="opacity-100 scale-y-100"
      leave="transform duration-[400ms] transition ease-in-out"
      leaveFrom="opacity-100 scale-y-100 "
      leaveTo="opacity-0 scale-y-0 "
    >
      <SwipeableListItem
        className="w-full h-16 bg-primary-transparent border border-secondary-default rounded-md flex flex-row"
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        threshold={0.5}
      >
        <div className="flex justify-center items-center h-full bg-text-white p-2">
          <img className="h-full aspect-square" src={props.image} />
        </div>
        <div className="flex p-2 justify-between items-center flex-grow">
          <p className="text-text-typo text-primary">{props.name}</p>
          <p className="text-secondary font-thin">{props.quantity}</p>
          <div className="relative w-10 h-8">
            <Transition
              show={props.checked}
              enter="transform transition duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg] scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-200 transition ease-in-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
              className="absolute"
            >
              <FiCheckSquare
                className="w-8 h-8 text-primary-default-Solid"
                onClick={() => console.log("Checked")}
              />
            </Transition>
            <Transition
              show={!props.checked}
              enter="transform transition duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg] scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-200 transition ease-in-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
              className="absolute top-0 left-0"
            >
              <FiSquare
                className="w-8 h-8 text-primary-default-Solid"
                onClick={() => console.log("Checked")}
              />
            </Transition>
          </div>
        </div>
      </SwipeableListItem>
    </Transition>
  );
}
