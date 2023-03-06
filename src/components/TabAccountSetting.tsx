import React from "react";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Switch } from "@headlessui/react";
import { TabComponentStupid } from "./StupidToggle";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function MyToggle() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="py-2">
      <Switch.Group>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-secondary-default" : "bg-secondary-default"
          }
          relative inline-flex pt-1 pl-1 h-10 w-full shrink-0 cursor-pointer rounded-lg border-1  border-secondary-default `}
        >
          <span className="sr-only ">Use setting</span>
          <span
            aria-label="text"
            aria-hidden="true"
            className={`${
              enabled
                ? "translate-x-full after:content-['Darkmode'] text-text-white content-center"
                : "translate-x-0 after:content-['Lightmode'] text-text-white content-center"
            }
            pointer-events-none inline-block h-[34px] w-[50%] transform rounded-md bg-primary-default-Solid  transition duration-200 ease-in-out `}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
}

export function TabComponent() {
  return <div></div>;
}

function Setting() {
  return (
    <div>
      Setting
      <TabComponent />
      <MyToggle />
      <MyToggle />
      <MyToggle />
    </div>
  );
}

function Account() {
  return <div>Account</div>;
}

export default function TabAccountSetting() {
  let [categories] = useState({
    Setting: [],
    Account: [],
  });

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
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
