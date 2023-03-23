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
  let sectionName: string = "";

  return (
    <div className="flex flex-col gap-2">
      {props.list.map((product) => {
        let nameSection = false;

        if (props.sortBy === "category" && product.category !== sectionName) {
          sectionName = product.category;
          nameSection = true;
        }
        return (
          <div key={product.id}>
            {nameSection && (
              <p className="pl-12 pt-5 pb-2 text-primary">
                {capitalizeCategory(sectionName) + ":"}
              </p>
            )}
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
    </div>
  );
}
