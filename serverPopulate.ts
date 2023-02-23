import data from "./data.json";
import newData from "./newData.json";
import axios from "axios";
import * as fs from "fs";
const bigData: Data = data;
const bigNewData: NewData = newData;
let i = 1251;
const bla = setInterval(async function () {
  const realString = bigData.items[i].split(" ").join("-");
  const temp: string = await axios
    .get(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=94121dbecc2042ef8a2e5a3dd1873010&query=${realString}`
    )
    .then((res) => {
      return res.data.results[0].image;
    })
    .catch(() => "unknown");

  bigNewData.Other.push({
    image: "https://spoonacular.com/cdn/ingredients_100x100/" + temp,
    name: bigData.items[i],
  });
  console.log("added item:", bigData.items[i], "link:", temp);
  i++;
  if (i === 1317) {
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
