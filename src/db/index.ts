import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/postgres";

const globalForDb = globalThis as unknown as {
  postgresClientV2: postgres.Sql<{}> | undefined;
};

const client =
  globalForDb.postgresClientV2 ??
  postgres(connectionString, {
    max: 1,
    prepare: false, // Required for Supabase pgbouncer transaction pooling mode
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClientV2 = client;
}

export const db = drizzle(client, { schema });
