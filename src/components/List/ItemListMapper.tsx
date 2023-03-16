import { Category, InputProps, List } from "@/pages/list/[slug]";
import { Item } from "@prisma/client";
import { sortByCategory, sortByAlphabet, sortByDate } from "./SortFunctions";

type ItemListMapperProps = {
  list: InputProps;
  sortBy: string;
};

export function ItemListMapper(props: ItemListMapperProps) {
  let sortedByItems: Item[] = [];
  let sortedByCategories: Category[] = [];

  switch (props.sortBy) {
    case "date":
      sortedByItems = sortByDate(props.list.list.items);
      break;
    case "alphabetical":
      sortedByItems = sortByAlphabet(props.list.list.items);
      break;
    case "category":
      sortedByCategories = sortByCategory(props.list.category);
      break;
  }

  if (props.sortBy === "category") {
    return (
      <>
        {sortedByCategories.map((product) => {
          <div className="py-1">
            <h3>{product.name}</h3>
          </div>;
        })}
      </>
    );
  } else {
    return (
      <>
        {sortedByItems.map((item) => {
          return (
            <div className=" py-1">
              <p className="px-4 rounded-2xl">{item.name}</p>
            </div>
          );
        })}
      </>
    );
  }
}
