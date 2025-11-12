import { createClient } from "@libsql/client";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { envServer } from "@/env.ts";
import * as schema from "./schema.ts";

config();

const client = createClient({ url: envServer.DB_FILE_NAME });
export const db = drizzle({ schema, client });

export type DB = typeof db;
