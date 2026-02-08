/** Cache key for getEmployees (single list) */
export const EMPLOYEES_CACHE_KEY = 'employees:list';

/**
 * Cache key for getHaircutHistory.
 * @param range - optional [startEpoch, endEpoch]; if missing or length < 2, returns 'all'
 */
export function getHaircutHistoryCacheKey(range: number[] | undefined): string {
	if (range && range.length >= 2) return `haircut-history:${range.join(',')}`;
	return 'haircut-history:all';
}
