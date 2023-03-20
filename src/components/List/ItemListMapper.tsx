import { Category } from "@/pages/list/[slug]";
import { Item } from "@prisma/client";
import { capitalizeCategory } from "../CapitalizeFunctions";
import ListItem from "../ListItem";

type ItemListMapperProps = {
  list: Item[];
  sortBy: string;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ItemListMapper(props: ItemListMapperProps) {
  let sectionName: string | null = "";

  return (
    <>
      {props.list.map((product) => {
        let nameSection = false;

        if (props.sortBy === "category" && product.category !== sectionName) {
          sectionName = capitalizeCategory(product.category);
          nameSection = true;
        }
        return (
          <div key={product.id}>
            {nameSection && <p>{sectionName + ":"}</p>}
            <ListItem
              name={capitalizeFirstLetter(product.name)}
              image={product.imageUrl}
              checked={product.checked}
              onRemove={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></ListItem>
          </div>
        );
      })}
    </>
  );
}
