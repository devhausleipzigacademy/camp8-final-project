import { MasterItem } from "@prisma/client";
import { defineEndpoints } from "next-rest-framework/client";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";
export const addItemInputSchema = z.object({
  query: z.string().regex(/[A-z]/, "No Numbers allowed"),
  inputList: z.string(),
});
export const addItemOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.nullable(z.string()),
  category: z.nullable(z.string()),
  approved: z.boolean(),
});

export default defineEndpoints({
  POST: {
    input: {
      contentType: "application/json",
      body: addItemInputSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
        schema: addItemOutputSchema,
      },
      {
        status: 201,
        contentType: "text/plain",
        schema: z.string(),
      },
      {
        status: 404,
        contentType: "text/plain",
        schema: z.string(),
      },
      {
        status: 400,
        contentType: "text/plain",
        schema: z.string(),
      },
      {
        status: 418,
        contentType: "text/plain",
        schema: z.string(),
      },
    ],
    handler: async ({
      res,
      req: {
        body: { inputList, query },
      },
    }) => {
      try {
        const list = await prisma.list.findFirst({
          where: {
            id: inputList,
          },
        });
        if (!list) {
          res.setHeader("content-type", "text/plain");
          res.status(404).send("List not found");
        }

        try {
          const product = (await prisma.masterItem.findFirst({
            where: {
              name: query,
            },
          })) as MasterItem;
          await prisma.item.create({
            data: {
              listIdentifier: inputList,
              category: product.category,
              imageUrl: product.imageUrl,
            },
          });
          res.setHeader("content-type", "application/json");

          res.status(200).json(product);
        } catch (err) {
          const other = await prisma.category.findFirst({
            where: {
              name: "other",
            },
          });
          await prisma.item.create({
            data: {
              name: query,
              listIdentifier: inputList,
              category: other?.id,
            },
          });
          res.setHeader("content-type", "text/plain");

          res.status(201).send("New User created in Other");
        }
      } catch (err) {
        if (err instanceof ZodError) {
          res.setHeader("content-type", "text/plain");

          res.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
        } else {
          res.setHeader("content-type", "text/plain");
          res.status(418).send(JSON.stringify(err));
        }
      }
    },
  },
});
