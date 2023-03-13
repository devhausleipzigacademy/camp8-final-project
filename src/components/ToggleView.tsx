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
          className={`${
            size
              ? " text-primary-default-Solid  bg-secondary-transparent border-secondary-default"
              : "bg-secondary-transparent  text-primary-default-Solid  border-secondary-default"
          }
          relative inline-flex h-full w-full content-center rounded-lg `}
        >
          <span className="sr-only ">Toggle size of components</span>
          <span
            aria-hidden="true"
            className={`${
              size
                ? "translate-x-full before:content-['Big'] text-text-white "
                : "-translate-x-0 after:content-['Normal'] text-text-white "
            }
            pointer-events-none  inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid transition duration-300 ease-in-out `}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
}
