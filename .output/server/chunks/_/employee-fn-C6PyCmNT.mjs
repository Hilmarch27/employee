import { a as createServerRpc, c as createServerFn, g as getResponseHeaders, s as setResponseHeaders } from "./server.mjs";
import { count, eq, desc } from "drizzle-orm";
import { g as genQRCode, a as getHaircutHistory, u as utils, w as writeSync } from "./barcode-fn-DrcdRNF3.mjs";
import z from "zod";
import { d as db, e as employees, g as generateBadgeNumber, u as utapi } from "./config-CJ6AisJq.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "canvas";
import "qrcode";
import "@libsql/client";
import "dotenv";
import "drizzle-orm/libsql";
import "@t3-oss/env-core";
import "drizzle-orm/sqlite-core";
import "clsx";
import "nanoid";
import "tailwind-merge";
import "uploadthing/server";
const CreateEmployeeSc = z.object({
  name: z.string().min(1),
  position: z.string().min(1)
});
const UpdateEmployeeSc = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  position: z.string().min(1).optional()
});
const DeleteEmployeeSc = z.object({
  id: z.string().min(1)
});
const createEmployee_createServerFn_handler = createServerRpc("be412f3b3e6ca295950e4fdcee9704a5fe5550e74a70796c87282f6a2167eadb", (opts, signal) => {
  return createEmployee.__executeServer(opts, signal);
});
const createEmployee = createServerFn({
  method: "POST"
}).inputValidator(CreateEmployeeSc).handler(createEmployee_createServerFn_handler, async ({
  data
}) => {
  const [result] = await db.select({
    count: count()
  }).from(employees).where(eq(employees.position, data.position));
  const total = result?.count ?? 0;
  const sequence = total > 0 ? total + 1 : 1;
  const badge = generateBadgeNumber(data.position, sequence);
  const [employee] = await db.insert(employees).values({
    ...data,
    badge
  }).returning();
  if (!employee) {
    throw new Error("Failed to create employee");
  }
  const qrCode = await genQRCode({
    name: employee.name,
    id: employee.id
  });
  const file = new File([new Uint8Array(qrCode)], `${employee.id}.png`, {
    type: "image/png"
  });
  const res = await utapi.uploadFiles(file);
  if (!res.data) {
    throw new Error("Failed to upload Barcode");
  }
  const [updatedEmployee] = await db.update(employees).set({
    barcodeUrl: res.data.ufsUrl
  }).where(eq(employees.id, employee.id)).returning();
  return {
    message: "Employee created successfully",
    result: updatedEmployee ? [updatedEmployee] : [employee]
  };
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
const updateEmployee_createServerFn_handler = createServerRpc("637bb0a711805f0e7b67fb66570698f4bfb37a01015b4ab8bc533387f5072a9b", (opts, signal) => {
  return updateEmployee.__executeServer(opts, signal);
});
const updateEmployee = createServerFn({
  method: "POST"
}).inputValidator(UpdateEmployeeSc).handler(updateEmployee_createServerFn_handler, async ({
  data
}) => {
  const existingEmployee = await db.query.employees.findFirst({
    where: eq(employees.id, data.id ?? "")
  });
  if (!existingEmployee) {
    throw new Error("Employee not found");
  }
  const [updatedEmployee] = await db.update(employees).set({
    name: data.name,
    position: data.position
  }).where(eq(employees.id, data.id ?? "")).returning();
  if (!updatedEmployee) {
    throw new Error("Failed to update employee");
  }
  return {
    message: "Employee updated successfully",
    result: updatedEmployee
  };
});
const deleteEmployee_createServerFn_handler = createServerRpc("7e957ad82373e00ed81c4c7232f158d4e11705028f4c1df1cf2e844c8fe8ef9c", (opts, signal) => {
  return deleteEmployee.__executeServer(opts, signal);
});
const deleteEmployee = createServerFn({
  method: "POST"
}).inputValidator(DeleteEmployeeSc).handler(deleteEmployee_createServerFn_handler, async ({
  data
}) => {
  const existingEmployee = await db.query.employees.findFirst({
    where: eq(employees.id, data.id)
  });
  if (!existingEmployee) {
    throw new Error("Employee not found");
  }
  await db.delete(employees).where(eq(employees.id, data.id));
  return {
    message: "Employee deleted successfully"
  };
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
const exportHaircutHistoryExcel_createServerFn_handler = createServerRpc("b0898779ff6e8daecf444f00c8ecf351ec699c70ebd58b0d8ce0af0f14fe9c1c", (opts, signal) => {
  return exportHaircutHistoryExcel.__executeServer(opts, signal);
});
const exportHaircutHistoryExcel = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  range: z.array(z.number()).min(2)
}).optional()).handler(exportHaircutHistoryExcel_createServerFn_handler, async ({
  data
}) => {
  try {
    const history = await getHaircutHistory({
      data
    });
    if (!history.data || history.data.length === 0) {
      throw new Error("");
    }
    const dates = history.data.map((item) => new Date(item.haircutDate));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
    const monthYearTitle = minDate.getMonth() === maxDate.getMonth() && minDate.getFullYear() === maxDate.getFullYear() ? minDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    }) : `${minDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    })} - ${maxDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    })}`;
    const groupedByPosition = history.data.reduce((acc, item) => {
      const position = item.position || "Unknown";
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(item);
      return acc;
    }, {});
    const wsData = [];
    wsData.push([`Haircut History - ${monthYearTitle}`]);
    wsData.push([]);
    const positions = Object.keys(groupedByPosition).sort();
    positions.forEach((position, posIndex) => {
      const items = groupedByPosition[position];
      wsData.push([`Instansi: ${position}`]);
      wsData.push([]);
      wsData.push(["No", "Name", "Instansi", "Badge", "Date", "Time", "Month & Year"]);
      items.forEach((item, index) => {
        const haircutDate = new Date(item.haircutDate);
        const formattedDate = haircutDate instanceof Date && !Number.isNaN(haircutDate.getTime()) ? haircutDate.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }) : "-";
        wsData.push([index + 1, item.name, item.position, item.badge, formattedDate, item.formattedTime, item.monthYear]);
      });
      if (posIndex < positions.length - 1) {
        wsData.push([]);
        wsData.push([]);
      }
    });
    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(wsData);
    ws["!cols"] = [
      {
        wch: 5
      },
      // No
      {
        wch: 25
      },
      // Name
      {
        wch: 20
      },
      // Position
      {
        wch: 15
      },
      // Badge
      {
        wch: 30
      },
      // Date
      {
        wch: 12
      },
      // Time
      {
        wch: 20
      }
      // Month & Year
    ];
    if (ws.A1) {
      ws.A1.s = {
        font: {
          bold: true,
          sz: 14
        },
        alignment: {
          horizontal: "center"
        }
      };
    }
    ws["!merges"] = [{
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: 0,
        c: 6
      }
    }];
    utils.book_append_sheet(wb, ws, "Haircut History");
    const excelBuffer = writeSync(wb, {
      type: "buffer",
      bookType: "xlsx"
    });
    const headers = getResponseHeaders();
    headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.set("Content-Disposition", `attachment; filename="Haircut_History_${monthYearTitle.replace(/\s/g, "_")}.xlsx"`);
    setResponseHeaders(headers);
    return new Response(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Haircut_History_${monthYearTitle.replace(/\s/g, "_")}.xlsx"`
      }
    });
  } catch (error) {
    console.error("Error exporting haircut history:", error);
    throw new Error("Gagal mengekspor data ke Excel");
  }
});
export {
  createEmployee_createServerFn_handler,
  deleteEmployee_createServerFn_handler,
  exportHaircutHistoryExcel_createServerFn_handler,
  getEmployees_createServerFn_handler,
  getPositions_createServerFn_handler,
  updateEmployee_createServerFn_handler
};
