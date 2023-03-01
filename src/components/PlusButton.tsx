import React from "react";

type PlusButton = {
  add: React.MouseEventHandler<HTMLButtonElement>;
};

export function PlusButton(props: PlusButton) {
  return (
    <button
      onClick={props.add}
      className="text-text-white text-2xl bg-primary-default-Solid  py-2 px-4 rounded-full"
    >
      +
    </button>
  );
}
