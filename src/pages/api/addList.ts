import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { Items, List, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const { name, user } = inputQueryTest.parse(request.body);

      const listToBe = await prisma.list.create({
        data: {
          name: name,
          items: { create: [] },
          user: { connect: { id: user } },
        },
      });
      response.status(200).send("Added List");
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
  name: z.string(),
  user: z.string(),
});
