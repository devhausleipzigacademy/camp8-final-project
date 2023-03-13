import {
  SwipeableListItem,
  Type,
  SwipeAction,
  TrailingActions,
  LeadingActions,
} from "react-swipeable-list";
import clsx from "clsx";
import "react-swipeable-list/dist/styles.css";
import { Trash, Bookmark } from "react-feather";

export default function SingleCard({ ...CardProps }) {

  //rewrite so that data gets fed in only ONCE (?)
  return (
    <SwipeableListItem
    listType={Type.IOS}
    className="flex"
    leadingActions={leadingActions(CardProps.data.id)}
    trailingActions={trailingActions(CardProps.data.id)}
    >
      <div
        className={clsx(
          "border border-secondary-transparent rounded-2xl flex flex-col gap-[10px] w-full h-44gap-[10px] p-5 justify-between bg-secondary-transparent",
          CardProps.createNewCard
            ? "text-primary-transparent"
            : "text-primary-default-Solid "
        )}
      >
        <div className="flex flex-col gap-3 rounded-[14px]">
          <p className="button-bold font-semibold">
            {`${CardProps.data.itemsChecked}/${CardProps.data.itemsTotal} Items`}
          </p>
          {CardProps.createNewCard ? (
            <input
              type="text"
              placeholder="new list"
              className="text-title uppercase font-heading bg-transparent placeholder:text-primary-transparent text-primary-default-Solid focus:outline-none"
              //onClick?
            />
          ) : (
            <p className="text-title uppercase font-heading ">
              {CardProps.data.listName}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="text-primary">
            {CardProps.data.favorite && <Bookmark className="h-6 w-6" />}
          </div>
          <p>{CardProps.data.createdAt}</p>
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
      <div className="bg-primary-default-Solid flex justify-center content-center text-text-white place-items-center rounded-l-2xl">
        <div className="flex gap-8 ml-8 mr-7 m-0 content-center">
          <span className="h-6 w-6 m-0">
            <Bookmark />
          </span>
          <p className="bg-white text-primary">Pin</p>
        </div>
      </div>
    </SwipeAction>
  </LeadingActions>
);

export const trailingActions = (id: string) => (
  <TrailingActions>
    <SwipeAction onClick={handleDelete(id)}>
      <div className="bg-ux-error flex justify-center content-center text-text-white place-items-center rounded-r-2xl">
        <div className="flex gap-8 ml-6 mr-8 m-0 content-center">
          <span className="h-6 w-6">
            <Trash className="stroke-text-white"/>
          </span>
          <p className="bg-white text-primary">Pin</p>
        </div>
      </div>
    </SwipeAction>
  </TrailingActions>
);
