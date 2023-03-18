import { defineEndpoints } from "next-rest-framework/client";
import { z } from "zod";
import { prisma } from "./prisma";

export const seeListsInputSchema = z.object({
  id: z.string(),
});
export const seeListsOutputSchema = z.array(
  z.object({
    id: z.string(),
    listName: z.nullable(z.string()),
    createdAt: z.date(),
    userIdentifier: z.string(),
    favorite: z.nullable(z.boolean()),
  })
);
export default defineEndpoints({
  GET: {
    input: {
      query: seeListsInputSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
        schema: seeListsOutputSchema,
      },
      {
        status: 404,
        contentType: "text/plain",
        schema: z.string(),
      },
    ],
    handler: async ({
      req: {
        query: { id },
      },
      res,
    }) => {
      const lists = await prisma.list.findMany({
        where: {
          userIdentifier: id,
        },
      });
      if (!lists) {
        res.setHeader("content-type", "text/plain");
        res.status(404).send("No list with that ID found");
      }
      res.setHeader("content-type", "application/json");
      res.status(200).json(lists);
    },
  },
});
