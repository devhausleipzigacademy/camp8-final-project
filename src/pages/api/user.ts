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

  //////
  else if (request.method == "POST") {
    const user = await prisma.user.create({
      data: {
        email: "elsa@prisma.io",
        name: "Elsa Prisma",
      },
    });
    //

    response.status(200).json(user);
    return;
    // } else if (request.method == "DELETE") {
    //   //
    //   const deleteUser = await prisma.user.delete({
    //     where: {
    //       email: "elsa@prisma.io",
    //     },
    //   });
    //   response.status(200).json(deleteUser);
    //   return;
  }

  response.status(404).send(`Invalid method: ${request.method}`);
}
