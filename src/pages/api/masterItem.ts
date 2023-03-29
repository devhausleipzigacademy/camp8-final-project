import { Category } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { defineEndpoints } from "../../next-rest-framework/client";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/* The point of this endpoint is to delete a list.
It will receive an id, will find corresponding list and remove it.
*/
export const masterItemPatchSchema = z.object({
  name: z.string(),
  image: z.string(),
  category: z.string(),
});

export default defineEndpoints({
  DELETE: {
    openApiSpec: {
      description: "Will delete a suggested change to masterItems",
    },
    input: {
      query: z.object({
        id: z.string(),
      }),
    },
    output: [
      {
        contentType: "text/plain",
        status: 204,
        schema: z.string(),
      },
    ],
    handler: async ({
      req: {
        query: { id },
      },
      res,
    }) => {
      await prisma.item.delete({
        where: {
          id: id,
        },
      });
      res.status(204).send("Deleted item");
    },
  },
  PATCH: {
    openApiSpec: {
      description: "Will update an item from the MasterItem with new values",
    },
    input: {
      contentType: "application/json",
      body: masterItemPatchSchema,
    },
    output: [
      {
        contentType: "text/plain",
        status: 202,
        schema: z.string(),
      },
    ],
    handler: async ({
      res,
      req: {
        body: { category, image, name },
      },
    }) => {
      await prisma.masterItem.upsert({
        where: {
          name: name,
        },
        create: {
          name: name,
          imageUrl: image,
        },
        update: {
          category: category,
          imageUrl: image,
        },
      });
      res.status(202).send("changed correctly");
    },
  },
});
