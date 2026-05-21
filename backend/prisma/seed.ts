import { PrismaClient } from "@generated/prisma/client.js";
import { genSalt, hashPassword } from "@helpers/password.helper.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });
async function main() {
  console.log("Seeding database...");

  const roles = [
    {
      id: 1,
      name: "visitor",
      permissions: ["read:recipes"],
    },
    {
      id: 2,
      name: "contributor",
      permissions: [
        "read:recipes",
        "create:recipes",
        "update:recipes",
        "delete:recipes",
        "upload:images",
      ],
    },
    {
      id: 3,
      name: "admin",
      permissions: [
        "read:recipes",
        "create:recipes",
        "update:recipes",
        "delete:recipes",
        "manage:users",
        "upload:images",
      ],
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},
      create: role,
    });
    console.log(`Upserted role: ${role.name}`);
  }
  const adminUser = {
    email: process.env.ADMIN_EMAIL || "admin@cookshare.local",
    firstname: process.env.ADMIN_FIRSTNAME || "admin",
    lastname: process.env.ADMIN_LASTNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "password123",
    roleId: 3,
  };
  const passwordSalt = genSalt();
  const passwordHash = hashPassword(adminUser.password, passwordSalt);
  await prisma.user.upsert({
    where: { email: adminUser.email },
    update: {},
    create: {
      email: adminUser.email,
      firstname: adminUser.firstname,
      lastname: adminUser.lastname,
      passwordHash,
      passwordSalt,
    },
  });
  console.log(`Upserted user: ${adminUser.email}`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
