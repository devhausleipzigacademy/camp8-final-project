import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/* The point of this endpoint is to delete a list.
It will receive an id, will find corresponding list and remove it.
*/

const inputQueryDelete = z.object({
  id: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "DELETE") {
    try {
      const { id } = inputQueryDelete.parse(request.query);
      await prisma.list.delete({
        where: {
          id: id,
        },
      });
      response.status(200).json({message: `Removed List with following id:${id}`});
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send("Something is wrong");
      }
    }
  } else {
    response.status(405).send(`Invalid method, need PATCH: ${request.method}`);
  }
}
