import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import EditModal, { patchItem } from "./EditModal";
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
  const { mutate: refresh } = useMutation({
    mutationFn: (doing: "check" | "delete") => {
      if (doing === "delete") {
        return onDelete();
      } else return checked();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
    },
  });

  const [details, setDetails] = useState(false);

  const [swiped, setSwiped] = useState(true);

  const onDelete = () => {
    setSwiped(false);
    return axios.delete(`/api/item?id=${props.id}`);
  };
  const checked = () => {
    return axios.patch("/api/item", {
      who: props.id,
      what: "checked",
      toWhat: !props.checked,
    });
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => refresh("check")} Tag="div">
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
      <SwipeAction onClick={() => refresh("delete")} Tag="div">
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
          className="bg-primary-transparent h-16 border border-secondary-default rounded-md flex flex-row"
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
          threshold={0.5}
        >
          <div className="flex justify-center items-center h-full aspect-square bg-text-white p-2">
            <img className="h-full aspect-square" src={props.image} />
          </div>
          <div>
            <p
              className="text-text-typo text-primary pl-4 dark:text-white"
              style={{ fontSize: "clamp(5px, 3.9vw, 1.125rem)" }}
            >
              {props.name}
            </p>
          </div>
          <div className="flex p-2 justify-end gap-6 items-center flex-grow">
            <div
              className=" flex gap-2 underline text-primary-default-Solid"
              onClick={() => {
                setDetails(!details);
                handleClick(props.id);
              }}
            >
              <p
                className="text-secondary dark:text-white font-thin flex flex-shrin"
                style={{
                  fontSize: "clamp(5px, 3.9vw, 1.125rem)",
                }}
              >
                {props.quantity ? props.quantity : "edit"}
              </p>
              {props.unit && (
                <p
                  className="text-secondary font-thin"
                  style={{
                    fontSize: "clamp(5px, 3.9vw, 1.125rem)",
                  }}
                >
                  {props.unit}
                </p>
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
                  className="w-8 h-8 text-primary-default-Solid dark:text-white"
                  onClick={() => refresh("check")}
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
                  className="w-8 h-8 text-primary-default-Solid dark:text-white"
                  onClick={() => refresh("check")}
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
        id={props.id + "modal"}
      >
        <EditModal id={props.id} setDetails={setDetails} />
      </Transition>
    </>
  );
}
export const handleClick = (id: string) => {
  const pageElement = document.getElementById("List-page") as HTMLElement;
  pageElement.children[0].classList.toggle("hidden");
  setTimeout(() => {
    const modal = document.getElementById(id + "modal") as HTMLElement;
    if (modal) {
      modal.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 500);
};
