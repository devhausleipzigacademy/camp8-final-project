import { useState } from "react";
import { ItemListMapper } from "@/components/List/ItemListMapper";
import { SortBySwitches } from "@/components/List/SortBySwitches";

export type List = Array<{
  item: string;
  quantity: number;
  category: string;
}>;
export type Categories = Array<{ id: number; name: string; quantity: number }>;

const listItems: List = [
  { item: "tomatoes", quantity: 1, category: "vegetables" },
  { item: "pepper", quantity: 1, category: "spices" },
  { item: "onion", quantity: 1, category: "vegetables" },
  { item: "apple", quantity: 1, category: "fruit" },
  { item: "kiwi", quantity: 1, category: "fruit" },
  { item: "pork", quantity: 1, category: "meat" },
  { item: "toothpaste", quantity: 1, category: "hygiene" },
  { item: "kurkuma", quantity: 1, category: "spices" },
  { item: "pumpkin", quantity: 1, category: "vegetables" },
  { item: "deodorant", quantity: 1, category: "hygiene" },
  { item: "shampoo", quantity: 1, category: "hygiene" },
  { item: "crocodile", quantity: 1, category: "meat" },
  { item: "cinnamon", quantity: 1, category: "spices" },
  { item: "cabbage", quantity: 1, category: "vegetables" },
];

export default function List() {
  const [sortBy, setSortBy] = useState("date");

  return (
    <div className="m-6">
      <SortBySwitches sortBy={sortBy} setSort={setSortBy}></SortBySwitches>
      <ItemListMapper itemList={listItems} sortBy={sortBy}></ItemListMapper>
    </div>
  );
}
