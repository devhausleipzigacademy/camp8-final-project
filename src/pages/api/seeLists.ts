import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "./prisma";

const inputQuerySchema = z.object({
  id: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    // Parse the user ID from the query parameters

    const { id } = inputQuerySchema.parse(request.query);

    // Find all lists that belong to the user
    const lists = await prisma.list.findMany({
      where: {
        listIdentifier: id,
      },
    });

    response.status(200).json(lists);
    return;
  }
  response.status(405).send("not ok");
}
