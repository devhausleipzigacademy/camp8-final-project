import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { Items, List, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* The point of this endpoint is to delete an item to a list.
First check the name given against the database.
Since there are multiple ways to spell something we are trying to remove 
a couple of letters at a time and see if there is a match
When shorter than 3 letters we just put it in the Other list
*/
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PATCH") {
    try {
      const { id } = inputQueryTest.parse(request.body);

      const listToBe = await prisma.items.update({
        where: {
          id: id,
        },
        data: {
          ListID: null,
        },
      });
      response.status(201).send("Removed Items");
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send("Something is wrong");
      }
    }
    response.status(404).send(`Invalid method, need PATCH: ${request.method}`);
  }
}

const inputQueryTest = z.object({
  id: z.string(),
});
