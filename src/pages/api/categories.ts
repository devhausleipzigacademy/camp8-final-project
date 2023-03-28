import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/* The point of this endpoint is to delete a list.
It will receive an id, will find corresponding list and remove it.
*/

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    try {
      const test = await prisma.category.findMany({});
      response.status(200).send(test.map((x) => x.name));
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
