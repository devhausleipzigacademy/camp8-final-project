import React from "react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

type IconButton = {
  icon: string;
};

export function IconButton(props: IconButton) {
  return (
    <Link href="/account">
      <CgProfile className="w-32 h-32 text-primary-default-Solid" />
    </Link>
  );
}
