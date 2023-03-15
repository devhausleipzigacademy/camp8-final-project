import { prisma } from "./prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

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
		} catch (err) {}
		response.status(404).send(`Invalid method, need PATCH: ${request.method}`);
	}
}
const inputQuerySchema = z.object({
	email: z.string(),
});