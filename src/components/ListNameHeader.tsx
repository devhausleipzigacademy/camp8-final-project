import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";

type ArrowButton = {
  icon?: string;
  Listname: string;
  classNames?: string;
  linkTo: string;
};

export function ListNameHeader(props: ArrowButton) {
  return (
    <div className={clsx("flex items-center gap-2", props.classNames)}>
      <Link href={`/${props.linkTo}`}>
        <FiChevronLeft className="w-6 h-6 text-text-typo" />
      </Link>
      <h1 className="text-text-typo text-links">{props.Listname}</h1>
    </div>
  );
}
