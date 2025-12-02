import { createServerFn } from '@tanstack/react-start';
import { createCanvas, loadImage } from 'canvas';
import { and, asc, desc, eq, gte, lt, lte, type SQL, sql } from 'drizzle-orm';
import QRCode from 'qrcode';
import z from 'zod';
import { db } from '@/db';
import { employees, haircutHistory } from '@/db/schema';
import { utapi } from '@/integrations/uploadthing/config';

interface QRCodeOptions {
	id: string;
	name: string;
}

export async function genQRCode(options: QRCodeOptions): Promise<Buffer> {
	const { id, name } = options;

	try {
		const qrBuffer = await QRCode.toBuffer(id, {
			width: 250,
			margin: 2,
			errorCorrectionLevel: 'M',
			type: 'png',
			color: {
				dark: '#000000',
				light: '#FFFFFF',
			},
		});

		// Setup canvas dimensions
		const fontSize = 18;
		const padding = 20;
		const textHeight = 30;
		const qrSize = 250;
		const canvasWidth = qrSize + padding * 2;
		const canvasHeight = qrSize + padding * 2 + textHeight * 2;

		// Create canvas
		const canvas = createCanvas(canvasWidth, canvasHeight);
		const ctx = canvas.getContext('2d');

		// Background putih
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);

		// Text atas (nama)
		ctx.fillStyle = '#000000';
		ctx.font = `bold ${fontSize}px Arial, sans-serif`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(name, canvasWidth / 2, padding + textHeight / 2);

		// Load dan draw QR code
		const qrImage = await loadImage(qrBuffer);
		ctx.drawImage(qrImage, padding, padding + textHeight, qrSize, qrSize);

		// Text bawah (ID)
		ctx.fillStyle = '#666666';
		ctx.font = `${fontSize - 2}px Arial, sans-serif`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(
			id,
			canvasWidth / 2,
			padding + textHeight + qrSize + 10 + textHeight / 2,
		);

		// Convert canvas to buffer
		return canvas.toBuffer('image/png');
	} catch (error) {
		throw new Error(`Failed to generate QR code: ${error}`);
	}
}

export const CreateBarcodeSc = z.object({
	items: z
		.array(
			z.object({
				name: z.string().min(1),
				id: z.string().min(1),
			}),
		)
		.min(1),
});

export const createBarcode = createServerFn({ method: 'POST' })
	.inputValidator(CreateBarcodeSc)
	.handler(async ({ data }) => {
		try {
			const results = await Promise.all(
				data.items.map(async (item) => {
					// Generate QR code
					const qrCode = await genQRCode({
						name: item.name,
						id: item.id,
					});

					const file = new File([new Uint8Array(qrCode)], `${item.id}.png`, {
						type: 'image/png',
					});

					const res = await utapi.uploadFiles(file);

					if (!res.data) {
						throw new Error('Failed to upload Barcode');
					}

					// Update database
					await db
						.update(employees)
						.set({ barcodeUrl: res.data.ufsUrl })
						.where(eq(employees.id, item.id));

					return {
						id: item.id,
						url: res.data.ufsUrl,
						name: item.name,
					};
				}),
			);

			return {
				count: results.length,
				results,
			};
		} catch (error) {
			console.error('Error creating barcode:', error);
			throw new Error('Failed to create barcode');
		}
	});

export const scanBarcode = createServerFn({ method: 'POST' })
	.inputValidator(
		z.object({
			id: z.string().min(1),
		}),
	)
	.handler(async ({ data }) => {
		try {
			const { id } = data;

			// 1. Check apakah employee exists
			const employee = await db.query.employees.findFirst({
				where: eq(employees.id, id),
			});

			if (!employee) {
				throw new Error('Employee not found');
			}

			// 2. Get current month start and end dates
			const now = new Date();
			const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
			const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

			// Convert to Unix timestamp (seconds)
			const monthStartTimestamp = Math.floor(
				currentMonthStart.getTime() / 1000,
			);
			const nextMonthTimestamp = Math.floor(nextMonthStart.getTime() / 1000);

			// 3. Check apakah sudah scan di bulan ini
			const existingScan = await db.query.haircutHistory.findFirst({
				where: and(
					eq(haircutHistory.employeeId, id),
					gte(haircutHistory.haircutDate, new Date(monthStartTimestamp * 1000)),
					lt(haircutHistory.haircutDate, new Date(nextMonthTimestamp * 1000)),
				),
			});

			if (existingScan) {
				const scanDate = existingScan.haircutDate.toLocaleDateString('id-ID', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				});

				throw new Error(
					`Anda sudah cukur di bulan ini pada tanggal ${scanDate}`,
				);
			}

			// 4. Create new haircut record
			const [newRecord] = await db
				.insert(haircutHistory)
				.values({
					employeeId: id,
					haircutDate: new Date(),
				})
				.returning();

			return {
				message: 'Haircut berhasil dicatat',
				result: {
					id: newRecord.id,
					employeeName: employee.name,
					employeeBadge: employee.badge,
					haircutDate: newRecord.haircutDate,
				},
			};
		} catch (error) {
			console.error('Error scanning barcode:', error);
			throw new Error((error as Error).message);
		}
	});

export const getHaircutHistory = createServerFn({ method: 'GET' })
	.inputValidator(
		z
			.object({
				range: z.array(z.number()).min(2),
			})
			.optional(),
	)
	.handler(async ({ data }) => {
		const { range = [] } = data || {};
		try {
			const filters: SQL[] = [];

			let start: Date | undefined;
			let end: Date | undefined;
			if (range && range.length >= 2) {
				const [startEpoch, endEpoch] = range;
				start = new Date(startEpoch);
				end = new Date(endEpoch);

				// Atur ke awal dan akhir hari
				start.setHours(0, 0, 0, 0);
				end.setHours(23, 59, 59, 999);

				// Misalnya filter berdasarkan range waktu
				filters.push(
					gte(haircutHistory.haircutDate, start),
					lte(haircutHistory.haircutDate, end),
				);
			}

			// Query with join, sorted by newest first
			const records = await db
				.select({
					id: haircutHistory.id,
					employeeId: haircutHistory.employeeId,
					haircutDate: haircutHistory.haircutDate,
					createdAt: haircutHistory.createdAt,
					employeeName: employees.name,
					employeeBadge: employees.badge,
					employeePosition: employees.position,
				})
				.from(haircutHistory)
				.innerJoin(
					employees,
					sql`${haircutHistory.employeeId} = ${employees.id}`,
				)
				.where(and(...filters))
				.orderBy(desc(haircutHistory.haircutDate));

			// Format records
			const formattedRecords = records.map((record) => {
				const haircutDate = new Date(record.haircutDate);

				return {
					id: record.id,
					employeeId: record.employeeId,
					name: record.employeeName,
					badge: record.employeeBadge,
					position: record.employeePosition,
					haircutDate: record.haircutDate,
					formattedTime: haircutDate.toLocaleTimeString('id-ID', {
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
					}),
					monthYear: haircutDate.toLocaleDateString('id-ID', {
						month: 'long',
						year: 'numeric',
					}),
					createdAt: record.createdAt,
				};
			});

			return {
				data: formattedRecords,
				total: formattedRecords.length,
			};
		} catch (error) {
			console.error('Error fetching haircut history:', error);
			throw new Error('Gagal mengambil data history');
		}
	});

export const getPreviewHaircut = createServerFn({ method: 'GET' }).handler(
	async () => {
		try {
			// Filter per bulan (bulan ini)
			const now = new Date();
			const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
			const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

			// Atur ke awal dan akhir hari
			currentMonthStart.setHours(0, 0, 0, 0);
			nextMonthStart.setHours(0, 0, 0, 0);

			// Query with join, sorted by haircutDate only
			const records = await db
				.select({
					id: haircutHistory.id,
					employeeId: haircutHistory.employeeId,
					haircutDate: haircutHistory.haircutDate,
					createdAt: haircutHistory.createdAt,
					employeeName: employees.name,
					employeeBadge: employees.badge,
					employeePosition: employees.position,
				})
				.from(haircutHistory)
				.innerJoin(
					employees,
					sql`${haircutHistory.employeeId} = ${employees.id}`,
				)
				.where(
					and(
						gte(haircutHistory.haircutDate, currentMonthStart),
						lt(haircutHistory.haircutDate, nextMonthStart),
					),
				)
				.orderBy(desc(haircutHistory.haircutDate));

			// Format records
			const formattedRecords = records.map((record) => {
				const haircutDate = new Date(record.haircutDate);

				return {
					id: record.id,
					employeeId: record.employeeId,
					name: record.employeeName,
					badge: record.employeeBadge,
					position: record.employeePosition,
					haircutDate: record.haircutDate,
					formattedTime: haircutDate.toLocaleTimeString('id-ID', {
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
					}),
					monthYear: haircutDate.toLocaleDateString('id-ID', {
						month: 'long',
						year: 'numeric',
					}),
					createdAt: record.createdAt,
				};
			});

			return {
				data: formattedRecords,
				total: formattedRecords.length,
			};
		} catch (error) {
			console.error('Error fetching preview haircut:', error);
			throw new Error('Gagal mengambil data preview');
		}
	},
);