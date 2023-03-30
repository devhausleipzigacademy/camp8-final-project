import React, { useEffect } from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useSzieStore } from "@/pages/stores/styleStore";

type ToggleView = {};

export function ToggleView(props: ToggleView) {
  const { isFontSizeBig, setSize } = useSzieStore();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isFontSizeBig]);

  if (loading) return null;
  return (
    <div className="py-2">
      <Switch.Group>
        <Switch
          checked={!isFontSizeBig}
          onChange={setSize}
          className="w-full relative inline-flex h-full content-center rounded-lg text-primary-default-Solid bg-secondary-default border-secondary-default border-2 border-spacing-2 dark:bg-secondary-transparent dark:border-secondary-transparent"
        >
          <span className="sr-only ">Toggle size of components</span>
          <div className="flex justify-around w-full relative text-text-white z-10 px-4">
            <span
              className={`${
                isFontSizeBig
                  ? " text-primary-default-Solid dark:text-text-white"
                  : "text-text-white"
              }`}
            >
              Normal
            </span>

            <span
              className={`${
                !isFontSizeBig
                  ? " text-primary-default-Solid dark:text-text-white"
                  : "text-text-white"
              }`}
            >
              Big
            </span>
          </div>
          <span
            aria-hidden="true"
            className={`absolute ${
              isFontSizeBig ? "translate-x-full" : "-translate-x-0"
            }
            pointer-events-none text-text-white inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid transition duration-300 ease-in-out `}
          ></span>
        </Switch>
      </Switch.Group>
    </div>
  );
}
