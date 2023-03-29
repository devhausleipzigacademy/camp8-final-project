import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useStyleStore } from "@/pages/stores/styleStore";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ToggleView = {};

export function ToggleDarkmode(props: ToggleView) {
  const { darkMode, toggleDarkMode } = useStyleStore();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [darkMode]);

  if (loading) return null;
  return (
    <div className="py-2">
      <Switch
        checked={!darkMode}
        onChange={toggleDarkMode}
        className="w-full relative inline-flex h-full content-center rounded-lg text-primary-default-Solid bg-secondary-default border-secondary-default border-2 border-spacing-2 "
      >
        <span className="sr-only ">Toggle Lightmode/Darkmode</span>
        <div className="flex justify-around w-full relative text-text-white z-10 px-4">
          <span
            data-headlessui-state="on"
            className={`${
              darkMode ? " text-primary-default-Solid" : "text-text-white"
            }`}
          >
            Lightmode
          </span>

          <span
            className={`${
              !darkMode ? " text-primary-default-Solid" : "text-text-white"
            }`}
          >
            Darkmode
          </span>
        </div>
        <span
          aria-hidden="true"
          className={`absolute ${
            darkMode ? "translate-x-full" : "-translate-x-0"
          }
            pointer-events-none text-text-white inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid transition duration-300 ease-in-out `}
        ></span>
      </Switch>
    </div>
  );
}
