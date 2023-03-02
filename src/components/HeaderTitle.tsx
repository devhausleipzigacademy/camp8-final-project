import React from "react";

type HeadTitle = {
  name: string;
};

export function HeaderTitle(props: HeadTitle) {
  return (
    <h1 className="text-title text-primary-default-Solid ">
      Hey, beautiful {props.name}!
    </h1>
  );
}
