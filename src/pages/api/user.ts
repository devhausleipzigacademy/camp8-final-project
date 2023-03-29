import { z, ZodError } from "zod";
import { MasterItem, User } from "@prisma/client";
import { defineEndpoints } from "../../next-rest-framework/client";
import { prisma } from "../api/prisma";
import { itemPutOutput } from "./item";

const userPostSchema = z.object({
  expires: z.string(),
  user: z.object({
    email: z.string(),
    image: z.nullable(z.optional(z.string())),
    name: z.nullable(z.optional(z.string())),
  }),
});
const userPostOutput = z.object({
  id: z.string(),
  name: z.nullable(z.string()),
  email: z.nullable(z.string()),
  emailVerified: z.nullable(z.date()),
  image: z.nullable(z.string()),
});

export default defineEndpoints({
  POST: {
    openApiSpec: {
      description:
        "Will check if user exists, and will update photo and name if necessary",
    },
    input: {
      contentType: "application/json",
      body: userPostSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
        schema: userPostOutput,
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
        body: {
          user: { email, image, name },
        },
      },
    }) => {
      try {
        // Getting ID of list we will add product to.  If none there create one

        let temp = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!temp) {
          temp = await prisma.user.create({
            data: {
              email: email,
            },
          });
        }
        if (name && image) {
          await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              image: image,
              name: name,
            },
          });
        }

        res.status(200).send(temp);
      } catch (err) {
        res.status(418).send(JSON.stringify(err));
      }
    },
  },
  PUT: {
    openApiSpec: {
      description: "Will find all items that are in review.",
    },
    output: [
      {
        contentType: "application/json",
        status: 200,
        schema: itemPutOutput,
      },
    ],
    handler: async ({ res, req }) => {
      const itemToReview = await prisma.item.findMany({
        where: {
          verified: false,
          listIdentifier: null,
        },
      });
      res.status(200).send(itemToReview);
    },
  },
});
