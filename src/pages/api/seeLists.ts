import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "./prisma";

const inputQuerySchema = z.object({
  id: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    // Parse the user ID from the query parameters

    const { id } = inputQuerySchema.parse(request.query);

    //First, get all the Ids that belong to a user, based on userIdentifier
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


    userListsHttpRespond.forEach((element) => {
      element.itemsChecked = element.items.filter((i) => {
        if (i.checked === true){
          console.log("heyy, found one")
          return true}
      }).length;
      element.itemsTotal = element.items.length

      delete element.items
    }),

    response.status(200).json(userListsHttpRespond);

    return userListsHttpRespond
  }
  response.status(405).send("not ok");
}