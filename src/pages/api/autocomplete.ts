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

    const matches = stringSimilarity.findBestMatch(name, item_names);

    const sorted_matches = sortByRating(matches.ratings);
    const result = [];

    for (let entry of sorted_matches) {
      if (entry.rating > 0) {
        result.push(entry.target);
      }
    }

    response.status(200).json(result.slice(0, 5));
    return;
  }
  response.status(404).send(`Invalid method: ${request.method}`);
}
