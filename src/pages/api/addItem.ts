import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { Items, PrismaClient } from "@prisma/client";

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
      let products: Items[] = [];
      // Getting ID of list we will add product to.  If none there create one
      const listToBe = await prisma.list.upsert({
        create: {
          name: inputList,
        },
        update: {},
        where: {
          id: inputList,
        },
      });

      let dummy = query.slice();
      // Check spelling thrice removing a letter each time.  3 letter minimum
      for (let i = 0; i < 3 || dummy.length > 3; i++) {
        products = await prisma.items.findMany({
          where: {
            name: {
              contains: dummy,
            },
          },
        });
        if (products[0]) {
          // If at lease one match is found
          break;
        }
        // Remove letter and start again
        dummy = dummy.slice(0, -1);
      }
      if (!products[0]) {
        // If after three loops no match found.  Add to other
        const other = await prisma.categories.findFirst({
          where: {
            name: "other",
          },
        });

        await prisma.categories.update({
          where: {
            id: other?.id as string,
          },
          data: {
            Items: {
              create: {
                name: query,
                ListID: listToBe.id,
              },
            },
          },
        });
        response.status(201).send("New User created in Other");
      }
      // If products found, sort them by length
      products.sort((a, b) => a.name.length - b.name.length);

      // Check that Item hasn't already been added to a List
      if (products[0].ListID) {
        response.status(405).send("Item already added to List");
      }

      await prisma.list.update({
        where: {
          id: inputList,
        },
        data: {
          items: {
            connect: {
              id: products[0].id,
            },
          },
        },
      });

      response.status(200).send(products[0]);
      return;
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send("Something went wrong");
      }
    }
    response.status(404).send(`Invalid method, need POST: ${request.method}`);
  }
}

const inputQueryTest = z.object({
  query: z.string().regex(/[A-z]/, "No Numbers allowed"),
  inputList: z.string(),
});