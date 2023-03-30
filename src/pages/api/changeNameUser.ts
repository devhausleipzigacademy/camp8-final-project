import { prisma } from "./prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { ZodError } from "zod";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (request.method === "PATCH") {
		try {
			const { name, email } = inputQuerySchema.parse(request.body);

			const updateUser = await prisma.user.update({
				where: {
					email: email,
				},
				data: {
					name: name,
				},
			});
			response.status(200).send(`Name changed to ${name}`);
		} catch (err) {
			if (err instanceof ZodError) {
				response.status(418).send(`ZodError ${err}`);
			} else {
				response.status(400).send(`Something Went wrong: ${err}`);
			}
		}
	}
}
const inputQuerySchema = z.object({
	name: z.string(),
	email: z.string(),
});
