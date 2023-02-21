import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { Items, List, Prisma, PrismaClient } from "@prisma/client";

const inputQuerySchema = z.object({
  user: z.string(),
});

const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    // Parse the user ID from the query parameters

    const { user } = inputQuerySchema.parse(request.query);

    // Find all lists that belong to the user
    const lists = await prisma.list.findMany({
      where: {
        userId: user,
      },
    });

    response.status(200).json(lists);
    return;
  }
  response.status(405).send("not ok");
}
