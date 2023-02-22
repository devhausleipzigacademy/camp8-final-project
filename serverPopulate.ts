import data from "./data.json";
import newData from "./newData.json";
import axios from "axios";
import * as fs from "fs";
const bigData: Data = data;
const bigNewData: NewData = newData;
let i = 100;
const bla = setInterval(async function () {
  const realString = bigData.items[i].split(" ").join("_");
  const temp: string = await axios
    .get(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=5531584e9a644c37a7d70e8f59bc8ed6&query=${realString}`
    )
    .then((res) => {
      return res.data.results[0].image;
    })
    .catch(() => "unknown");

  bigNewData.Other.push({
    image: "https://spoonacular.com/cdn/ingredients_100x100/" + temp,
    name: bigData.items[i],
  });
  console.log("added item:", bigData.items[i]);
  i++;
  if (i === 200) {
    const holder = JSON.stringify(bigNewData);
    fs.writeFileSync("./newData.json", holder);
    clearInterval(bla);
  }
}, 1000);

type NewData = {
  Other: Temp[];
};
type Temp = {
  name: string;
  image: string;
};
type Data = Record<string, Array<string>>;
