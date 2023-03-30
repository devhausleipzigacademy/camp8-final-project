import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

type Props = {
  label?: string;
  sendTo?: string;
};

export function HeaderWithBack(props: Props) {
  return (
    <div className="flex items-center gap-2">
      <Link href={props.sendTo ?? "/"}>
        <FiChevronLeft className="w-6 h-6 text-text-typo dark:text-white" />
      </Link>
      <h1 className="text-text-typo dark:text-white text-primary text-links">
        {props.label}
      </h1>
    </div>
  );
}
