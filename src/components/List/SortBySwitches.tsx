import { List } from "@/pages/list";
import { RadioGroup } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { clsx } from "clsx";

export function sortByAlphabet(input: List) {
  const sorted = [...input];
  sorted.sort((a, b) => {
    const nameA = a.item.toUpperCase();
    const nameB = b.item.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sorted;
}
export function sortByCategory(input: List): List {
  const sorted = [...input];
  sorted.sort((a, b) => {
    const categoryA = a.category.toUpperCase();
    const categoryB = b.category.toUpperCase();

    const nameA = a.item.toUpperCase();
    const nameB = b.item.toUpperCase();

    if (categoryA < categoryB) {
      return -1;
    }
    if (categoryA > categoryB) {
      return 1;
    }

    if (categoryA === categoryB) {
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
    return 0;
  });
  return sorted;
}

export function sortByDate() {}

type SortByProps = {
  sortBy: string;
  setSort: Dispatch<SetStateAction<string>>;
};

export function SortBySwitches(props: SortByProps) {
  return (
    <>
      <RadioGroup
        className="font-sans flex flex-row justify-center items-center bg-secondary-transparent text-sm h-7 gap-2 rounded-[10px]"
        value={props.sortBy}
        onChange={props.setSort}
      >
        <RadioGroup.Option className="h-full w-1/3" value="date">
          {({ checked }) => (
            <p
              className={clsx(
                "h-full  flex justify-center items-center rounded-[10px] ",
                checked ? "bg-primary-default-background text-text-white" : ""
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
                "h-full  flex justify-center items-center rounded-[10px] ",
                checked ? "bg-primary-default-background text-text-white" : ""
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
                "h-full  flex justify-center items-center rounded-[10px] ",
                checked ? "bg-primary-default-background text-text-white" : ""
              )}
            >
              Alphabetical
            </p>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </>
  );
}
