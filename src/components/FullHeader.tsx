import React from "react";
import { IconButton } from "./IconButton";
import clsx from "clsx";

type FullHeader = {
  classes: string;
  name: string;
};

export function FullHeader(props: FullHeader) {
  return (
    <div className="flex items-center gap-24">
      <h1
        className={clsx("text-title text-primary-default-Solid", props.classes)}
      >
        Hey, beautiful {props.name}!
      </h1>
      <IconButton classes="w-12 h-12"></IconButton>
    </div>
  );
}
