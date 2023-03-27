import { useState, Fragment, ChangeEvent, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { SmallButton } from "./SmallButton";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getListData } from "@/pages/list/[slug]";
import clsx from "clsx";
import { capitalizeCategory, capitalizeWord } from "./CapitalizeFunctions";
import { handleClick } from "./ListItem";

type Item = {
  id: number;
  name: string;
};
type InputProps = {
  listID: string;
};

export function NewItemInput({ listID }: InputProps) {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<string[]>([""]);
  const [inputValue, setInputValue] = useState("");
  const onType = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setQuery(event.target.value);
    console.log(inputValue + "ok1");
    await axios
      .get(`http://localhost:3000/api/autocomplete?name=${query}`)
      .then((res) => {
        setList(
          res.data.results.reverse().map((x: any) => capitalizeCategory(x.name))
        );
      });
  };
  const queryClient = useQueryClient();
  const { mutate: refresh } = useMutation(getListData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
    },
  });
  const onSelect = async (value: string) => {
    try {
      console.log(value);
      // Send a POST request to your backend server to add the selected item to the database
      const response = await axios.post("http://localhost:3000/api/addItem", {
        query: value,
        inputList: listID,
      });
      refresh(listID);

      // Clear the value of the input state
      setInputValue("");

      // If the request was successful, show a success message
      if (response.status === 201 || 202) {
        alert(`Successfully added ${value} to the database!`);
      }
    } catch (error) {
      // If there was an error, show an error message
      alert(`Failed to add ${value} to the database: ${error}`);
    }
  };
  // const newList = list.push(inputValue);
  console.log(list);

  return (
    <Combobox>
      <div className="w-full mt-1">
        <Combobox.Options
          className={clsx(
            "ui-absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base",
            list.length > 1 && "border-2 border-primary-default-Solid"
          )}
        >
          {list.length > 1 &&
            list.map((listItem) => (
              <Combobox.Option
                key={listItem}
                value={listItem}
                onClick={() => onSelect(listItem)}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "hover:bg-secondary-transparent" : " "
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {listItem}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-black" : ""
                        }`}
                      ></span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
        </Combobox.Options>
        <div className="w-full flex cursor-default overflow-hidden rounded-md bg-white text-end">
          <Combobox.Input
            className=" border border-secondary-default rounded-md w-full h-14 p-5 focus:outline-none focus-visible  focus:border-purple-700"
            displayValue={(i: Item) => i.name}
            onChange={onType}
            placeholder={"Add items here"}
          />
          <SmallButton
            onClick={() => Boolean(inputValue) && onSelect(inputValue)}
            label="Enter"
          ></SmallButton>
        </div>
      </div>
    </Combobox>
  );
}
function useQueryClientlient() {
  throw new Error("Function not implemented.");
}
