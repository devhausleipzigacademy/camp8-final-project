import React from "react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import clsx from "clsx";

type IconButton = {
  classes: string;
};

export function IconButton(props: IconButton) {
  return (
    <Link href="/account">
      <CgProfile
        className={clsx(" text-primary-default-Solid", props.classes)}
      />
    </Link>
  );
}
