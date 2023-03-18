import { MasterItem } from "@prisma/client";
import { defineEndpoints } from "next-rest-framework/client";
import { z } from "zod";
import { prisma } from "..";
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

export const autocompleteInputSchema = z.object({
  name: z.string(),
});
export const autocompleteOutputSchema = z.object({
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
  GET: {
    input: {
      query: autocompleteInputSchema,
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
        schema: autocompleteOutputSchema,
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
