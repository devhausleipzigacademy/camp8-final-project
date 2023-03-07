import { PlusButton } from "@/components/PlusButton";
import React from "react";
import { useState } from "react";

type PlusButtonList = {};

export function PlusButtonList(props: PlusButtonList) {
  const [addList, setAddList] = useState(false);
  function handleClick() {
    setAddList(true);
  }
}
// return (
// //   <PlusButton onClick={handleClick}></PlusButton>
// //   addList && (
// //   <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
// //     <h1>new list</h1>
// //   </div>
// //   )
// // )
//   }
