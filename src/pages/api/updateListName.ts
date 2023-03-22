import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
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
    id: z.string(),
    newName: z.string(),
  });

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    console.log(inputQueryType.parse(request.body));
    if (request.method !== "PATCH") {
      response.status(405).send("wrong method")
      return
    } else {
      try {
        const { id, newName } = inputQueryType.parse(request.body);
        const updatedData = await prisma.list.update({
          where: {
            id: id,
          },
          data: {
            listName: newName,
          },
        })
        response.status(200).send(["list updated : " + {id}])
      } catch (err) {
        console.log(err)
        response.status(500).send(err)
      }
    }
  }

  //MIND the syntax:
  //after calling .send and other comparable methods don't modify anything anymore!!