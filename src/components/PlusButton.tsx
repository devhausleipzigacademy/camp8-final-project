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
    <div className="flex justify-center w-full overflow-y-visible fixed bottom-[75px] right-2">
      <button
        {...props}
        className="text-text-white text-2xl bg-primary-default-Solid  py-2 px-4 rounded-full h-20 w-20"
      >
        +
      </button>
    </div>
  );
}
