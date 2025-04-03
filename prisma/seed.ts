import { db } from "../lib/db";
import { Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  await db.$transaction(async (tx) => {
    //deleting the fields first
    await tx.session.deleteMany({});
    await tx.account.deleteMany({});
    await tx.user.deleteMany({});
    // Hash passwords
    const userPasswordHash = await bcrypt.hash("User@2025", 10);
    const employerPasswordHash = await bcrypt.hash("Employer@2025", 10);
    const adminPasswordHash = await bcrypt.hash("Admin@2025", 10);

    const users = [
      {
        name: "John Doe",
        email: "user@gmail.com",
        passwordHash: userPasswordHash,
        role: Role.USER,
      },
      {
        name: "Jane Trust",
        email: "employer@gmail.com",
        passwordHash: employerPasswordHash,
        role: Role.EMPLOYER,
      },
      {
        name: "Admin User",
        email: "admin@gmail.com",
        passwordHash: adminPasswordHash,
        role: Role.ADMIN,
      },
    ];

    for (const user of users) {
      await db.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
    }

    console.log("Seeding completed.");
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
