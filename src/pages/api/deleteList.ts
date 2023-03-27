import { defineEndpoints } from "next-rest-framework/client";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/* The point of this endpoint is to delete a list.
It will receive an id, will find corresponding list and remove it.
*/
export const deleteListInputSchema = z.object({
  id: z.string(),
});
const outputSchema = z.string();

export default defineEndpoints({
  DELETE: {
    openApiSpec: {
      description: "Deletes a list",
    },
    input: {
      query: deleteListInputSchema,
    },
    output: [
      {
        status: 200,
        contentType: "text/plain",
        schema: outputSchema,
      },
      {
        status: 400,
        contentType: "text/plain",
        schema: outputSchema,
      },
      {
        status: 418,
        contentType: "text/plain",
        schema: outputSchema,
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
});
