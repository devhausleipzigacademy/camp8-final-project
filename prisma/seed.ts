import data from "../data.json";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
type Input = {
  image: string;
  name: string;
};

const stockValues: Record<string, string> = {
  "personal-hygiene":
    "https://cdn.pixabay.com/photo/2016/11/26/13/16/shampoo-1860642_1280.png",
  "fruits-and-vegetables":
    "https://cdn.pixabay.com/photo/2018/04/25/15/41/papaya-3349834_1280.jpg",
  meats: "https://cdn.pixabay.com/photo/2016/11/10/16/29/beef-1814638_1280.png",
  baking:
    "https://cdn.pixabay.com/photo/2017/08/19/05/12/bread-2657465_1280.png",
  condiments: "https://spoonacular.com/cdn/ingredients_100x100/ketchup.png",
  dairy: "https://cdn.pixabay.com/photo/2014/09/04/05/27/milk-435295_1280.png",
  frozen:
    "https://png.pngtree.com/png-clipart/20201009/ourmid/pngtree-blue-symmetrical-graphic-snowflake-clipart-element-png-image_2353391.jpg",
  "grains-and-pasta":
    "https://cdn.pixabay.com/photo/2013/11/21/12/24/pasta-214863_1280.jpg",
  household: "https://www.freeiconspng.com/thumbs/broom-png/broom-png-30.png",
  "pet-supplies":
    "https://www.pngall.com/wp-content/uploads/4/Dog-Food-Transparent.png",
  seafood:
    "https://cdn.pixabay.com/photo/2014/04/25/19/52/crab-332103_1280.png",
  snacks:
    "https://cdn.pixabay.com/photo/2016/10/14/13/10/almonds-1740176_1280.png",
  "soups-and-canned-goods":
    "https://png.pngtree.com/png-vector/20200201/ourmid/pngtree-metallic-cans-vector-food-tincan-ribbed-metal-tin-can-canned-food-png-image_2137030.jpg",
  alcohol:
    "https://cdn.pixabay.com/photo/2016/09/14/11/35/beer-1669273_1280.png",
  beverages:
    "https://cdn.pixabay.com/photo/2018/02/15/11/20/water-glass-3155018_1280.png",
  other:
    "https://a0.anyrgb.com/pngimg/1652/488/supermarket-lifelike-shopping-mall-realistic-shopping-bags-coffee-shop-shopping-bags-trolleys-shopping-bag-shopping-girl-shopping-cart-thumbnail.png",
};
const unknown = new RegExp(/.*unknown/);
type Data = Record<string, Array<Input>>;
const prisma = new PrismaClient();
async function main() {
  const bigData: Data = data;
  for (let categoryName in bigData) {
    await prisma.masterItem.createMany({
      data: bigData[categoryName].map((x) => {
        return {
          approved: true,
          imageUrl: !unknown.test(x.image)
            ? x.image
            : stockValues[categoryName],
          name: x.name,
          category: categoryName,
        };
      }),
      skipDuplicates: true,
    });
    await prisma.category.create({
      data: {
        name: categoryName,
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
    "herbal tea",
    "eyeliner",
    "car wash soap",
    "cajeta",
    "quark",
    "sfbaljsdhfljash",
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
