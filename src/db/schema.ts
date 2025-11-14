import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { genId } from '@/lib/utils';

export const employees = sqliteTable('employees', {
	id: text('id').primaryKey().$defaultFn(genId),
	name: text('name').notNull(),
	position: text('position').notNull(),
	badge: text('badge').notNull(),
	barcodeUrl: text('barcode_url').unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`(unixepoch())`,
	),
});

export type Employee = typeof employees.$inferSelect;

export const haircutHistory = sqliteTable('haircut_history', {
	id: text('id').primaryKey().$defaultFn(genId),
	employeeId: text('employee_id').references(() => employees.id),
	haircutDate: integer('haircut_date', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`(unixepoch())`,
	),
});

export type HaircutHistory = {
	id: string;
	employeeId: string | null;
	name: string;
	badge: string;
	position: string;
	haircutDate: Date;
	formattedTime: string;
	monthYear: string;
	createdAt: Date | null;
};
