import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

const inputQuerySchema = z.object({
  id: z.string(),
  checked: z.boolean(),
  slug: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    // Parse the user ID from the query parameters
    try {
      const { id, checked, slug } = inputQuerySchema.parse(request.body);

      if (checked) {
        const item = await prisma.item.update({
          where: {
            id: id,
          },
          data: {
            inList: {
              connect: {
                id: slug,
              },
            },
          },
        });
        await prisma.list.update({
          where: {
            id: slug,
          },
          data: {
            checked: { increment: item.checked ? 1 : -1 },
          },
        });
      } else {
        const item = await prisma.item.update({
          where: {
            id: id,
          },
          data: {
            inList: {
              disconnect: true,
            },
          },
        });
        await prisma.list.update({
          where: {
            id: slug,
          },
          data: {
            checked: { increment: item.checked ? -1 : 1 },
          },
        });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`someThing wrong with type ${err}`);
      }
      response.status(405).send(`not ok ${err}`);
    }
  }
}
