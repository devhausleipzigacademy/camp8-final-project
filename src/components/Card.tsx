import {
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import "react-swipeable-list/dist/styles.css";
import { HiOutlineTrash } from "react-icons/hi";

type Props = {
  data: {
    title?: string;
    dateCreated: Date;
    checkedItems: number;
    totalItems: number;
  };
  createNewCard?: Boolean;
  onRemove: Function;
};

export default function Card({
  data: { dateCreated, checkedItems, totalItems, title },
  createNewCard,
  onRemove,
}: Props) {
  const [swiped, setSwiped] = useState(true);
  const [inDeletion, setIndDeletion] = useState(false);

  const [cardBackgroundSwipe, setCardBackgroundSwipe] = useState("");

  function deleteListItem() {
    setIndDeletion(true);
    setSwiped(false);
    onRemove();
  }

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteListItem()}>
        <DeleteList />
      </SwipeAction>
    </TrailingActions>
  );

  function styleSwipe(direction: string) {
    setCardBackgroundSwipe(direction);
  }

  const basicCardStyle =
    "rounded-2xl border-purple-300 p-5 flex flex-col w-full h-44 justify-between";

  return (
    <Transition
      show={swiped}
      appear={true}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0 scale-y-0"
      enterTo="opacity-100 scale-y-100"
      leave="transform duration-[400ms] transition ease-in-out"
      leaveFrom="opacity-100 scale-y-100"
      leaveTo="opacity-0 scale-y-0"
    >
      <div
        className={clsx(
          basicCardStyle,
          "-z-10 absolute",
          cardBackgroundSwipe === "left" ? "bg-ux-error" : "bg-ux-success"
        )}
        id="swipe-bg"
      ></div>
      <SwipeableListItem
        threshold={0.5}
        trailingActions={trailingActions()}
        onSwipeStart={styleSwipe}
        className="flex"
      >
        <div
          className={clsx(
            basicCardStyle,
            createNewCard ? "text-secondary-transparent" : "text-text-white",
            inDeletion
              ? "bg-secondary-default"
              : "bg-primary-default-background"
          )}
        >
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-semibold">
              {checkedItems}/{totalItems} Items
            </p>
            {createNewCard ? (
              <input
                type="text"
                placeholder="new list"
                className="text-4xl uppercase font-heading bg-[transparent] placeholder:text-secondary-transparent text-text-white focus:outline-none"
              />
            ) : (
              <p className="text-4xl uppercase font-heading ">{title}</p>
            )}
          </div>
          <p className="text-xl self-end">
            {isToday(dateCreated)
              ? "today"
              : format(dateCreated, "P", { locale: de })}
          </p>
        </div>
      </SwipeableListItem>
    </Transition>
  );
}

function DeleteList() {
  return (
    <div className="justify-center items-center flex pl-4 my-3">
      <HiOutlineTrash className="h-10 w-10 m-10 text-text-white" />
    </div>
  );
}
