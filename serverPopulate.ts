import data from "./data.json";
import newData from "./newData.json";
import axios from "axios";
import * as fs from "fs";
const bigData: Data = data;
const bigNewData: NewData = newData;

let i = 0;
async function run() {
  for (let i = 0; i < bigData.items.length && i < 100; i++) {
    setInterval(async () => {
      const realString = bigData.items[i].split(" ").join("_");
      const temp: string = await axios
        .get(
          `https://api.spoonacular.com/food/ingredients/search?apiKey=ed4bdbe79fc24ac7ac5c21d18b7e185e&query=${realString}`
        )
        .then((res) => {
          return res.data.results[0].image;
        })
        .catch(() => "unknown");

      bigNewData.Other.push({ image: temp, name: bigData.items[i] });
    }, 100);
  }
  const holder = JSON.stringify(bigNewData);
  fs.writeFileSync("./newData.json", holder);
}
run();

async function test(inputs: string[], categories: string) {}

async function getLinks(vegetable: string) {
  console.log("Hello World");
  return "Hello";
  return await axios
    .get(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=94121dbecc2042ef8a2e5a3dd1873010&query=${vegetable}`
    )
    .then((res) => {
      console.log(res.data.results[0].image);
      return res.data.results[0].image;
    })
    .catch(() => "unknown");
}
type NewData = {
  Other: Temp[];
};
type Temp = {
  name: string;
  image: string;
};
type Data = Record<string, Array<string>>;
