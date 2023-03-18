import { defineEndpoints } from "next-rest-framework/client";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/* The point of this endpoint is to delete an item to a list.
First check the name given against the database.
Since there are multiple ways to spell something we are trying to remove 
a couple of letters at a time and see if there is a match
When shorter than 3 letters we just put it in the Other list
*/
export const deleteListInputSchema = z.object({
  id: z.string(),
});
const outputSchema = z.string();

export default defineEndpoints({
  DELETE: {
    input: {
      query: deleteListInputSchema,
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
});
