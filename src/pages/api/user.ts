import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "GET") {
    const user = await prisma.user.findMany({});

    response.status(200).json(user);
    return;
  }
  response.status(404).send(`Invalid method: ${request.method}`);
}
