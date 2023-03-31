import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";
import { useSizeStore } from "@/pages/stores/styleStore";

type ArrowButton = {
  icon?: string;
  listName: string;
  classNames?: string;
  linkTo: string;
};

export function ListNameHeader(props: ArrowButton) {
  const { isFontSizeBig } = useSizeStore();
  return (
    <div className={clsx("flex items-center gap-2", props.classNames)}>
      <Link href={`/${props.linkTo}`}>
        <FiChevronLeft className="w-6 h-6 text-text-typo" />
      </Link>
      <h1
        className={clsx(
          isFontSizeBig
            ? "text-text-typo text-links"
            : "text-text-typo text-links"
        )}
      >
        {props.listName}
      </h1>
    </div>
  );
}
