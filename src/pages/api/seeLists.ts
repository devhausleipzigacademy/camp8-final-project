import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { Items, List, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    const { user } = inputQueryTest.parse(request.query);

    const lists = await prisma.list.findMany({
      // where: { user: user },
    });

    response.status(200).json(lists);
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}

const inputQueryTest = z.object({
  user: z.string(),
});
