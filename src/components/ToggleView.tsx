import { Switch } from "@headlessui/react";
import { useState } from "react";

type ToggleView = {};



export function ToggleView(props: ToggleView) {
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
          <span className="sr-only ">Use setting</span>
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
