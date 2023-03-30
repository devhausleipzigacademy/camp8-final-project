import React from "react";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { ToggleDarkmode } from "./ToggleDarkmode";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type InputProps = {
  auth: boolean;
};
export default function TabAccountSetting({ auth }: InputProps) {
  let [categories, setCategories] = useState<Record<string, Array<never>>>({
    Setting: [],
    Account: [],
  });
  if (auth && Object.keys(categories).length === 2) {
    setCategories({ ...categories, Review: [] });
  }

  return (
    <div className="w-full max-w-md px-2 py-16 ">
      <Tab.Group>
        <Tab.List className="flex p-1 rounded-md bg-secondary-default justify-between text-sm ">
          {Object.keys(categories).map((category) => (
            <Tab key={category}>
              {({ selected }) => (
                <label
                  className={classNames(
                    selected
                      ? "bg-primary-default-Solid rounded-md px-20"
                      : "bg-secondary-default rounded-md px-20"
                  )}
                >
                  {category}
                </label>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className={""}>
            <Setting />
          </Tab.Panel>
          <Tab.Panel className={""}>
            <Account />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function Setting() {
  return (
    <div className="bg-primarydefault-Solid dark:bg-black">
      Setting
      <ToggleDarkmode />
    </div>
  );
}

function Account() {
  return <div>Account</div>;
}
