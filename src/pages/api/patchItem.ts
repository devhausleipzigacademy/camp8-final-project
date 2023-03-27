import { MasterItem } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "src/pages/api/prisma";

/*
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PATCH") {
    try {
      let { toWhat, what, who } = inputQueryTest.parse(request.body);

      if (what === "category") {
        await prisma.item.update({
          where: {
            id: who,
          },
          data: {
            defaultCategory: {
              connect: {
                id: toWhat as string,
              },
            },
          },
        });
        response
          .status(200)
          .send(
            `Successfully updated item ${who}, customCategory is now ${toWhat}`
          );
      }

      const item = await prisma.item.update({
        where: {
          id: who,
        },
        data: {
          [what]: toWhat,
        },
      });
      response.status(200).send(item);
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send(JSON.stringify(err));
      }
    }
    response.status(404).send(`Invalid method, need POST: ${request.method}`);
  }
}

const inputQueryTest = z.object({
  who: z.string(),
  what: z.string(),
  toWhat: z.union([z.string(), z.boolean(), z.number()]),
});
