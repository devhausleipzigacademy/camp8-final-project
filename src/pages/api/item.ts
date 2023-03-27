import { MasterItem } from "@prisma/client";
import { defineEndpoints } from "next-rest-framework/client";
import { z, ZodError } from "zod";
import { prisma } from "../api/prisma";
export const itemPostSchema = z.object({
  query: z.string().regex(/[A-z]/, "No Numbers allowed"),
  inputList: z.string(),
});
export const itemPostOutput = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.nullable(z.string()),
  category: z.nullable(z.string()),
  approved: z.boolean(),
});

export const itemGetSchema = z.object({
  name: z.string(),
});
export const itemGetOutput = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      imageUrl: z.nullable(z.string()),
      category: z.nullable(z.string()),
      approved: z.boolean(),
    })
  ),
  top_rating: z.number(),
});

export default defineEndpoints({
  POST: {
    openApiSpec: {
      description:
        "Will check if input is in MasterItem, if so, will add it along with photo and category.  If not, will add to list other",
    },
    input: {
      contentType: "application/json",
      body: itemPostSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
        schema: itemPostOutput,
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
  GET: {
    openApiSpec: {
      description:
        "Endpoint looks for words in the MasterItem table and returns the top 5 results.  Also returns a number of how much the first result matches.",
    },
    input: {
      query: itemGetSchema,
    },
    output: [
      {
        status: 404,
        contentType: "text/plain",
        schema: z.string(),
      },
      {
        status: 200,
        contentType: "application/json",
        schema: itemGetOutput,
      },
    ],
    handler: async ({
      res,
      req: {
        query: { name },
      },
    }) => {
      const list = await prisma.masterItem.findMany({});

      const item_names = list.map((item) => item.name);

      const matches = stringSimilarity.findBestMatch(
        name.toLowerCase(),
        item_names
      );

      const sorted_matches = sortByRating(matches.ratings);
      const result: MasterItem[] = await prisma.masterItem.findMany({
        where: {
          name: {
            in: sorted_matches
              .filter((x, i) => x.rating > 0 && i < 5)
              .map((x) => x.target),
          },
        },
      });
      result.sort(
        (a, b) =>
          sorted_matches.map((x) => x.target).indexOf(a.name) -
          sorted_matches.map((x) => x.target).indexOf(b.name)
      );
      res.setHeader("content-type", "application/json");

      res.status(200).send({
        results: result,
        top_rating: sorted_matches[0].rating,
      });
    },
  },
});

var stringSimilarity = require("string-similarity");

export function sortByRating(input: Array<{ target: string; rating: number }>) {
  const sorted = [...input];

  sorted.sort((a, b) => {
    if (a.rating < b.rating) {
      return 0;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  });
  return sorted;
}
