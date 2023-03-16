import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

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
  if (request.method === "DELETE") {
    try {
      const { id } = inputQueryTest.parse(request.body);

      await prisma.list.delete({
        where: {
          id: id,
        },
      });
      response.status(200).send("Removed List");
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
