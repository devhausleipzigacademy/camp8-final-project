import { Category } from "@/pages/list/[slug]";
import { Item } from "@prisma/client";
import clsx from "clsx";
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
    <div className={clsx("flex flex-col gap-2", props.className)}>
      {props.list.map((product) => {
        let nameSection = false;

        if (props.sortBy === "category" && product.category !== sectionName) {
          sectionName = product.category;
          if (props.list.map((x) => x.category).includes(sectionName)) {
            nameSection = true;
          }
        }
        return (
          <div key={product.id} id={String(product.id)}>
            {nameSection && (
              <p className="pl-12 pt-2 pb-2 text-primary">
                {capitalizeCategory(sectionName) + ":"}
              </p>
            )}
            <ListItem
              name={capitalizeWord(product.name)}
              image={product.imageUrl}
              checked={product.checked}
              id={product.id}
              quantity={product.quantity}
              unit={product.unit}
            ></ListItem>
          </div>
        );
      })}
    </div>
  );
}
