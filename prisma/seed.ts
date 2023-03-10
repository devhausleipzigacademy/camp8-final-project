import data from "../data.json";
import { PrismaClient } from "@prisma/client";
type Input = {
  image: string;
  name: string;
};
type Data = Record<string, Array<Input>>;
const prisma = new PrismaClient();
async function main() {
  const bigData: Data = data;
  for (let categoryName in bigData) {
    await prisma.category.create({
      data: {
        category: categoryName,
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
}
main();
