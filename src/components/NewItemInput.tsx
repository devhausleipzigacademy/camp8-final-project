import { useState, Fragment, ChangeEvent } from "react";
import { Combobox } from "@headlessui/react";
import { SmallButton } from "./SmallButton";
import axios from "axios";
import ListItem from "./ListItem";

type Items = Array<Item>;
type Item = {
  id: number;
  name: string;
};

export function NewItemInput(): JSX.Element {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<string[]>([""]);
  const onType = async (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    await axios
      .get(`http://localhost:3000/api/autocomplete?name=${query}`)
      .then((res) => {
        setList(res.data.results.reverse().map((x: any) => x.name));
      });
  };

  const onSelect = async (value: string) => {
    try {
      // Send a POST request to your backend server to add the selected item to the database
      const response = await axios.post("http://localhost:3000/api/addItem", {
        query: value,
        inputList: "6ce77b98-453c-40bb-b090-e41b92ed18b5",
      });

      // If the request was successful, show a success message
      if (response.status === 201) {
        alert(`Successfully added ${value} to the database!`);
      }
    } catch (error) {
      // If there was an error, show an error message
      alert(`Failed to add ${value} to the database: ${error.message}`);
    }
  };

  return (
    <Combobox>
      <div className=" relative mt-1">
        <Combobox.Options className=" ui-absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ">
          {list.map((listItem) => (
            <Combobox.Option
              key={listItem}
              value={listItem}
              onClick={() => onSelect(listItem)}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "" : " "
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
                        active ? "text-black" : "bg-ux-success"
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
            className=" border border-secondary-default rounded-md w-80 h-14 ml-8 p-5 focus:outline-none focus-visible  focus:border-purple-700"
            displayValue={(i: Item) => i.name}
            onChange={onType}
            placeholder={"Add an Item here"}
          />
          <SmallButton label="Enter"></SmallButton>
        </div>
      </div>
    </Combobox>
  );
}
