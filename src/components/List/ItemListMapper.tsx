import { Item } from "@prisma/client";

type ItemListMapperProps = {
  list: Item[];
  sortBy: string;
};

export function ItemListMapper(props: ItemListMapperProps) {
  if (props.sortBy === "category") {
    return (
      <>
        {props.list.map((product) => {
          <div className="py-1">
            <h3>{product.name}</h3>
          </div>;
        })}
      </>
    );
  } else {
    return (
      <>
        {props.list.map((item) => {
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
