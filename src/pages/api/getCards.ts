import console from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
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
    console.log("wrong method");
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
      userListsHttpRespond.forEach((element) => {
        console.log(JSON.stringify(element));
        element.itemsChecked = element.items.filter((i) => {
          if (i.checked === true) {
            console.log("heyy, found one");
            return true;
          }
        }).length;
        element.itemsTotal = element.items.length;

        delete element.items;
      });

      console.log("data processed", JSON.stringify(userListsHttpRespond)),
      response.status(200).send(userListsHttpRespond);
    } else {
      return [{}];
    }
  }
}