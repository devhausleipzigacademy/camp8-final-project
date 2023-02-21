import data from "./data.json";
import newData from "./newData.json";
import axios from "axios";
import * as fs from "fs";
const bigData: Data = data;
const bigNewData: NewData = newData;
type NewData = Record<string, Array<Temp>>;
type Temp = {
  name: string;
  image: string;
};
type Data = Record<string, Array<string>>;
let i = 0;
async function run() {
  for (const type in bigData) {
    bigData[type].map(async (vegetable) => {
      const temp: string = await getLinks(vegetable);
      if (i < 10) {
        setTimeout(() => {
          if (!bigNewData[type] && i < 10) {
            bigNewData[type] = [];
          }
          if (i < 10) {
            bigNewData[type].push({ name: vegetable, image: String(temp) });
            console.log(i, "Added");
            i++;
          }
        }, 100);
      }
    });
  }
}
run();
const holder = JSON.stringify(bigNewData);
fs.writeFileSync("./newData.json", holder);

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
