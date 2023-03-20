import { Transition } from "@headlessui/react";
import { useState } from "react";
import {
  LeadingActions,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { CheckSquare, Square } from "react-feather";
import clsx from "clsx";

type ListItemProps = {
  name: string;
  image: string;
  quantity?: string;
  checked: boolean;
  onRemove: () => void;
};
// onRemove is added so higher level page can trigger a function when an item is removed.
export default function ListItem(props: ListItemProps) {
  const [checked, setChecked] = useState(props.checked);
  const [swiped, setSwiped] = useState(true);
  const onCheck = () => {
    setChecked(!checked);
  };
  const onDelete = () => {
    setSwiped(false);
    props.onRemove();
  };
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={onCheck} Tag="div">
        <div
          id="Tick_Action"
          className="w-full h-full bg-ux-success button-bold text-text-white flex items-center"
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
        className={clsx(checked? 'bg-primary-transparent':'bg-secondary-transparent' ,"max-w-[334px] h-16 border border-secondary-default rounded-md flex gap-3")}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        threshold={0.5}
      >
        <img
          className="h-full aspect-square"
          src={
            props.image
              ? props.image
              : "http://cdn.onlinewebfonts.com/svg/img_275679.png"
          }
          alt="http://cdn.onlinewebfonts.com/svg/img_275679.png"
        />
        <div className="flex justify-between items-center px-3 w-full text-text-typo">
          <p className="text-primary">{props.name}</p>
          <p className="text-secondary">{props.quantity}</p>
          {checked ? (
            <CheckSquare onClick={onCheck} />
          ) : (
            <Square onClick={onCheck} />
          )}
        </div>
      </SwipeableListItem>
    </Transition>
  );
}
