import React from "react";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function ToggleView() {
  const [enabled, setEnabled] = useState(false);
  const [theme, setTheme] = useState(false);

  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [theme]);
  // const handleThemeSwitch = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };
  return (
    <div className="py-2">
      <Switch.Group>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled
              ? "bg-secondary-default border-2 border-spacing-2 border-secondary-default"
              : "bg-secondary-default border-2 border-spacing-2 border-secondary-default"
          }
            relative inline-flex h-full w-full rounded-lg `}
        >
          <span className="sr-only dark">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              enabled
                ? "translate-x-full after:content-['Big'] text-text-white content-center"
                : "translate-x-0 after:content-['Normal'] text-text-white content-center"
            }
              pointer-events-none inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid  transition duration-200 ease-in-out `}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
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
            enabled
              ? "bg-secondary-default border-2 border-spacing-2 border-secondary-default"
              : "bg-secondary-default border-2 border-spacing-2 border-secondary-default"
          }
          relative inline-flex h-full w-full rounded-lg `}
        >
          <span className="sr-only "></span>
          <span
            aria-hidden="true"
            className={`${
              enabled
                ? "translate-x-full after:content-['Darkmode'] text-text-white content-center"
                : "translate-x-0 after:content-['Lightmode'] text-text-white content-center"
            }
            pointer-events-none inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid  transition duration-200 ease-in-out `}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
}
function Setting() {
  return (
    <div>
      Setting
      <MyToggle />
      <ToggleView />
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
    <div className="w-full max-w-md px-2 py-16 ">
      <Tab.Group>
        <Tab.List className="flex p-1 rounded-md bg-secondary-default ">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm font-medium leading-5 bg-secondary-default",
                  "focus:bg-primary-default-Solid focus:rounded-md ",
                  selected
                    ? "bg-primary-default-Solid"
                    : "bg-primary-default-Solid"
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
