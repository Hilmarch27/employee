import fs from 'node:fs';
import path from 'node:path';
import { createServerFn } from '@tanstack/react-start';
import { createCanvas, loadImage } from 'canvas';
import { and, desc, eq, gte, lt, sql } from 'drizzle-orm';
import QRCode from 'qrcode';
import z from 'zod';
import { db } from '@/db';
import { employees, haircutHistory } from '@/db/schema';

async function writeFileToDisk(file: Buffer, id: string) {
	const rootDir = process.cwd();
	const uploadDir = path.join(rootDir, 'public', 'uploads');

	await fs.promises.mkdir(uploadDir, { recursive: true });

	const targetPath = path.join(uploadDir, `${id}.png`);

	// Check if file exists (optional: skip atau overwrite)
	const exists = await fs.promises
		.access(targetPath)
		.then(() => true)
		.catch(() => false);
	if (exists) {
		console.warn(`File ${id}.png already exists, overwriting...`);
	}

	console.log('Writing', `${id}.png`, 'to', targetPath);
	await fs.promises.writeFile(targetPath, file);

	return {
		url: `/uploads/${id}.png`,
		name: `${id}.png`,
	};
}

interface QRCodeOptions {
	id: string;
	name: string;
}

async function genQRCode(options: QRCodeOptions): Promise<Buffer> {
	const { id, name } = options;

	try {
		// Generate QR code sebagai buffer
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

		// Setup canvas
		const fontSize = 16;
		const padding = 20;
		const textHeight = fontSize + 10;

		const canvas = createCanvas(
			250 + padding * 2,
			250 + padding * 2 + textHeight * 2,
		);
		const ctx = canvas.getContext('2d');

		// Background putih
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Load QR code image dari buffer
		const qrImage = await loadImage(qrBuffer);

		// Gambar teks nama di atas (bold)
		ctx.fillStyle = '#000000';
		ctx.font = `bold ${fontSize}px Arial`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.fillText(name, canvas.width / 2, padding);

		// Gambar QR code di tengah
		ctx.drawImage(qrImage, padding, padding + textHeight, 250, 250);

		// Gambar timestamp di bawah
		ctx.font = `${fontSize - 2}px Arial`;
		ctx.fillText(id, canvas.width / 2, padding + textHeight + 250 + 10);

		// Return sebagai PNG buffer
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
					const file = await writeFileToDisk(qrCode, item.id);

					// Update database
					await db
						.update(employees)
						.set({ barcodeUrl: file.url })
						.where(eq(employees.id, item.id));

					return {
						id: item.id,
						file,
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

export const getHaircutHistory = createServerFn({ method: 'GET' }).handler(
	async () => {
		try {
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
	},
);