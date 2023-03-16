import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/*
The point must receive:
  id
  targetGategoryId
as request-body.
It will then pick then update the  customCategoryId of Item
*/

/* ids are stored in value-tags*/

const bodySchema = z.object({
  id: z.string(),
  customCategoryId: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PATCH") {
    try {
      const { id, customCategoryId } = {
        ...bodySchema.parse(request.body),
      };
      const updated = await prisma.item.update({
        where: { id: customCategoryId },
        data: { customCategoryId: customCategoryId },
      });
      response.status(200).send(`Successfully updated item ${updated.id}, customCategory is now ${updated.customCategoryId}`);
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data sent: ${JSON.stringify(err)}`);
      } else {
        response.status(500).send("Something went wrong, but I don't know what");
      }
    }
  } else {
    response
      .status(404)
      .send(
        `Invalid method in a front-end-script, need a PATCH to update the category, request method was ${request.method}`
      );
  }
}