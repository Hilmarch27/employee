import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { eq, sql, asc, desc, and, gte, lt } from "drizzle-orm";
import QRCode from "qrcode";
import sharp from "sharp";
import z from "zod";
import { d as db, e as employees, h as haircutHistory } from "./index-Dmu0Fhot.mjs";
import { u as utapi } from "./config-BHLBq3j-.mjs";
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
    const canvasWidth = 250 + padding * 2;
    const canvasHeight = 250 + padding * 2 + textHeight * 2;
    const svgTop = `
			<svg width="${canvasWidth}" height="${textHeight}">
				<text 
					x="50%" 
					y="50%" 
					text-anchor="middle" 
					dominant-baseline="middle"
					font-family="Arial, sans-serif" 
					font-size="${fontSize}" 
					font-weight="bold"
					fill="#000000"
				>${name}</text>
			</svg>
		`;
    const svgBottom = `
			<svg width="${canvasWidth}" height="${textHeight}">
				<text 
					x="50%" 
					y="50%" 
					text-anchor="middle" 
					dominant-baseline="middle"
					font-family="Arial, sans-serif" 
					font-size="${fontSize - 2}" 
					fill="#666666"
				>${id}</text>
			</svg>
		`;
    const finalImage = await sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: {
          r: 255,
          g: 255,
          b: 255,
          alpha: 1
        }
      }
    }).composite([
      // Text atas
      {
        input: Buffer.from(svgTop),
        top: padding,
        left: 0
      },
      // QR Code
      {
        input: qrBuffer,
        top: padding + textHeight,
        left: padding
      },
      // Text bawah
      {
        input: Buffer.from(svgBottom),
        top: padding + textHeight + 250 + 10,
        left: 0
      }
    ]).png().toBuffer();
    return finalImage;
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
}).handler(getHaircutHistory_createServerFn_handler, async () => {
  try {
    const records = await db.select({
      id: haircutHistory.id,
      employeeId: haircutHistory.employeeId,
      haircutDate: haircutHistory.haircutDate,
      createdAt: haircutHistory.createdAt,
      employeeName: employees.name,
      employeeBadge: employees.badge,
      employeePosition: employees.position
    }).from(haircutHistory).innerJoin(employees, sql`${haircutHistory.employeeId} = ${employees.id}`).orderBy(asc(employees.position), desc(haircutHistory.haircutDate));
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
