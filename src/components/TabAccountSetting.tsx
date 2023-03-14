import React from "react";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
// export function ToggleView() {
//   const [enabled, setEnabled] = useState(false);
//   const [theme, setTheme] = useState(false);
//   return (
//     <div className="py-2">
//       <Switch.Group>
//         <Switch
//           checked={enabled}
//           onChange={setEnabled}
//           className={`${
//             enabled
//               ? "bg-secondary-default border-2 border-spacing-2 border-secondary-default"
//               : "bg-secondary-default border-2 border-spacing-2 border-secondary-default"
//           }
//             relative inline-flex h-full w-full rounded-lg `}
//         >
//           <span className="sr-only dark">Use setting</span>
//           <span
//             aria-hidden="true"
//             className={`${
//               enabled
//                 ? "translate-x-full after:content-['Big'] text-text-white content-center"
//                 : "translate-x-0 after:content-['Normal'] text-text-white content-center"
//             }
//               pointer-events-none inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid  transition duration-200 ease-in-out `}
//           />
//         </Switch>
//       </Switch.Group>
//     </div>
//   );
// }

// export function MyToggle() {
//   const [enabled, setEnabled] = useState(false);
//   return (
//     <div className="py-2">
//       <Switch.Group>
//         <Switch
//           checked={enabled}
//           onChange={setEnabled}
//           className={`${
//             enabled
//               ? "bg-secondary-default border-2 border-spacing-2 border-secondary-default"
//               : "bg-secondary-default border-2 border-spacing-2 border-secondary-default"
//           }
//           relative inline-flex h-full w-full rounded-lg `}
//         >
//           <span className="sr-only "></span>
//           <span
//             aria-hidden="true"
//             className={`${
//               enabled
//                 ? "translate-x-full after:content-['Darkmode'] text-text-white content-center"
//                 : "translate-x-0 after:content-['Lightmode'] text-text-white content-center"
//             }
//             pointer-events-none inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid  transition duration-200 ease-in-out `}
//           />
//         </Switch>
//       </Switch.Group>
//     </div>
//   );
// }

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
    <div className="py-2">
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

function Setting() {
  return (
    <div className="">
      Setting
      <ToggleDarkmode />
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
            <Tab key={category}>
              {({ selected }) => (
                <button
                  className={classNames(
                    selected
                      ? "bg-primary-default-Solid w-full text-sm font-medium leading-5 content-center gap-10"
                      : "bg-secondary-default w-full text-sm font-medium leading-5 content-center"
                  )}
                >
                  {category}
                </button>
              )}
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

// className={({ selected }) =>
// classNames(
//   "w-full py-2.5 text-sm font-medium leading-5 bg-secondary-default",
//   "",
//   selected
//     ? "bg-primary-default-Solid"
//     : "bg-primary-default-Solid"
// )
// }
