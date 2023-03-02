import { List } from "@/pages/list";
import { sortByAlphabet, sortByCategory } from "./SortBySwitches";

type ItemListMapperProps = {
  itemList: List;
  sortBy: string;
};

export function ItemListMapper(props: ItemListMapperProps) {
  let sectionName = "";
  let sorted: List = [];

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

        if (props.sortBy === "category") {
          if (product.category !== sectionName) {
            sectionName = product.category;
            nameSection = true;
          }
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
