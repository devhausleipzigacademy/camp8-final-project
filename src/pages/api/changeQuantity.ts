import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// endpoint for general http request testing

const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "GET") {
    const updateUser = await prisma.list.update({
      where: {
        quantity: 
      },
      data: {
        name: "Viola the Magnificent",
      },
    });

    response.status(200).json(list);
    return;
  }
  response.status(404).send(`Invalid method: ${request.method}`);
}
