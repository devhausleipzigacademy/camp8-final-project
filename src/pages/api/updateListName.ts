import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/*
 */

const inputQueryType = z.object({
    id: z.string(),
    newName: z.string(),
  });

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    if (request.method === "PATCH") {
        const { id, newName } = inputQueryType.parse(request.body);
        // Getting ID of list we will add product to.  If none there create one
        const newData = await prisma.list.update({
          where: {
            id: id,
          },
          data: {
            listName: newName,
          },
        })
      return newData;
    } else {response.status(405).send("wrong method")}
    response.status(405).send("not ok");
  }