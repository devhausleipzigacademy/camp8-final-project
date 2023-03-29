import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ItemListMapper } from "@/components/List/ItemListMapper";
import { SortBySwitches } from "@/components/List/SortBySwitches";
import {
  sortByDate,
  sortByAlphabet,
  sortByCategory,
} from "@/components/List/SortFunctions";
import { Item } from "@prisma/client";
import { NewItemInput } from "@/components/NewItemInput";
import { useQuery } from "@tanstack/react-query";

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
  list: List;
  category: Category[];
  slug: string;
};

export default function Home({ slug }: InputProps) {
  const [sortBy, setSortBy] = useState("category");

  const {
    data: bigList,
    status,
    isLoading,
  } = useQuery(["data"], () => getListData(slug));
  if (isLoading) {
    return <p>...Loading</p>;
  }

  let data = bigList!;
  let list: Item[] = [];

  switch (sortBy) {
    case "date":
      list = sortByDate(data);
      break;
    case "alphabetical":
      list = sortByAlphabet(data);
      break;
    case "category":
      list = sortByCategory(data);
      break;
  }

  return (
    <div
      id="List-page"
      className="py-6 flex flex-col justify-between h-screen gap-2 relative"
    >
      <div className="-z-10 fixed inset-0 bg-text-typo bg-opacity-40 backdrop-blur-sm"></div>
      <SortBySwitches className="" sortBy={sortBy} setSort={setSortBy} />
      <ItemListMapper list={list} sortBy={sortBy} className="overflow-y-auto" />
      <NewItemInput listID={slug} />
    </div>
  );
}

const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug; // slug = listId

  return {
    props: {
      slug,
    },
  };
};

export { getServerSideProps };

export const getListData = async (slug: string) => {
  return (await axios
    .put(`http://localhost:3000/api/item?inputList=${slug}`)
    .then((res) => res.data)) as Item[];
};
