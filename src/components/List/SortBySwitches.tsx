import { List } from "@/pages/list";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

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
  setSortBy: Dispatch<SetStateAction<string>>;
};

export function SortBySwitches(props: SortByProps) {
  return (
    <>
      <div className="flex flex-col gap-2 m-6">
        <RadioGroup
          className="flex flex-row gap-4"
          value={props.sortBy}
          onChange={props.setSortBy}
        >
          <RadioGroup.Label>Sort by:</RadioGroup.Label>
          <RadioGroup.Option value="date">
            {({ checked }) => (
              <span
                className={clsx(
                  "rounded-2xl",
                  checked ? "bg-green-300" : "bg-slate-300 "
                )}
              >
                Date
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="category">
            {({ checked }) => (
              <span
                className={clsx(
                  "rounded-2xl",
                  checked ? "bg-green-300" : "bg-slate-300 "
                )}
              >
                Category
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="alphabetical">
            {({ checked }) => (
              <span
                className={clsx(
                  " rounded-2xl",
                  checked ? "bg-green-300" : "bg-slate-300"
                )}
              >
                Alphabetical
              </span>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
    </>
  );
}
