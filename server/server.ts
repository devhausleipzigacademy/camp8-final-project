async function main() {
  // Insert a single user
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
  });
  console.log(JSON.stringify(user, undefined, 2));
}
