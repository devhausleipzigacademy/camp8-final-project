import { Category } from "@/pages/list/[slug]";
import { Item } from "@prisma/client";
import { capitalizeCategory, capitalizeWord } from "../CapitalizeFunctions";
import ListItem from "../ListItem";

type ItemListMapperProps = {
  list: Item[];
  sortBy: string;
  className?: string;
};

export function ItemListMapper(props: ItemListMapperProps) {
  let sectionName: string | null = "";

  return (
    <>
      {props.list.map((product) => {
        let nameSection = false;

        if (props.sortBy === "category" && product.category !== sectionName) {
          sectionName = product.category;
          nameSection = true;
        }
        return (
          <div key={product.id}>
            {nameSection && <p>{capitalizeCategory(sectionName) + ":"}</p>}
            <ListItem
              name={capitalizeWord(product.name)}
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
