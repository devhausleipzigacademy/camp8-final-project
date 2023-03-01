import {} from "react-swipeable-list";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import clsx from "clsx";

type Props = {
  data: {
    title?: string;
    dateCreated: Date;
    checkedItems: number;
    totalItems: number;
  };
  createNewCard?: Boolean;
};

export default function Card({
  data: { dateCreated, checkedItems, totalItems, title },
  createNewCard,
}: Props) {
  return (
    <div
      className={clsx(
        "border rounded-2xl border-purple-300 p-5 flex flex-col w-full h-44 justify-between bg-primary-default-background",
        createNewCard ? "text-secondary-transparent" : "text-text-white"
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
            className="text-4xl uppercase font-heading bg-primary-default-background placeholder:text-secondary-transparent text-text-white focus:outline-none"
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
  );
}
