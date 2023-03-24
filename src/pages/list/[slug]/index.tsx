import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ItemListMapper } from "@/components/List/ItemListMapper";
import { SortBySwitches } from "@/components/List/SortBySwitches";
import {
  sortByDate,
  sortByAlphabet,
  sortByCategory,
} from "@/components/List/SortFunctions";
import { Item } from "@prisma/client";
import { SearchBar } from "@/components/SearchBar";
import { NewItemInput } from "@/components/NewItemInput";

export type Category = {
  id: string;
  name: string;
  item: Item[];
};

export type List = {
  id: string;
  listName: string | null;
  createdAt: Date;
  userIdentifier: string;
  favorite: boolean | null;
  items: Item[];
};

export type InputProps = {
  getData: {
    list: List;
    category: Category[];
  };
};

export default function Home({ getData }: InputProps) {
  const [sortBy, setSortBy] = useState("date");

  let data = { ...getData };
  let list: Item[] = [];

  switch (sortBy) {
    case "date":
      list = sortByDate(data.list.items);
      break;
    case "alphabetical":
      list = sortByAlphabet(data.list.items);
      break;
    case "category":
      list = sortByCategory(data.list.items);
      break;
  }

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  // setInterval(() => {
  //   refreshData();
  // }, 2000);

  return (
    <div className="p-6 flex flex-col justify-center gap-2 h-screen relative">
      <SortBySwitches className="" sortBy={sortBy} setSort={setSortBy} />
      <ItemListMapper list={list} sortBy={sortBy} className="overflow-y-auto" />
      <input
        type="text"
        className="absolute bottom-0 left-0 p-2 rounded-t-md bg-grad-default text-text-white w-full"
        placeholder="This is where input will go"
      />
      <NewItemInput />
    </div>
  );
}

const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug; // slug = listId
  const getData: InputProps = await axios
    .get(`http://localhost:3000/api/listItems?inputList=${slug}`)
    .then((res) => res.data);

  return {
    props: {
      getData,
    },
  };
};

export { getServerSideProps };
