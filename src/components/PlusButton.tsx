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
    <button
      {...props}
      className="text-text-white text-2xl bg-primary-default-Solid  py-2 px-4 rounded-full"
    >
      +
    </button>
  );
}
