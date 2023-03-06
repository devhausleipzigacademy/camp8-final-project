import { useState } from "react";
import { Switch } from "@headlessui/react";

export function TabComponentStupid() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="py-4 ">
      <Switch.Group>
        <div className="flex items-center">
          <Switch.Label className="mr-4">Enable notifications</Switch.Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-priamry-default-Solid" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-primary-default-Solid" : ""}
           w-full h-12 rounded-xl border-2 `}
      >
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-52" : "translate-x-0"}`}
        ></span>
      </Switch>

      <div className="toggle-button-cover ">
        <div className="button-cover">
          <div className="button" id="button-3">
            <input type="checkbox" className="checkbox" />
            <div className="knobs"></div>
            <div className="layer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
