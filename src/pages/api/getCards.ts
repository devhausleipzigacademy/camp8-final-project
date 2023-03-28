import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { UserList, UserLists } from "../home/Types";
import { prisma } from "./prisma";

/*
Gets the id of a user, returns an array of Type UserList
*/

const inputQuerySchema = z.object({
  id: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response.status(405).send(`Invalid method, need PATCH: ${request.method}`);
  } else {
    // Parse the user ID from the query parameters
    const { id } = inputQuerySchema.parse(request.query);

    ///all the lists linked to this specific Id, including all the Items included
    const userListsHttpRespond = await prisma.list.findMany({
      where: {
        userIdentifier: id,
      },
      select: {
        id: true,
        listName: true,
        createdAt: true,
        favorite: true,
        items: {
          select: {
            checked: true,
          },
        },
      },
    });

    if (userListsHttpRespond) {
      const userLists: UserLists = [] as UserLists;

      userListsHttpRespond.forEach((element) => {
        const newElement: UserList = {
          id: element.id,
          listName: element.listName as string,
          createdAt: element.createdAt.toString(),
          favorite: element.favorite,
          itemsTotal: element.items.length,
          itemsChecked: element.items.filter((i) => (i.checked === true)).length,
        };
        userLists.push({ ...newElement });
      });
      response.status(200).send(userLists);
    } else {
      return [{}];
    }
  }
}
