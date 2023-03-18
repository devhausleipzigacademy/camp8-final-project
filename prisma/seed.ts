import data from "../data.json";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
type Input = {
  image: string;
  name: string;
};
type Data = Record<string, Array<Input>>;
const prisma = new PrismaClient();
async function main() {
  const bigData: Data = data;
  for (let categoryName in bigData) {
    await prisma.masterItem.createMany({
      data: bigData[categoryName].map((x) => {
        return {
          approved: true,
          imageUrl: x.image,
          name: x.name,
          category: categoryName,
        };
      }),
      skipDuplicates: true,
    });
    await prisma.category.create({
      data: {
        name: categoryName,
        masterItem: {
          createMany: {
            data: bigData[categoryName].map((x) => {
              return {
                name: x.name,
                imageUrl: x.image,
                approved: true,
              };
            }),
            skipDuplicates: true,
          },
        },
      },
    });
  }

  const John = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@email.com",
      lists: {
        create: {
          listName: "John Doe's List",
        },
      },
    },
    include: {
      lists: true,
    },
  });
  const exampleItems = [
    "apples",
    "pears",
    "bananas",
    "oranges",
    "grapes",
    "strawberries",
    "blueberries",
    "beef",
    "sausage",
    "frankfurt",
    "pork",
    "yeast",
    "cornstarch",
    "sugar",
    "risotto",
    "semolina",
    "cinnamon",
    "shampoo",
    "burrata",
    "cajeta",
    "quark",
  ];
  for (let i of exampleItems) {
    await axios.post("http://localhost:3000/api/addItem", {
      query: i,
      inputList: John.lists[0].id,
    });
  }
  console.log(
    "For bubble chart go to page:\n",
    `http://localhost:3000/list/${John.lists[0].id}/bubble`
  );
}
main();
