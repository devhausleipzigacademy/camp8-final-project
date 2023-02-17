const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.user.findMany();
  console.log(result);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

export {};
