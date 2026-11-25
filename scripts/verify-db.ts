import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const ping = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 AS ok`;
  const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
    SELECT table_name::text AS table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `;

  const okValue = ping[0]?.ok;
  console.log(
    JSON.stringify({
      connected: Number(okValue) === 1,
      tables: tables.map((table) => table.table_name),
    }),
  );
}

main()
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "unknown error";
    const redacted = message.replace(/postgres(?:ql)?:\/\/\S+/gi, "[redacted]");
    console.error("CONNECTION_FAILED");
    console.error(redacted);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
