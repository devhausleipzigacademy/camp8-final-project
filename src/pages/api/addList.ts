import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { Items, List, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const { id, name, items, user } = inputQueryTest.parse(request.body);

    const listToBe = await prisma.list.create({
      data: {
        name: name,
        items: { create: items },
        user: { connect: { id: user } },
      },
    });

    response.status(200).json({ message: "List added successfully" });
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}

const inputQueryTest = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(
    z.object({
      // id: z.string(),
      name: z.string(),
      ListID: z.string().optional(),
      CategoryID: z.string().optional(),
    })
  ),
  user: z.string(),
});
