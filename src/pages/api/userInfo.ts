import { prisma } from "./prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { ZodError } from "zod";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    try {
      const { email } = inputQuerySchema.parse(request.query);

      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      response.status(200).send(user);
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(418).send(`Wrong type of Data Sent ${err}`);
      } else {
        response.status(400).send(`Something Went wrong: ${err}`);
      }
    }
  }
}
const inputQuerySchema = z.object({
  email: z.string(),
});
