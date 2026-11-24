import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

const prismaEnv = process.env.PRISMA_ENV;

if (prismaEnv !== "development" && prismaEnv !== "production") {
  throw new Error(
    "PRISMA_ENV must explicitly be set to 'development' or 'production'."
  );
}

const envFile =
  prismaEnv === "development"
    ? ".env.development.local"
    : ".env";

const envPath = resolve(process.cwd(), envFile);

if (prismaEnv === "development") {
  if (!existsSync(envPath)) {
    throw new Error(`Required environment file is missing: ${envFile}`);
  }
  const result = loadEnv({ path: envPath, override: true });
  if (result.error) {
    throw result.error;
  }
} else {
  // Production: Vercel injects environment variables directly.
  // Fall back to local .env file only if it exists.
  if (existsSync(envPath)) {
    loadEnv({ path: envPath, override: false });
  }
}

const databaseUrl =
  prismaEnv === "development"
    ? process.env.DEV_DATABASE_URL || process.env.DATABASE_URL
    : process.env.DATABASE_URL;

const directUrl =
  prismaEnv === "development"
    ? process.env.DEV_DIRECT_URL || process.env.DIRECT_URL
    : process.env.DIRECT_URL;

if (!databaseUrl || !directUrl) {
  throw new Error(
    `DATABASE_URL and DIRECT_URL (or DEV_DATABASE_URL and DEV_DIRECT_URL) are required for ${prismaEnv}.`
  );
}

// Ensure process.env has DATABASE_URL and DIRECT_URL populated for Prisma
process.env.DATABASE_URL = databaseUrl;
process.env.DIRECT_URL = directUrl;

let runtimeHost: string;
let directHost: string;

try {
  runtimeHost = new URL(databaseUrl).hostname;
  directHost = new URL(directUrl).hostname;
} catch {
  throw new Error("Invalid URL format in DATABASE_URL or DIRECT_URL.");
}

// Compare base Neon hostnames by stripping '-pooler' prefix if present
const runtimeBranch = runtimeHost.replace("-pooler", "");
const directBranch = directHost.replace("-pooler", "");

if (runtimeBranch !== directBranch) {
  throw new Error(
    "DATABASE_URL and DIRECT_URL point to different database branches."
  );
}

console.log(`Prisma environment: ${prismaEnv}`);
console.log(`Database branch host: ${directHost}`);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: directUrl,
  },
});
