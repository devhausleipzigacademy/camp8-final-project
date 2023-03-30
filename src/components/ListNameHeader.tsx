import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

type ArrowButton = {
  icon: string;
  Listname: string;
};

export function ArrowButton(props: ArrowButton) {
  return (
    <div className="flex items-center gap-2">
      <Link href="/card">
        <FiChevronLeft className="w-6 h-6 text-text-typo" />
      </Link>
      <h1 className="text-text-typo text-links">{props.Listname}</h1>
    </div>
  );
}
