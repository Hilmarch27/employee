import { createServerFn } from '@tanstack/react-start';
import { desc, eq } from 'drizzle-orm';
import z from 'zod';
import { db } from '@/db';
import { employees } from '@/db/schema';
import { generateBadgeNumber } from '@/lib/utils';

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
