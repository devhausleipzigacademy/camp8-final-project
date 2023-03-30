import { MasterItem } from "@prisma/client";
import { defineEndpoints } from "../../next-rest-framework/client";
import { z, ZodError } from "zod";
import { prisma } from "../api/prisma";
export const itemPostSchema = z.object({
  query: z.string().regex(/[A-z]/, "No Numbers allowed"),
  inputList: z.string(),
  number: z.optional(z.string()),
  units: z.optional(z.string()),
});
export const itemPostOutput = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.nullable(z.string()),
  category: z.nullable(z.string()),
});

export const itemGetSchema = z.object({
  name: z.string(),
});
export const itemPutOutput = z.array(
  z.object({
    id: z.string(),
    name: z.nullable(z.string()),
    imageUrl: z.nullable(z.string()),
    category: z.nullable(z.string()),
  })
);
export const itemGetOutput = z.object({
  results: itemPutOutput,
  top_rating: z.number(),
});

export const itemPutSchema = z.object({
  inputList: z.string(),
});
export const itemPatchSchema = z.object({
  who: z.string(),
  what: z.string(),
  toWhat: z.union([z.string(), z.boolean(), z.number()]),
});
export const itemDeleteSchema = z.object({
  id: z.string(),
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
        body: { inputList, query, number, units },
      },
    }) => {
      try {
        try {
          const test = await prisma.list.update({
            where: {
              id: inputList,
            },
            data: {
              total: { increment: 1 },
            },
          });
          console.log(test, "FindMe");
        } catch (err) {
          return res.status(400).send(String(err));
        }

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
          const item = await prisma.item.create({
            data: {
              defaultCategory: {
                connect: {
                  name: product.category as string,
                },
              },
              inList: {
                connect: {
                  id: inputList,
                },
              },
              imageUrl: product.imageUrl,
              name: product.name,
            },
          });
          if (units || number) {
            await prisma.item.update({
              where: {
                id: item.id,
              },
              data: {
                unit: units ?? "",
                quantity: Number(number) ?? 0,
              },
            });
          }
          res.setHeader("content-type", "application/json");

          res.status(200).json(String(item.id));
        } catch (err) {
          const other = await prisma.category.findFirst({
            where: {
              name: "other",
            },
          });
          const item = await prisma.item.create({
            data: {
              name: query,
              defaultCategory: {
                connect: {
                  id: other?.id as string,
                },
              },
              inList: {
                connect: {
                  id: inputList,
                },
              },
              imageUrl:
                "https://as1.ftcdn.net/v2/jpg/02/07/83/10/1000_F_207831015_sXKAuf2tcsnrxOS1vfuvHSN2fDrdwtNf.jpg",
            },
          });
          if (units || number) {
            await prisma.item.update({
              where: {
                id: item.id,
              },
              data: {
                unit: units ?? "",
                quantity: Number(number) ?? 0,
              },
            });
          }
          res.setHeader("content-type", "text/plain");

          res.status(201).send(item.id);
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
      description: "Autocomplete function that will give 5 results",
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
  PUT: {
    openApiSpec: {
      description: "Will give back all the items in a list",
    },
    input: {
      contentType: "application/json",
      body: itemPutSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
        schema: itemPutOutput,
      },
      {
        status: 418,
        contentType: "application/json",
        schema: z.string(),
      },
    ],
    handler: async ({
      res,
      req: {
        body: { inputList },
      },
    }) => {
      try {
        const list = await prisma.item.findMany({
          where: {
            listIdentifier: inputList,
          },
        });

        res.status(200).send(list);
      } catch (err) {
        res.status(418).send(JSON.stringify(err));
      }
    },
  },
  PATCH: {
    openApiSpec: {
      description: "Will update any property on an item (not the name)",
    },
    input: {
      contentType: "application/json",
      body: itemPatchSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
        schema: z.string(),
      },
      {
        status: 418,
        contentType: "application/json",
        schema: z.string(),
      },
    ],
    handler: async ({
      res,
      req: {
        body: { toWhat, what, who },
      },
    }) => {
      try {
        if (what === "category") {
          await prisma.item.update({
            where: {
              id: who,
            },
            data: {
              verified: true ? false : false,
              defaultCategory: {
                connect: {
                  name: toWhat as string,
                },
              },
            },
          });
          return res
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
            verified: what === "imageUrl" ? false : true,
          },
        });

        if (what === "checked") {
          await prisma.list.update({
            where: {
              id: item.listIdentifier as string,
            },
            data: {
              checked: {
                increment: toWhat ? 1 : -1,
              },
            },
          });
        }
        res.status(200).send("Changed Correctly");
      } catch (err) {
        res.status(418).send(JSON.stringify(err));
      }
    },
  },
  DELETE: {
    openApiSpec: {
      description: "Will delete Item",
    },
    input: {
      query: itemDeleteSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
        schema: z.string(),
      },
      {
        status: 418,
        contentType: "application/json",
        schema: z.string(),
      },
    ],
    handler: async ({
      res,
      req: {
        query: { id },
      },
    }) => {
      try {
        const test = await prisma.item.findFirst({
          where: {
            id: id,
          },
        });
        await prisma.list.update({
          where: {
            id: test?.listIdentifier as string,
          },
          data: {
            total: { decrement: 1 },
            checked: { decrement: test?.checked ? 1 : 0 },
          },
        });
        await prisma.item.delete({
          where: {
            id: id,
          },
        });
        res.status(200).send("Removed Item");
      } catch (err) {
        res.status(418).send("Something is wrong");
      }
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
