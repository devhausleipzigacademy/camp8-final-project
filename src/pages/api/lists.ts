import { List } from "@prisma/client";
import { z, ZodError } from "zod";
import { defineEndpoints } from "../../next-rest-framework/client";
import { prisma } from "../api/prisma";

const listInputSchema = z.object({
  id: z.string(),
});
export const listsGetSchema = z.array(
  z.object({
    id: z.string(),
    listName: z.nullable(z.string()),
    createdAt: z.date(),
    userIdentifier: z.string(),
    favorite: z.nullable(z.boolean()),
  })
);
const listsPostOutput = z.object({
  id: z.string(),
  listName: z.nullable(z.string()),
  createdAt: z.date(),
  userIdentifier: z.string(),
  favorite: z.boolean(),
});

export const listsPatchSchema = z.object({
  what: z.string(),
  toWhat: z.string(),
  id: z.string(),
});

export default defineEndpoints({
  POST: {
    input: {
      query: listInputSchema,
    },
    output: [
      {
        status: 201,
        contentType: "application/json",
        schema: listsPostOutput,
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
        query: { id },
      },
    }) => {
      const John = await prisma.list.create({
        data: {
          userIdentifier: id,
        },
      });
      return res.status(201).send(John);
    },
  },
  DELETE: {
    openApiSpec: {
      description: "Deletes a list",
    },
    input: {
      query: listInputSchema,
    },
    output: [
      {
        status: 200,
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
      req: {
        query: { id },
      },
      res,
    }) => {
      try {
        await prisma.list.delete({
          where: {
            id: id,
          },
        });
        res.status(200).send("Removed List");
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
        } else {
          res.status(418).send("Something is wrong");
        }
      }
    },
  },
  GET: {
    openApiSpec: {
      description: "Shows all the lists associated with a specific user",
    },
    input: {
      query: listInputSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
        schema: listsGetSchema,
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
  PATCH: {
    openApiSpec: {
      description: "Will update a list",
    },
    input: {
      contentType: "application/json",
      body: listsPatchSchema,
    },
    output: [
      {
        contentType: "application/json",
        status: 200,
        schema: z.string(),
      },
      {
        contentType: "application/json",
        status: 418,
        schema: z.string(),
      },
    ],
    handler: async ({
      res,
      req: {
        body: { toWhat, what, id },
      },
    }) => {
      try {
        if (what === "pin") {
          const item = await prisma.list.findFirst({
            where: {
              id: id,
            },
          });
          await prisma.list.update({
            where: {
              id: id,
            },
            data: {
              favorite: !item?.favorite,
            },
          });
          res.status(200).send("List favorite updated");
        } else {
          await prisma.list.update({
            where: {
              id: id,
            },
            data: {
              listName: toWhat,
            },
          });
          res.status(200).send("Updated Name");
        }
      } catch (err) {
        res.status(418).send(`Something went wrong ${err}`);
      }
    },
  },
});
