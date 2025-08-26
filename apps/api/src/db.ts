// apps/api/src/db.ts
import { PrismaClient } from "@prisma/client";

// Re-use the Prisma client across hot-reloads in dev to avoid
// "Prisma has already been instantiated" / too many connections.
declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

const prisma =
  globalThis.__prisma__ ??
  new PrismaClient({
    log: ["error", "warn"], // add 'query' if you want verbose SQL logs
  });

// Only set the global in dev (not in prod processes)
if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma__ = prisma;
}

/**
 * Optional helper: call this once on boot to verify DB connectivity.
 * Example use in src/index.ts before app.listen.
 */
export async function ensureDatabase() {
  try {
    await prisma.$connect();
    // console.log('✅ Prisma connected');
  } catch (err) {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  }
}

export { prisma };
