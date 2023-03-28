import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "src/pages/api/prisma";

/*
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    try {
      const { inputList } = inputQueryTest.parse(request.query);

      const list = await prisma.list.findFirst({
        where: {
          id: inputList,
        },
        include: {
          items: true,
        },
      });

      const items = await prisma.category.findMany({
        where: {
          item: {
            some: {
              listIdentifier: inputList,
            },
          },
        },
        include: {
          item: true,
        },
      });
      const whatever = { list: list, category: items };
      response.status(200).send(whatever);
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
  inputList: z.string(),
});
