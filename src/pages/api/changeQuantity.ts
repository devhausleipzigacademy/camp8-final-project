import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const Quantity = z.object({
  quantity: z.number(),
});

const AllowedUnits = z.union([
  z.literal("kg"),
  z.literal("L"),
  z.literal("g"),
  z.literal("pieces"),
  z.literal(""),
]);

const QuantityAndUnit = Quantity.extend({
  unit: AllowedUnits,
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const { quantity, unit } = QuantityAndUnit.parse(request.body);

    try {
      const updatedList = await prisma.items.update({
        where: { id: "0df43603-a0d9-4940-8775-1ede0ceebc6b" }, // Replace with actual ID of the list item
        data: {
          unit: unit,
          quantity: quantity,
        },
      });

      response.status(200).json(updatedList);
    } catch (error) {
      if (error instanceof ZodError) {
        response
          .status(400)
          .send(`Invalid quantity parameter: ${error.message}`);
      } else {
        response.status(500).send("Internal server error");
      }
    }

    return;
  }

  response.status(404).send(`Invalid method: ${request.method}`);
}
