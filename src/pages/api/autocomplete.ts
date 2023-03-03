import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { MasterItem, List, Prisma, PrismaClient } from "@prisma/client";
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

const inputQuerySchema = z.object({
  name: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "GET") {
    const { name } = inputQuerySchema.parse(request.query);

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

    response
      .status(200)
      .json({ ...result, top_rating: sorted_matches[0].rating });
    return;
  }
  response.status(404).send(`Invalid method: ${request.method}`);
}
