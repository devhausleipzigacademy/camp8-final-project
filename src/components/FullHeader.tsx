import React from "react";
import { IconButton } from "./IconButton";
import { HeaderTitle } from "./HeaderTitle";

type FullHeader = {
  icon: string;
  name: string;
};

export function FullHeader(props: FullHeader) {
  return (
    <div className="flex items-center gap-24">
<HeaderTitle name={""}></HeaderTitle>
<IconButton icon={""}></IconButton>
    </div>
  );
}