import { type ClassValue, clsx } from 'clsx';
import { and, type SQL } from 'drizzle-orm';
import type { SQLiteSelect } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const genId = () => nanoid(7);

export function generateBadgeNumber(
	position: string,
	sequence: number,
): string {
	const positionCode = position.toUpperCase().replace(/\s+/g, '');
	const sequenceFormatted = sequence.toString().padStart(3, '0');
	return `${positionCode}-${sequenceFormatted}`;
}

export async function withPagging<T extends SQLiteSelect>(
	qb: T,
	{
		page = 1,
		perPage = 10,
		filters = [],
		orderBy = [],
	}: {
		page?: number;
		perPage?: number;
		filters?: SQL[];
		orderBy?: SQL[];
	},
) {
	let query = qb;

	if (filters.length > 0) {
		query = query.where(and(...filters));
	}

	if (orderBy.length > 0) {
		query = query.orderBy(...orderBy);
	}

	return query.limit(perPage).offset((page - 1) * perPage);
}

export function formatDate(
	date: Date | string | number | undefined,
	opts: Intl.DateTimeFormatOptions = {},
) {
	if (!date) return '';

	try {
		return new Intl.DateTimeFormat('en-US', {
			month: opts.month ?? 'long',
			day: opts.day ?? 'numeric',
			year: opts.year ?? 'numeric',
			...opts,
		}).format(new Date(date));
	} catch (_err) {
		return '';
	}
}

export const formatDateTime = (date: Date) => {
	return date.toLocaleDateString('id-ID', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};
