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

      const itemsChecked = element.items.map((item) => {
        item.checked === true
      }).length

      const itemsTotal = element.items.map((item)=>{}).length
      element.itemsTotal = itemsTotal
      element.itemsChecked = itemsChecked
      delete element.items

      console.log({ ...element})
    }),

    response.status(200).json(userListsHttpRespond)
    console.log()
    return userListsHttpRespond;
  };
  response.status(405).send("not ok");
}