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
import { HiOutlineTrash, HiBookmark } from "react-icons/hi";

type Props = {
  data: {
    title?: string;
    dateCreated: Date;
    checkedItems: number;
    totalItems: number;
  };
  createNewCard?: Boolean;
  favorite?: Boolean;
  onRemove: Function;
};

export default function Card({
  data: { dateCreated, checkedItems, totalItems, title },
  createNewCard,
  favorite,
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
    "rounded-2xl  w-full h-44 ";

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
          cardBackgroundSwipe === "left" && "bg-ux-error",
          cardBackgroundSwipe === "right" && "bg-ux-success"
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
            'border p-5 border-secondary-transparent flex flex-col justify-between',
            createNewCard
              ? "text-primary-transparent"
              : "text-primary-default-Solid",
            inDeletion ? "bg-secondary-default" : "bg-card"
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
                className="text-4xl uppercase font-heading bg-[transparent] placeholder:text-primary-transparent text-primary-default-Solid focus:outline-none"
              />
            ) : (
              <p className="text-4xl uppercase font-heading ">{title}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>{favorite && <HiBookmark className="h-6 w-6"/>}</div>
            <p className="text-xl">
              {isToday(dateCreated)
                ? "today"
                : format(dateCreated, "P", { locale: de })}
            </p>
          </div>
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
