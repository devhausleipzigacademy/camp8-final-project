import React, { useEffect } from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";

type ToggleView = {};

export function ToggleView(props: ToggleView) {
  const [size, setSize] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (size) {
      htmlElement.classList.add("big");
    } else {
      htmlElement.classList.remove("big");
    }
  }, [size]);

  return (
    <div className="py-2">
      <Switch.Group>
        <Switch
          checked={size}
          onChange={setSize}
          className={`w-full relative${
            size
              ? " text-primary-default-Solid  bg-secondary-transparent border-secondary-default"
              : "bg-secondary-transparent  text-primary-default-Solid  border-secondary-default"
          }
          relative inline-flex h-full w-full content-center rounded-lg `}
        >
          <span className="sr-only ">Toggle size of components</span>
          <div className="flex justify-around w-full relative text-text-white z-10 px-4">
            <span
              className={`${
                size ? " text-primary-default-Solid" : "text-text-white"
              }`}
            >
              Normal
            </span>

            <span
              className={`${
                !size ? " text-primary-default-Solid" : "text-text-white"
              }`}
            >
              Big
            </span>
          </div>
          <span
            aria-hidden="true"
            className={`absolute ${size ? "translate-x-full" : "-translate-x-0"}
            pointer-events-none text-text-white inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid transition duration-300 ease-in-out `}
          ></span>
        </Switch>
      </Switch.Group>
    </div>
  );
}
