import { useState } from "react";
import { Tab } from "@headlessui/react";

type Category = string;
type Post = {
  id: number;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function SortByButton() {
  let [categories] = useState<Record<Category, Post[]>>({
    RECENT: [{ id: 1 }],
    CATEGORY: [{ id: 2 }],
    ALPHABETIC: [{ id: 3 }],
  });

  return (
    <div className="w-full h-full flex flex-col px-2 py-16 font-sans sm:px-0 outline-1 outline-primary-default-background">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-secondary-transparent p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 font-medium leading-5  text-text-white focus:outline-none",
                  selected
                    ? "bg-primary-default-Solid text-text-white"
                    : "text-ux-inactive"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
