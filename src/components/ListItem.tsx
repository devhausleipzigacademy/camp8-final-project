import Image from "next/image";
import { useState } from "react";
import { BsQuestionSquare, BsCheck2 } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Tick } from "./Tick";

type ListItemProps = {
  name: string;
  image: string;
  quantity?: string;
  checked: boolean;
  onTick: () => void;
};

export default function ListItem(props: ListItemProps) {
  const [checked, setChecked] = useState(false);
  const onCheck = () => {
    setChecked(!checked);
    props.onTick();
  };
  return (
    <>
      <div className="flex flex-row bg-primary-transparent border-2 border-text-typo max-w-[334px] h-16">
        <img
          className="h-full aspect-square"
          src={
            props.image
              ? props.image
              : "http://cdn.onlinewebfonts.com/svg/img_275679.png"
          }
          alt="http://cdn.onlinewebfonts.com/svg/img_275679.png"
        />
        <div className="flex p-2 justify-between items-center flex-grow">
          <p className="text-text-typo text-primary">{props.name}</p>
          <p className="text-secondary font-thin">{props.quantity}</p>
          <div
            onClick={onCheck}
            className="h-10 w-10 bg-text-white border-primary-default-Solid rounded-2xl border-2 flex justify-center items-center"
          >
            {checked && <Tick classes="w-8 h-8 text-primary-default-Solid" />}
          </div>
        </div>
      </div>
    </>
  );
}
