import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/*
must receive:
  id: [id of the list as string]
  newName: [the newName as string]

Will return smth. like this if successfull:

  [
  "data updated: ",
  {
    "id": "52d01211-1eb1-403d-9be3-ade3cf91a2f5",
    "listName": "brand new list name",
    "createdAt": "2023-03-15T14:53:45.768Z",
    "userIdentifier": "43b20ffc-ceea-43d5-b08c-9a1a6e4a1f98",
    "favorite": false
  }
]
*/

const inputQueryType = z.object({
  newName: z.string(),
  id: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PATCH") {
    try {
      const { id, newName } = inputQueryType.parse(request.body);
      await prisma.list.update({
        where: {
          id: id,
        },
        data: {
          listName: newName,
        },
      });
      response.status(200).send({ message: "list updated : " + { id } });
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent => ${JSON.stringify(err)}`);
      } else {
        response.status(418).send("Something is wrong");
      }
    }
  } else {
    response.status(404).send(`Invalid method, need PATCH: ${request.method}`);
  }
}

//MIND the syntax:
//after calling .send and other comparable methods don't modify anything anymore!!
