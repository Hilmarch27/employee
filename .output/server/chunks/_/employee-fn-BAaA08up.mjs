import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { eq, desc } from "drizzle-orm";
import z from "zod";
import { d as db, e as employees, g as generateBadgeNumber } from "./index-Dmu0Fhot.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "@libsql/client";
import "dotenv";
import "drizzle-orm/libsql";
import "@t3-oss/env-core";
import "drizzle-orm/sqlite-core";
import "clsx";
import "nanoid";
import "tailwind-merge";
const CreateEmployeeSc = z.object({
  name: z.string().min(1),
  position: z.string().min(1)
});
const createEmployee_createServerFn_handler = createServerRpc("be412f3b3e6ca295950e4fdcee9704a5fe5550e74a70796c87282f6a2167eadb", (opts, signal) => {
  return createEmployee.__executeServer(opts, signal);
});
const createEmployee = createServerFn({
  method: "POST"
}).inputValidator(CreateEmployeeSc).handler(createEmployee_createServerFn_handler, async ({
  data
}) => {
  const [lastSequence] = await db.select({
    badge: employees.badge
  }).from(employees).where(eq(employees.position, data.position)).orderBy(desc(employees.badge)).limit(1);
  if (!lastSequence) {
    const badge = generateBadgeNumber(data.position, 1);
    const payload = {
      ...data,
      badge
    };
    const employee = await db.insert(employees).values(payload).returning();
    return {
      message: "Employee created successfully",
      result: employee
    };
  }
  throw new Error("Sequence not found");
});
const getEmployees_createServerFn_handler = createServerRpc("d995f78514bca95f9b64006a76df31a80a116f32dc69ce9fdb5fdd431a92895c", (opts, signal) => {
  return getEmployees.__executeServer(opts, signal);
});
const getEmployees = createServerFn({
  method: "GET"
}).handler(getEmployees_createServerFn_handler, async () => {
  const employee = await db.select().from(employees).orderBy(desc(employees.createdAt));
  return employee;
});
const getPositions_createServerFn_handler = createServerRpc("a9bd7b20fa2edafd59d5d28102189a72aff3c1be54e7e3223f98f733cf4e902a", (opts, signal) => {
  return getPositions.__executeServer(opts, signal);
});
const getPositions = createServerFn({
  method: "GET"
}).handler(getPositions_createServerFn_handler, async () => {
  try {
    const result = await db.select({
      position: employees.position
    }).from(employees).groupBy(employees.position).orderBy(desc(employees.position));
    const positions = result.map((row) => row.position);
    return positions.map((position) => ({
      value: position,
      label: position
    }));
  } catch (error) {
    console.error("Error getting unique instansi:", error);
    throw new Error("Failed to get instansi");
  }
});
export {
  createEmployee_createServerFn_handler,
  getEmployees_createServerFn_handler,
  getPositions_createServerFn_handler
};
