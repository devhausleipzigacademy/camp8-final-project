import { useState, Fragment, ChangeEvent } from "react";
import { Combobox } from "@headlessui/react";
import { SmallButton } from "./SmallButton";
import axios from "axios";

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

  return (
    <Combobox>
      <div className=" relative mt-1">
        <Combobox.Options className=" ui-absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ">
          {list.map((listItem) => (
            <Combobox.Option key={listItem} value={listItem} className="">
              {listItem}
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
