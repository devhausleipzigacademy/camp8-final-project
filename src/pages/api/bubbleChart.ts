import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { listId } = req.query;

  const items = await prisma.item.findMany({
    where: {
      listIdentifier: listId,
    },
    include: {
      customCategory: true,
      masterItem: {
        include: {
          defaultCategory: true,
        },
      },
    },
  });

  res.status(200).json({ items });
}
