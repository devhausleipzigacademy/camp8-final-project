import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { clsx } from "clsx";
import { sortByAlphabet, sortByCategory } from "@/components/sortBy";

export type List = Array<{
  item: string;
  quantity: number;
  category: string;
}>;
export type Categories = Array<{ id: number; name: string; quantity: number }>;

const listItems: List = [
  { item: "tomatoes", quantity: 1, category: "vegetables" },
  { item: "pepper", quantity: 1, category: "spices" },
  { item: "onion", quantity: 1, category: "vegetables" },
  { item: "apple", quantity: 1, category: "fruit" },
  { item: "kiwi", quantity: 1, category: "fruit" },
  { item: "pork", quantity: 1, category: "meat" },
  { item: "toothpaste", quantity: 1, category: "hygiene" },
  { item: "kurkuma", quantity: 1, category: "spices" },
  { item: "pumpkin", quantity: 1, category: "vegetables" },
  { item: "deodorant", quantity: 1, category: "hygiene" },
  { item: "shampoo", quantity: 1, category: "hygiene" },
  { item: "crocodile", quantity: 1, category: "meat" },
  { item: "alman", quantity: 1, category: "vegetables" },
  { item: "cinnamon", quantity: 1, category: "spices" },
  { item: "cabbage", quantity: 1, category: "vegetables" },
];

export default function List() {
  const [sortBy, setSortBy] = useState("date");
  let sectionName = "";

  switch (sortBy) {
    case "date":
      break;
    case "category":
      sortByCategory(listItems);
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
        {listItems.map((product) => {
          let nameSection = false;

          if (sortBy === "category") {
            if (product.category !== sectionName) {
              sectionName = product.category;
              nameSection = true;
            }
          }
          return (
            <div>
              {nameSection ? <p>{sectionName + ":"}</p> : <p></p>}
              <p className="bg-slate-300 rounded-2xl">{product.item}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
