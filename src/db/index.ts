import { createClient } from '@libsql/client';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import { envServer } from '@/env.ts';
import * as schema from './schema.ts';

config();

const client = createClient({
	url: envServer.TURSO_DATABASE_URL,
	authToken: envServer.TURSO_AUTH_TOKEN,
});

export const db = drizzle({ schema, client });

export type DB = typeof db;
