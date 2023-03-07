import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { PrismaClient } from "@prisma/client";

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
  // I think with this new schema, that this should become a DELETE request.
  if (request.method === "DELETE") {
    try {
      const { id } = inputQueryTest.parse(request.body);

      const listToBe = await prisma.item.delete({
        where: {
          id: id,
        },
      });
      response.status(200).send("Removed Items");
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response
          .status(418)
          .send("Something is wrong, you may or may not be a teapot");
      }
    }
    response.status(404).send(`Invalid method, need PATCH: ${request.method}`);
  }
}

const inputQueryTest = z.object({
  id: z.string(),
});
