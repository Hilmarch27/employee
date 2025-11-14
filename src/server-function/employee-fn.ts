import { createServerFn } from '@tanstack/react-start';
import {
	getResponseHeaders,
	setResponseHeaders,
} from '@tanstack/react-start/server';
import { desc, eq } from 'drizzle-orm';
import * as XLSX from 'xlsx';
import z from 'zod';
import { db } from '@/db';
import { employees } from '@/db/schema';
import { generateBadgeNumber } from '@/lib/utils';
import { getHaircutHistory } from '@/server-function/barcode-fn';

export const CreateEmployeeSc = z.object({
	name: z.string().min(1),
	position: z.string().min(1),
});

export type EmployeeInput = z.infer<typeof CreateEmployeeSc>;

export const createEmployee = createServerFn({ method: 'POST' })
	.inputValidator(CreateEmployeeSc)
	.handler(async ({ data }) => {
		const [lastSequence] = await db
			.select({ badge: employees.badge })
			.from(employees)
			.where(eq(employees.position, data.position))
			.orderBy(desc(employees.badge))
			.limit(1);

		if (!lastSequence) {
			const badge = generateBadgeNumber(data.position, 1);
			const payload = { ...data, badge };
			const employee = await db.insert(employees).values(payload).returning();
			return {
				message: 'Employee created successfully',
				result: employee,
			};
		}
		throw new Error('Sequence not found');
	});

export const getEmployees = createServerFn({ method: 'GET' }).handler(
	async () => {
		const employee = await db
			.select()
			.from(employees)
			.orderBy(desc(employees.createdAt));
		return employee;
	},
);

export const getPositions = createServerFn({ method: 'GET' }).handler(
	async () => {
		try {
			const result = await db
				.select({
					position: employees.position,
				})
				.from(employees)
				.groupBy(employees.position)
				.orderBy(desc(employees.position));

			const positions = result.map((row) => row.position);
			return positions.map((position) => ({
				value: position,
				label: position,
			}));
		} catch (error) {
			console.error('Error getting unique instansi:', error);
			throw new Error('Failed to get instansi');
		}
	},
);

export const exportHaircutHistoryExcel = createServerFn({ method: 'GET' })
	.inputValidator(
		z
			.object({
				range: z.array(z.number()).min(2),
			})
			.optional(),
	)
	.handler(async ({ data }) => {
		try {
			// Fetch data menggunakan fungsi yang sudah ada
			const history = await getHaircutHistory({ data });

			if (!history.data || history.data.length === 0) {
				throw new Error('');
			}

			// Determine month range for title
			const dates = history.data.map((item) => new Date(item.haircutDate));
			const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
			const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

			const monthYearTitle =
				minDate.getMonth() === maxDate.getMonth() &&
				minDate.getFullYear() === maxDate.getFullYear()
					? minDate.toLocaleDateString('id-ID', {
							month: 'long',
							year: 'numeric',
						})
					: `${minDate.toLocaleDateString('id-ID', {
							month: 'long',
							year: 'numeric',
						})} - ${maxDate.toLocaleDateString('id-ID', {
							month: 'long',
							year: 'numeric',
						})}`;

			// Group data by position
			const groupedByPosition = history.data.reduce(
				(acc, item) => {
					const position = item.position || 'Unknown';
					if (!acc[position]) {
						acc[position] = [];
					}
					acc[position].push(item);
					return acc;
				},
				{} as Record<string, typeof history.data>,
			);

			// Build worksheet data
			const wsData: (string | number)[][] = [];

			// Main title
			wsData.push([`Haircut History - ${monthYearTitle}`]);
			wsData.push([]); // Empty row

			// Process each position group
			const positions = Object.keys(groupedByPosition).sort();

			positions.forEach((position, posIndex) => {
				const items = groupedByPosition[position];

				// Instansi header
				wsData.push([`Instansi: ${position}`]);
				wsData.push([]); // Empty row

				// Column headers
				wsData.push([
					'No',
					'Name',
					'Instansi',
					'Badge',
					'Date',
					'Time',
					'Month & Year',
				]);

				// Data rows for this position
				items.forEach((item, index) => {
					const haircutDate = new Date(item.haircutDate);
					const formattedDate =
						haircutDate instanceof Date && !Number.isNaN(haircutDate.getTime())
							? haircutDate.toLocaleDateString('id-ID', {
									weekday: 'long',
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})
							: '-';

					wsData.push([
						index + 1,
						item.name,
						item.position,
						item.badge,
						formattedDate,
						item.formattedTime,
						item.monthYear,
					]);
				});

				// Add spacing between position groups (except for last group)
				if (posIndex < positions.length - 1) {
					wsData.push([]);
					wsData.push([]);
				}
			});

			// Create workbook and worksheet
			const wb = XLSX.utils.book_new();
			const ws = XLSX.utils.aoa_to_sheet(wsData);

			// Set column widths
			ws['!cols'] = [
				{ wch: 5 }, // No
				{ wch: 25 }, // Name
				{ wch: 20 }, // Position
				{ wch: 15 }, // Badge
				{ wch: 30 }, // Date
				{ wch: 12 }, // Time
				{ wch: 20 }, // Month & Year
			];

			// Style the title (first row)
			if (ws.A1) {
				ws.A1.s = {
					font: { bold: true, sz: 14 },
					alignment: { horizontal: 'center' },
				};
			}

			// Merge title row across all columns
			ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];

			// Add worksheet to workbook
			XLSX.utils.book_append_sheet(wb, ws, 'Haircut History');

			// Generate Excel file buffer
			const excelBuffer = XLSX.write(wb, {
				type: 'buffer',
				bookType: 'xlsx',
			});

			// Set response headers for file download
			const headers = getResponseHeaders();
			headers.set(
				'Content-Type',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			);
			headers.set(
				'Content-Disposition',
				`attachment; filename="Haircut_History_${monthYearTitle.replace(/\s/g, '_')}.xlsx"`,
			);
			setResponseHeaders(headers);

			// Return the buffer
			return new Response(excelBuffer, {
				headers: {
					'Content-Type':
						'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'Content-Disposition': `attachment; filename="Haircut_History_${monthYearTitle.replace(/\s/g, '_')}.xlsx"`,
				},
			});
		} catch (error) {
			console.error('Error exporting haircut history:', error);
			throw new Error('Gagal mengekspor data ke Excel');
		}
	});
