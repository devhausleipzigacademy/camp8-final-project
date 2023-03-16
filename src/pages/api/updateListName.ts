import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
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
    if (request.method !== "PATCH") {
      response.status(405).send("wrong method")
    } else {
      try {
        const { id, newName } = inputQueryType.parse(request.body);
        const updatedData = await prisma.list.update({
          where: {
            id: id,
          },
          data: {
            listName: newName,
          },
        })
        return updatedData;
      } catch (err) {
        response.status(400).send(err)
      }
    }
    response.status(405).send("not ok");
  }