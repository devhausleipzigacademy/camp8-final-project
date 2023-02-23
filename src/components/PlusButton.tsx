import React from "react";

type PlusButton = {
  add: React.MouseEventHandler<HTMLButtonElement>;
};

export function PlusButton(props: PlusButton) {
  return (
    <div>
      <button
        onClick={props.add}
        className="text-white text-2xl bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full px-5 py-2.5 text-center mr-2 mb-2"
      >
        +
      </button>
    </div>
  );
}
