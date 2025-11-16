import { createClient } from "@libsql/client";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { clsx } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";
import { UTApi, createUploadthing } from "uploadthing/server";
const envServer = createEnv({
  server: {
    DB_FILE_NAME: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1)
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const genId = () => nanoid(7);
function generateBadgeNumber(position, sequence) {
  const positionCode = position.toUpperCase().replace(/\s+/g, "");
  const sequenceFormatted = sequence.toString().padStart(3, "0");
  return `${positionCode}-${sequenceFormatted}`;
}
function formatDate(date, opts = {}) {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts
    }).format(new Date(date));
  } catch (_err) {
    return "";
  }
}
const formatDateTime = (date) => {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username")
});
const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
});
const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp_ms"
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp_ms"
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
const employees = sqliteTable("employees", {
  id: text("id").primaryKey().$defaultFn(genId),
  name: text("name").notNull(),
  position: text("position").notNull(),
  badge: text("badge").notNull(),
  barcodeUrl: text("barcode_url").unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  )
});
const haircutHistory = sqliteTable("haircut_history", {
  id: text("id").primaryKey().$defaultFn(genId),
  employeeId: text("employee_id").references(() => employees.id),
  haircutDate: integer("haircut_date", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  )
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  account,
  employees,
  haircutHistory,
  session,
  user,
  verification
}, Symbol.toStringTag, { value: "Module" }));
config();
const client = createClient({ url: envServer.DB_FILE_NAME });
const db = drizzle({ schema, client });
const f = createUploadthing();
const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "8MB",
      maxFileCount: 1
    }
  }).middleware(async () => {
    return { userId: "Admin" };
  }).onUploadError(async ({ error }) => {
    console.error(error.message);
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete for userId:", metadata.userId);
    console.log("file url", file.ufsUrl);
    return { uploadedBy: metadata.userId };
  })
};
const utapi = new UTApi();
export {
  uploadRouter as a,
  formatDate as b,
  cn as c,
  db as d,
  employees as e,
  formatDateTime as f,
  generateBadgeNumber as g,
  haircutHistory as h,
  utapi as u
};
