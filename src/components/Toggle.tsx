import { useState, Fragment } from "react";
import { Switch } from "@headlessui/react";

type Props = {
  name: string;
};
export default function Toggle({ name }: Props) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
      {({ checked }) => (
        <button
          className={`bg-gray-300 relative inline-flex h-6 w-12 items-center rounded-full border-2 border-purple-600`}
        >
          <span className="sr-only">Enable {name}</span>
          <span
            className={`${
              checked ? "translate-x-5" : "translate-x-1"
            } inline-block h-4 w-5 transform rounded-full bg-purple-600 transition`}
          />
        </button>
      )}
    </Switch>
  );
}
