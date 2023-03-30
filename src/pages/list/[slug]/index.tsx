import { ItemListMapper } from "@/components/List/ItemListMapper";
import { SortBySwitches } from "@/components/List/SortBySwitches";
import {
  sortByAlphabet,
  sortByCategory,
  sortByDate,
} from "@/components/List/SortFunctions";
import { ListNameHeader } from "@/components/ListNameHeader";
import { NewItemInput } from "@/components/NewItemInput";
import { prisma } from "@/pages/api/prisma";
import { Item } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";

export type Category = {
  id: string;
  name: string;
  item: Item[];
};

export type InputProps = {
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
      list = sortByDate(data);
      break;
    case "alphabetical":
      list = sortByAlphabet(data);
      break;
    case "category":
      list = sortByCategory(data);
      break;
  }
  //This is a comment

  return (
    <div
      id="List-page"
      className="py-6 flex flex-col justify-between items-center h-screen gap-2 relative"
    >
      <div className="-z-10 fixed inset-0 bg-text-typo bg-opacity-40 backdrop-blur-sm"></div>
      <ListNameHeader Listname={name} classNames="" linkTo="home" />
      <SortBySwitches
        className=""
        sortBy={sortBy}
        setSort={setSortBy}
        slug={slug}
      />
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
    .put(`http://localhost:3000/api/item`, {
      inputList: slug,
    })
    .then((res) => res.data)) as Item[];
};
