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
import { NewItemInput } from "@/components/NewItemInput";
import { useQuery } from "@tanstack/react-query";
import { prisma } from "@/pages/api/prisma";
import { FullHeader } from "@/components/FullHeader";
import { ListNameHeader } from "@/components/ListNameHeader";
import { Item } from "@prisma/client";

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
  name: string;
};

export default function Home({ slug, name }: InputProps) {
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
      list = sortByDate(data.list.items);
      break;
    case "alphabetical":
      list = sortByAlphabet(data.list.items);
      break;
    case "category":
      list = sortByCategory(data.list.items);
      break;
  }

  return (
    <div
      id="List-page"
      className="p-6 flex flex-col justify-between h-screen gap-2 relative"
    >
      <ListNameHeader Listname={name} />
      <div className="-z-10 fixed inset-0 bg-text-typo bg-opacity-40 backdrop-blur-sm"></div>
      <SortBySwitches className="" sortBy={sortBy} setSort={setSortBy} />
      <ItemListMapper list={list} sortBy={sortBy} className="overflow-y-auto" />
      <NewItemInput listID={slug} />
    </div>
  );
}

const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug; // slug = listId
  const list = await prisma.list.findFirst({
    where: {
      id: slug as string,
    },
  });
  const name = list?.listName;

  return {
    props: {
      slug,
      name,
    },
  };
};

export { getServerSideProps };

export const getListData = async (slug: string) => {
  return (await axios
    .get(`http://localhost:3000/api/listItems?inputList=${slug}`)
    .then((res) => res.data)) as InputProps;
};
