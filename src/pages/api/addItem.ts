import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { MasterItem, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const { query, inputList } = inputQueryTest.parse(request.body);
      // Getting ID of list we will add product to.  If none there create one

      let product: MasterItem;
      try {
        await prisma.list.findFirst({
          where: {
            id: inputList,
          },
        });
      } catch (err) {
        response.status(404).send("List not found");
      }

      try {
        product = (await prisma.masterItem.findFirst({
          where: {
            name: query,
          },
        })) as MasterItem;

        await prisma.item.create({
          data: {
            masterItemId: product.id,
            listIdentifier: inputList,
          },
        });

        response.status(200).send(product);
      } catch (err) {
        const other = await prisma.category.findFirst({
          where: {
            category: "other",
          },
        });
        await prisma.item.create({
          data: {
            customItemName: query,
            listIdentifier: inputList,
            customCategoryId: other?.id,
          },
        });
        response.status(201).send("New User created in Other");
      }
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send(JSON.stringify(err));
      }
    }
    response.status(404).send(`Invalid method, need POST: ${request.method}`);
  }
}

const inputQueryTest = z.object({
  query: z.string().regex(/[A-z]/, "No Numbers allowed"),
  inputList: z.string(),
});
