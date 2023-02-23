import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// endpoint for general http request testing. Please don't make a comment to delete it.
// It is really useful for checking if the http request reaches the server.

const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "GET") {
    const list = await prisma.items.findMany({});

    response.status(200).json(list);
    return;
  }
  response.status(404).send(`Invalid method: ${request.method}`);
}
