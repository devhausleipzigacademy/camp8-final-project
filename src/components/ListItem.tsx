import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";
import {
  LeadingActions,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import axios from "axios";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getListData } from "@/pages/list/[slug]";
import { useRouter } from "next/router";

type ListItemProps = {
  name: string;
  image: string;
  id: string;
  quantity?: number | null;
  unit?: string | null;
  checked: boolean;
};
export default function ListItem(props: ListItemProps) {
  const router = useRouter();
  const { slug } = router.query;

  const queryClient = useQueryClient();
  const { mutate: refresh } = useMutation(getListData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
    },
  });

  const [details, setDetails] = useState(false);
  useEffect(() => {
    refresh(slug as string);
  }, [details]);

  const [swiped, setSwiped] = useState(true);
  const onDelete = () => {
    setSwiped(false);
    axios.delete(`http://localhost:3000/api/deleteItem?id=${props.id}`);
  };
  const checked = () => {
    axios.patch("http://localhost:3000/api/patchItem", {
      who: props.id,
      what: "checked",
      toWhat: !props.checked,
    });
    refresh(slug as string);
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={checked} Tag="div">
        <div
          id="Tick_Action"
          className="w-full h-full bg-grad-default button-bold text-text-white flex items-center"
        >
          Tick
        </div>
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={onDelete} Tag="div">
        <div
          id="Delete_Action"
          className=" bg-ux-error button-bold text-text-white flex items-center justify-center text-left"
        >
          <p>Delete</p>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <Transition
        show={swiped}
        appear={true}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-y-0"
        enterTo="opacity-100 scale-y-100"
        leave="transform duration-[800ms] transition ease-in-out"
        leaveFrom="opacity-100 scale-y-100 "
        leaveTo="opacity-0 scale-y-0"
        className={clsx(details ? "z-20 relative" : "")}
      >
        <SwipeableListItem
          className="bg-primary-transparent max-w-[354px] h-16 border border-secondary-default rounded-md flex flex-row"
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
          threshold={0.5}
        >
          <div className="flex justify-center items-center h-full bg-text-white p-2">
            <img className="h-full aspect-square" src={props.image} />
          </div>
          <p className="text-text-typo text-primary pl-4">{props.name}</p>
          <div className="flex p-2 justify-end gap-6 items-center flex-grow">
            <div
              className=" flex gap-2"
              onClick={() => {
                setDetails(!details);
                handleClick();
              }}
            >
              <p className="text-secondary font-thin">
                {props.quantity ? props.quantity : "amount"}
              </p>
              {props.unit && (
                <p className="text-secondary font-thin">{props.unit}</p>
              )}
            </div>
            <div className="relative w-10 h-8">
              <Transition
                show={props.checked}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
                className="absolute"
              >
                <FiCheckSquare
                  className="w-8 h-8 text-primary-default-Solid"
                  onClick={checked}
                />
              </Transition>
              <Transition
                show={!props.checked}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
                className="absolute top-0 left-0"
              >
                <FiSquare
                  className="w-8 h-8 text-primary-default-Solid"
                  onClick={checked}
                />
              </Transition>
            </div>
          </div>
        </SwipeableListItem>
      </Transition>
      <Transition
        show={details}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-y-50"
        enterTo="opacity-100 scale-y-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-y-100 "
        leaveTo="opacity-0 scale-y-95 "
        className="relative z-10"
      >
        <EditModal id={props.id} setDetails={setDetails} />
      </Transition>
    </>
  );
}
export const handleClick = () => {
  const pageElement = document.getElementById("List-page") as HTMLElement;
  pageElement.children[0].classList.toggle("z-10");
};
