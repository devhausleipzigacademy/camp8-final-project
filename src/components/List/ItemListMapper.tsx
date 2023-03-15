import { Category } from "@/pages/list/[slug]";
import { sortByAlphabet, sortByCategory } from "./SortBySwitches";
import { Item } from "@prisma/client";

type ItemListMapperProps = {
  itemList: Category;
  sortBy: string;
};

export function ItemListMapper(props: ItemListMapperProps) {
  let sectionName = "";
  let sorted: Item[];

  switch (props.sortBy) {
    case "date":
      sorted = props.itemList;
      break;
    case "category":
      sorted = sortByCategory(props.itemList);
      break;
    case "alphabetical":
      sorted = sortByAlphabet(props.itemList);
      break;
  }
  return (
    <>
      {sorted.map((product) => {
        let nameSection = false;

        if (props.sortBy === "category" && product.category !== sectionName) {
          sectionName = product.category;
          nameSection = true;
        }
        return (
          <div className=" py-1">
            {nameSection && <p>{sectionName + ":"}</p>}
            <p className="px-4 rounded-2xl">{product.item}</p>
          </div>
        );
      })}
    </>
  );
}
