import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { clsx } from "clsx";
import { sortByAlphabet } from "@/components/sortBy";

export type List = Array<{
  item: string;
  date: string;
  quantity: number;
  category: string;
}>;
export type Categories = Array<{ id: number; name: string; quantity: number }>;

const listItems: List = [
  { item: "tomatoes", date: "", quantity: 1, category: "vegetables" },
  { item: "pepper", date: "", quantity: 1, category: "spices" },
  { item: "onion", date: "", quantity: 1, category: "vegetables" },
  { item: "apple", date: "", quantity: 1, category: "fruit" },
  { item: "kiwi", date: "", quantity: 1, category: "fruit" },
  { item: "pork", date: "", quantity: 1, category: "meat" },
];

export default function List() {
  const [sortBy, setSortBy] = useState("date");

  switch (sortBy) {
    case "date":
      break;
    case "category":
      break;
    case "alphabetical":
      sortByAlphabet(listItems);
      break;
  }

  return (
    <>
      <div className="flex flex-col gap-2 m-6">
        <RadioGroup
          className="flex flex-row gap-4"
          value={sortBy}
          onChange={setSortBy}
        >
          <RadioGroup.Label>Sort by:</RadioGroup.Label>
          <RadioGroup.Option value="date">
            {({ checked }) => (
              <span
                className={clsx(
                  "bg-slate-300 rounded-2xl",
                  checked ? "bg-green-300" : ""
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
                  "bg-slate-300 rounded-2xl",
                  checked ? "bg-green-300" : ""
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
                  "bg-slate-300 rounded-2xl",
                  checked ? "bg-green-300" : ""
                )}
              >
                Alphabetical
              </span>
            )}
          </RadioGroup.Option>
        </RadioGroup>
        {listItems.map((product) => (
          <p className="bg-slate-300 rounded-2xl">{product.item}</p>
        ))}
      </div>
    </>
  );
}
