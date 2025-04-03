import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      transactionOptions: {
        maxWait: 1000,
        timeout: 65000,
      },
    });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
