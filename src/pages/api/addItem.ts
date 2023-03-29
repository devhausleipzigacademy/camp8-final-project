import { MasterItem } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "src/pages/api/prisma";

/*
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const { query, units, number, inputList } = inputQueryTest.parse(
        request.body
      );
      // Getting ID of list we will add product to.  If none there create one

      let product: MasterItem;
      const list = await prisma.list.findFirst({
        where: {
          id: inputList,
        },
      });
      if (!list) {
        response.status(404).send("List not found");
      }

      try {
        product = (await prisma.masterItem.findFirst({
          where: {
            name: query,
          },
        })) as MasterItem;

        await prisma.category.update({
          where: {
            name: product.category!,
          },
          data: {
            item: {
              create: {
                imageUrl: product.imageUrl,
                listIdentifier: list?.id,
                name: product.name,
                checked: false,
                quantity: Number(number) ? Number(number) : 0,
                unit: units ? units : "",
              },
            },
          },
        });

        response.status(200).send(product);
      } catch (err) {
        console.log(err);
        await prisma.category.update({
          where: {
            name: "other",
          },
          data: {
            item: {
              create: {
                listIdentifier: list?.id,
                name: query,
                quantity: Number(number) ? Number(number) : 0,
                unit: units ? units : "",
                imageUrl:
                  "https://a0.anyrgb.com/pngimg/1652/488/supermarket-lifelike-shopping-mall-realistic-shopping-bags-coffee-shop-shopping-bags-trolleys-shopping-bag-shopping-girl-shopping-cart-thumbnail.png",
              },
            },
          },
        });
        response.status(201).send("New User created in Other");
      }
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send(JSON.stringify(err));
        console.log(err);
      }
    }
    response.status(404).send(`Invalid method, need POST: ${request.method}`);
  }
}

const inputQueryTest = z.object({
  query: z.string().regex(/[A-z]/, "No Numbers allowed"),
  number: z.optional(z.string()),
  units: z.optional(z.string()),
  inputList: z.string(),
});
