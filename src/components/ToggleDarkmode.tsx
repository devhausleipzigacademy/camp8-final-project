import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";

type ToggleView = {};

export function ToggleDarkmode(props: ToggleView) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="py-2">
      <Switch
        checked={theme === "light"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-full relative inline-flex h-full content-center rounded-lg text-primary-default-Solid bg-secondary-default border-secondary-default border-2 border-spacing-2 dark:bg-secondary-transparent dark:border-secondary-transparent"
      >
        <span className="sr-only ">Toggle Lightmode/Darkmode</span>
        <div className="flex justify-around w-full relative text-text-white z-10 px-4">
          <span
            data-headlessui-state="on"
            className={`${
              theme === "dark"
                ? " text-primary-default-Solid dark:text-white"
                : "text-text-white"
            }`}
          >
            Lightmode
          </span>

          <span
            className={`${
              theme === "light"
                ? " text-primary-default-Solid"
                : "text-text-white"
            }`}
          >
            Darkmode
          </span>
        </div>
        <span
          aria-hidden="true"
          className={`absolute ${
            theme === "dark" ? "translate-x-full" : "-translate-x-0"
          }
            pointer-events-none text-text-white inline-block h-full w-[50%] py-2 transform rounded-md bg-primary-default-Solid transition duration-300 ease-in-out `}
        ></span>
      </Switch>
    </div>
  );
}
