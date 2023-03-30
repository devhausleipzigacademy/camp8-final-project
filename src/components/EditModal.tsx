import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { prisma } from "@/pages/api/prisma";
import { Category } from "@prisma/client";
import axios from "axios";
import { capitalize } from "./CapitalizeFunctions";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { handleClick } from "./ListItem";

type InputProps = {
  id: string;
  setDetails: Dispatch<SetStateAction<boolean>>;
};
export const units = ["ml", "l", "g", "kg", "cups"];

export default function EditModal({ id, setDetails }: InputProps) {
  let [quantityInput, setQuantityInput] = useState<string[]>(["Placeholder"]);
  const { data } = useQuery(["categories"], () =>
    getCategories(setQuantityInput)
  );

  let categories = [
    {
      name: "Quantity",
      values: ["1", "2", "3", "4", "5", "6"],
    },
    { name: "ImageUrl", values: [] },
    {
      name: "Category",
      values:
        //infinite categories can be created (somehow)
        quantityInput,
    },
    {
      name: "Unit",
      values: units,
    },
  ];

  return (
    <div className="absolute w-full h-full gap-0 flex flex-col font-sans outline-primary-default-background px-3">
      <Tab.Group>
        <Tab.List className="flex rounded-xl bg-text-white px-3 py-3">
          {categories.map((category) => (
            <Tab
              key={category.name}
              className={({ selected }) =>
                clsx(
                  "w-full rounded-2xl py-2 font-medium leading-5 focus:outline-none",
                  selected
                    ? "bg-primary-default-Solid text-text-white"
                    : "bg-text-white text-text-typo"
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 w-full h-8">
          {categories.map((category, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl w-full bg-white py-0 outline-1 outline-primary-default-Solid font-sans text-text-typo ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <ul className="rounded-xl outline outline-offset-2 bg-text-white outline-primary-default-Solid overflow-y-auto max-h-44">
                {category.name !== "Category" && (
                  <li>
                    <input
                      type={category.name === "Quantity" ? "number" : "text"}
                      className=" text-sm font-medium leading-5 w-full h-10 rounded-md bg-secondary-transparent p-3"
                      placeholder="Placeholder"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          clickOnSelect(
                            category.name,
                            //@ts-ignore
                            e.target.value,
                            id,
                            setDetails
                          );
                        }
                      }}
                    />
                  </li>
                )}
                {category.values.map((option) => (
                  <li
                    key={option}
                    className=" rounded-md p-3 hover:bg-secondary-transparent"
                  >
                    <h3
                      className="text-sm font-medium leading-5"
                      onClick={() =>
                        clickOnSelect(category.name, option, id, setDetails)
                      }
                    >
                      {option}
                    </h3>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

const clickOnSelect = (
  what: string,
  toWhat: string,
  id: string,
  setDetails: Dispatch<SetStateAction<boolean>>
) => {
  console.log(id, what, toWhat);
  handleClick();
  setDetails(false);
  patchItem(id, what, toWhat.toLowerCase());
};

const patchItem = async (item: string, what: string, toWhat: string) => {
  const object = {
    who: item,
    what: what.charAt(0).toLowerCase() + what.slice(1),
    toWhat:
      what === "Unit"
        ? (toWhat as string).split(" ")[0]
        : what === "Quantity"
        ? Number(toWhat)
        : toWhat,
  };
  axios.patch("http://localhost:3000/api/item", object);
};

const getCategories = async (
  setQuantityInput: Dispatch<SetStateAction<string[]>>
) => {
  return await axios.get("http://localhost:3000/api/categories").then((res) => {
    let test: string[] = res.data.map((x: any) => x.name);
    setQuantityInput(test);
  });
};
