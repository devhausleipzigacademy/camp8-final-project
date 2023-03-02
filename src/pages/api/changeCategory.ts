import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
The point must receive:
  item_id
  target_category_name
It will then pick the right category by name and give back the category id
It will update the Item
*/

/* ids are stored in value-tags*/

const bodySchema = z.object({
  item_id: z.string(),
  category_id: z.string(),
});
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PATCH") {
    try {
      const { item_id, category_id } = {
        ...bodySchema.parse(request.body),
      };
      const updated = await prisma.item.update({
        where: { id: item_id },
        data: { customCategoryId: category_id },
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