import { Item } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PATCH") {
    try {
      const { what, toWhat, who } = inputQueryTest.parse(request.body);
      const test: string = "";
      const item = prisma.item.update({
        where: {
          id: who,
        },
        data: {
          [what]: test,
        },
      });
      //@ts-ignore
      response.status(200).send("Success");
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send("Something is wrong");
      }
    }
    response.status(404).send(`Invalid method, need PATCH: ${request.method}`);
  }
}
const inputQueryTest = z.object({
  who: z.string(),
  what: z.string(),
  toWhat: z.union([z.string(), z.boolean(), z.number()]),
});
