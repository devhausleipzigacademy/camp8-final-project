import {
  SwipeableListItem,
  Type,
  SwipeAction,
  TrailingActions,
  LeadingActions} from "react-swipeable-list";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import "react-swipeable-list/dist/styles.css";
import { Trash, Bookmark } from "react-feather";

////TO-DO
//1.
//ADD to change the optics:
//onSwipeProgress
//Type: (progress: number, dragDirection: string) => void
//Fired every time swipe progress changes. The reported progress value is always an integer in range 0 to 100 inclusive. dragDirection can have value of left or right.
//2.
//onSwipeEnd={resetCardBackgroundSwip}
//to define what happens when swip-Action stops
//use 'resetCardBackgroundSwip' after the list Item snaps back
//Idea: use blockSwipe={true} till the Component is reset to the original state
//3.
////Date will be automatically generated in the back-end

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
  onPin: Function;
};

export default function Card({
  data: { dateCreated, checkedItems, totalItems, title },
  createNewCard,
  favorite,
  onRemove,
  onPin,
}: Props) {
  const [swiped, setSwiped] = useState(true);
  const [inDeletion, setIndDeletion] = useState(false);
  const [whileSwiping, setWhileSwiping] = useState(false);
  const [cardBackgroundSwipe, setCardBackgroundSwipe] = useState("");

  function deleteList() {
    setIndDeletion(true);
    setSwiped(false);
    onRemove();
    setCardBackgroundSwipe("left");
  }

  function pinList() {
    setWhileSwiping(true);
    setSwiped(false);
    onPin();
    setCardBackgroundSwipe("right");
  }

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteList()}>
        <DeleteList />
      </SwipeAction>
    </TrailingActions>
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => pinList()}>
        <PinList />
      </SwipeAction>
    </LeadingActions>
  );

  function styleSwipe(direction: string) {
    setCardBackgroundSwipe(direction);
  }
  function reset() {
    setCardBackgroundSwipe("");
  }

  const basicCardStyle = "rounded-2xl w-full h-44";

  return (
    <Transition
      show={swiped}
      appear={true}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0 scale-x-0"
      enterTo="opacity-100 scale-x-100"
      leave="transform duration-[100ms] transition ease-in-out"
      leaveFrom="opacity-100 scale-x-100"
      leaveTo="opacity-0 scale-x-0"
    >
      <div
        className={clsx(
          basicCardStyle,
          "-z-10 absolute",
          cardBackgroundSwipe === "left" && "bg-ux-error",
          cardBackgroundSwipe === "right" && "bg-primary-default-Solid"
        )}
        id="swipe-bg"
      ></div>
      <SwipeableListItem
        listType={Type.IOS}
        trailingActions={trailingActions()}
        leadingActions={leadingActions()}
        onSwipeStart={styleSwipe}
        onSwipeEnd={()=>{console.log("FUCK")}}
        scrollStartThreshold={1000} //How far in pixels scroll needs to be done to block swiping. After scrolling is started and goes beyond the threshold, swiping is blocked.
        swipeStartThreshold={50} //unneccessary
        destructiveCallbackDelay={2000} // time before deletion
        className="flex"

      >
        <div
          className={clsx(
            basicCardStyle,
            "border p-5 border-secondary-transparent flex flex-col justify-between bg-card",
            createNewCard
              ? "text-primary-transparent"
              : "text-primary-default-Solid"
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
            <div>{favorite && <Bookmark className="h-6 w-6" />}</div>
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
    <div className="justify-center items-center flex gap-5 pl-4 my-3 text-text-white">
      <p className="text-links">delete</p>
      {
        //needs follow.up actions?
      }
      <Trash className="h-10 w-10 mr-10" />
    </div>
  );
}

function PinList() {
  return (
    <div className="justify-center items-center flex gap-5 pl-4 my-3 text-text-white">
      <p className="text-primary">pin</p>
      {
        //needs follow.up actions?
      }
      <Bookmark className="h-10 w-10 mr-10" />
    </div>
  );
}
