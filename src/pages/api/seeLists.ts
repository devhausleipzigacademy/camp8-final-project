import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { Items, List, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    const { name, user } = inputQueryTest.parse(request.body);

    const listToBe = await prisma.list.findFirst({
      data: {
        name: "test",
      },
    });

    response.status(200).json({ message: "List added successfully" });
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}

const inputQueryTest = z.object({
  name: z.string(),
  user: z.string(),
});
