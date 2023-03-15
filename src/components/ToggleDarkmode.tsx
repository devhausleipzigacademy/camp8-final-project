import React from "react";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ToggleView = {};

export function ToggleDarkmode(props: ToggleView) {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="py-2 ">
      <Switch.Group>
        <Switch
          checked={theme}
          onChange={setTheme}
          className={`w-full relative${
            theme
              ? " text-primary-default-Solid bg-secondary-default border-secondary-default border-2 border-spacing-2 "
              : " text-primary-default-Solid bg-secondary-default border-secondary-default border-2 border-spacing-2 "
          }
          relative inline-flex h-full w-full content-center rounded-lg `}
        >
          <span className="sr-only ">Toggle Lightmode/Darkmode</span>
          <div className="flex justify-around w-full relative text-text-white z-10 px-4">
            <span
              className={`${
                theme ? " text-primary-default-Solid" : "text-text-white"
              }`}
            >
              Lightmode
            </span>

            <span
              className={`${
                !theme ? " text-primary-default-Solid" : "text-text-white"
              }`}
            >
              Darkmode
            </span>
          </div>
          <span
            aria-hidden="true"
            className={`absolute ${
              theme ? "translate-x-full" : "-translate-x-0"
            }
            pointer-events-none text-text-white inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid transition duration-300 ease-in-out `}
          ></span>
        </Switch>
      </Switch.Group>
    </div>
  );
}
