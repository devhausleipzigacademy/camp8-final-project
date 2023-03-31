import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  label?: string;
  sendTo?: string;
  classNames: string;
};

export function HeaderWithBack(props: Props) {
  return (
    <div className={clsx(props.classNames, "flex items-center gap-2")}>
      <Link href={props.sendTo ?? "/"}>
        <FiChevronLeft className="w-6 h-6 text-text-typo" />
      </Link>
      <h1 className="text-text-typo text-primary text-links">{props.label}</h1>
    </div>
  );
}
