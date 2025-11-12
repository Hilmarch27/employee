import { createServerFn } from '@tanstack/react-start';
import { desc } from 'drizzle-orm';
import z from 'zod';
import { db } from '@/db';
import { employees } from '@/db/schema';

export const CreateEmployeeSc = z.object({
	name: z.string().min(1),
	position: z.string().min(1),
});

export type EmployeeInput = z.infer<typeof CreateEmployeeSc>;

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
			console.error('Error getting unique positions:', error);
			throw new Error('Failed to get positions');
		}
	},
);
