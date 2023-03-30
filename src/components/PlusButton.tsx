import clsx from "clsx";
import React, { ReactNode } from "react";

interface PlusButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: string | ReactNode;
}

export function PlusButton(props: PlusButtonProps) {
  return (
    <div className={clsx("flex justify-center w-full overflow-y-visible fixed bottom-3 right-2")}
    >
      <button
        {...props}
        className="text-text-white text-2xl  bg-grad-default py-2 px-4 rounded-full h-20 w-20"
      >
        +
      </button>
    </div>
  );
}
