import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { createCanvas, loadImage } from "canvas";
import { eq, gte, lte, sql, and, asc, desc, lt } from "drizzle-orm";
import QRCode from "qrcode";
import z from "zod";
import { u as utapi, d as db, e as employees, h as haircutHistory } from "./config-CJ6AisJq.mjs";
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
import "uploadthing/server";
async function genQRCode(options) {
  const {
    id,
    name
  } = options;
  try {
    const qrBuffer = await QRCode.toBuffer(id, {
      width: 250,
      margin: 2,
      errorCorrectionLevel: "M",
      type: "png",
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      }
    });
    const fontSize = 18;
    const padding = 20;
    const textHeight = 30;
    const qrSize = 250;
    const canvasWidth = qrSize + padding * 2;
    const canvasHeight = qrSize + padding * 2 + textHeight * 2;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000000";
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, canvasWidth / 2, padding + textHeight / 2);
    const qrImage = await loadImage(qrBuffer);
    ctx.drawImage(qrImage, padding, padding + textHeight, qrSize, qrSize);
    ctx.fillStyle = "#666666";
    ctx.font = `${fontSize - 2}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(id, canvasWidth / 2, padding + textHeight + qrSize + 10 + textHeight / 2);
    return canvas.toBuffer("image/png");
  } catch (error) {
    throw new Error(`Failed to generate QR code: ${error}`);
  }
}
const CreateBarcodeSc = z.object({
  items: z.array(z.object({
    name: z.string().min(1),
    id: z.string().min(1)
  })).min(1)
});
const createBarcode_createServerFn_handler = createServerRpc("336f879870c55ee2129c779d5f5975293e870c93730cc9c3d4268eaa589130d0", (opts, signal) => {
  return createBarcode.__executeServer(opts, signal);
});
const createBarcode = createServerFn({
  method: "POST"
}).inputValidator(CreateBarcodeSc).handler(createBarcode_createServerFn_handler, async ({
  data
}) => {
  try {
    const results = await Promise.all(data.items.map(async (item) => {
      const qrCode = await genQRCode({
        name: item.name,
        id: item.id
      });
      const file = new File([new Uint8Array(qrCode)], `${item.id}.png`, {
        type: "image/png"
      });
      const res = await utapi.uploadFiles(file);
      if (!res.data) {
        throw new Error("Failed to upload Barcode");
      }
      await db.update(employees).set({
        barcodeUrl: res.data.ufsUrl
      }).where(eq(employees.id, item.id));
      return {
        id: item.id,
        url: res.data.ufsUrl,
        name: item.name
      };
    }));
    return {
      count: results.length,
      results
    };
  } catch (error) {
    console.error("Error creating barcode:", error);
    throw new Error("Failed to create barcode");
  }
});
const scanBarcode_createServerFn_handler = createServerRpc("35796e2abc170634d9b6ae992959d81695571801047a6b0e08066f48a74c3504", (opts, signal) => {
  return scanBarcode.__executeServer(opts, signal);
});
const scanBarcode = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  id: z.string().min(1)
})).handler(scanBarcode_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      id
    } = data;
    const employee = await db.query.employees.findFirst({
      where: eq(employees.id, id)
    });
    if (!employee) {
      throw new Error("Employee not found");
    }
    const now = /* @__PURE__ */ new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const monthStartTimestamp = Math.floor(currentMonthStart.getTime() / 1e3);
    const nextMonthTimestamp = Math.floor(nextMonthStart.getTime() / 1e3);
    const existingScan = await db.query.haircutHistory.findFirst({
      where: and(eq(haircutHistory.employeeId, id), gte(haircutHistory.haircutDate, new Date(monthStartTimestamp * 1e3)), lt(haircutHistory.haircutDate, new Date(nextMonthTimestamp * 1e3)))
    });
    if (existingScan) {
      const scanDate = existingScan.haircutDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      throw new Error(`Anda sudah cukur di bulan ini pada tanggal ${scanDate}`);
    }
    const [newRecord] = await db.insert(haircutHistory).values({
      employeeId: id,
      haircutDate: /* @__PURE__ */ new Date()
    }).returning();
    return {
      message: "Haircut berhasil dicatat",
      result: {
        id: newRecord.id,
        employeeName: employee.name,
        employeeBadge: employee.badge,
        haircutDate: newRecord.haircutDate
      }
    };
  } catch (error) {
    console.error("Error scanning barcode:", error);
    throw new Error(error.message);
  }
});
const getHaircutHistory_createServerFn_handler = createServerRpc("8821ae31bdbbd53d8696738736d685dd361d3ae3999ef67be7fb06eddb89e15e", (opts, signal) => {
  return getHaircutHistory.__executeServer(opts, signal);
});
const getHaircutHistory = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  range: z.array(z.number()).min(2)
}).optional()).handler(getHaircutHistory_createServerFn_handler, async ({
  data
}) => {
  const {
    range = []
  } = data || {};
  try {
    const filters = [];
    let start;
    let end;
    if (range && range.length >= 2) {
      const [startEpoch, endEpoch] = range;
      start = new Date(startEpoch);
      end = new Date(endEpoch);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      filters.push(gte(haircutHistory.haircutDate, start), lte(haircutHistory.haircutDate, end));
    }
    const records = await db.select({
      id: haircutHistory.id,
      employeeId: haircutHistory.employeeId,
      haircutDate: haircutHistory.haircutDate,
      createdAt: haircutHistory.createdAt,
      employeeName: employees.name,
      employeeBadge: employees.badge,
      employeePosition: employees.position
    }).from(haircutHistory).innerJoin(employees, sql`${haircutHistory.employeeId} = ${employees.id}`).where(and(...filters)).orderBy(asc(employees.position), desc(haircutHistory.haircutDate));
    const formattedRecords = records.map((record) => {
      const haircutDate = new Date(record.haircutDate);
      return {
        id: record.id,
        employeeId: record.employeeId,
        name: record.employeeName,
        badge: record.employeeBadge,
        position: record.employeePosition,
        haircutDate: record.haircutDate,
        formattedTime: haircutDate.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }),
        monthYear: haircutDate.toLocaleDateString("id-ID", {
          month: "long",
          year: "numeric"
        }),
        createdAt: record.createdAt
      };
    });
    return {
      data: formattedRecords,
      total: formattedRecords.length
    };
  } catch (error) {
    console.error("Error fetching haircut history:", error);
    throw new Error("Gagal mengambil data history");
  }
});
export {
  createBarcode_createServerFn_handler,
  getHaircutHistory_createServerFn_handler,
  scanBarcode_createServerFn_handler
};
