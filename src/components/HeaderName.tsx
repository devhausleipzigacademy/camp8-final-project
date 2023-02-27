import React from "react";

type Header = {
  name: "string";
};

export function HeaderTitle(props: Header) {
  return (
    <h1 className="font-heading bg-primary-default-Solid">Hey,{props.name}!</h1>
  );
}
