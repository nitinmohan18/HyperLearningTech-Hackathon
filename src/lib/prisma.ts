import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getValidatedDatabaseUrl(): string {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const expectedHost = process.env.EXPECTED_DATABASE_HOST;
  if (!expectedHost) {
    throw new Error("EXPECTED_DATABASE_HOST is not set");
  }

  let actualHost: string;
  try {
    actualHost = new URL(connectionString).hostname;
  } catch {
    throw new Error("DATABASE_URL is not a valid URL format");
  }

  const normalizedActualHost = actualHost.replace("-pooler", "");
  const normalizedExpectedHost = expectedHost.trim().replace("-pooler", "");

  if (normalizedActualHost !== normalizedExpectedHost) {
    throw new Error(
      `Database branch validation failed: connected to '${normalizedActualHost}', but expected '${normalizedExpectedHost}'.`
    );
  }

  return connectionString;
}

function createPrismaClient() {
  const connectionString = getValidatedDatabaseUrl();
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
