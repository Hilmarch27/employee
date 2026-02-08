import { envServer } from '@/env'
import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config()

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: envServer.TURSO_DATABASE_URL,
    authToken: envServer.TURSO_AUTH_TOKEN,
  },
})
