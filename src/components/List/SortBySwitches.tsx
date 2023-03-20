import { RadioGroup } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { clsx } from "clsx";

type SortByProps = {
  sortBy: string;
  setSort: Dispatch<SetStateAction<string>>;
  className: string;
};

export function SortBySwitches(props: SortByProps) {
  return (
    <RadioGroup
      className="font-sans flex flex-row justify-center items-center bg-secondary-transparent text-sm h-7 rounded-listitem"
      value={props.sortBy}
      onChange={props.setSort}
    >
      <RadioGroup.Option className="h-full w-1/3" value="date">
        {({ checked }) => (
          <p
            className={clsx(
              "h-full w-full flex justify-center items-center rounded-listitem",
              checked && "bg-primary-default-Solid text-text-white"
            )}
          >
            Date
          </p>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="h-full w-1/3" value="category">
        {({ checked }) => (
          <p
            className={clsx(
              "h-full w-full  flex justify-center items-center rounded-listitem",
              checked && "bg-primary-default-Solid text-text-white"
            )}
          >
            Category
          </p>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="h-full w-1/3" value="alphabetical">
        {({ checked }) => (
          <p
            className={clsx(
              "h-full w-full flex justify-center items-center rounded-listitem",
              checked && "bg-primary-default-Solid text-text-white"
            )}
          >
            Alphabetical
          </p>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}
