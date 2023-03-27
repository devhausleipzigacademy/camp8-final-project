import { z, ZodError } from "zod";
import { MasterItem } from "@prisma/client";
import { defineEndpoints } from "next-rest-framework/client";
import { prisma } from "../api/prisma";

const userPostSchema = z.object({
  expires: z.string(),
  user: z.object({
    email: z.string(),
    image: z.nullable(z.optional(z.string())),
    name: z.nullable(z.optional(z.string())),
  }),
});

export default defineEndpoints({
  POST: {
    openApiSpec: {
      description:
        "Will check if input is in MasterItem, if so, will add it along with photo and category.  If not, will add to list other",
    },
    input: {
      contentType: "application/json",
      body: userPostSchema,
    },
    output: [
      {
        status: 200,
        contentType: "application/json",
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

        res.status(200).send("User Created Bronco!");
      } catch (err) {
        res.status(418).send(JSON.stringify(err));
      }
    },
  },
});
