import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const greetingSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query = greetingSchema.parse(req.query);
    return res.status(200).json({ message: `Hello ${query.name}` });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(422).json({ error: err.flatten().fieldErrors });
    }
    return res.status(500).json({ error: err });
  }
}
