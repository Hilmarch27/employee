import { LRUCache } from 'lru-cache';

const MAX_ITEMS = 5000;

/** Cache for getEmployees. No TTL – invalidate only on mutation (insert/delete). */
export const employeesCache = new LRUCache<string, object>({
	max: MAX_ITEMS,
});

/** Cache for getHaircutHistory. No TTL – invalidate only on mutation (insert/delete). */
export const haircutHistoryCache = new LRUCache<string, object>({
	max: MAX_ITEMS,
});

export function invalidateEmployeesCache(): void {
	employeesCache.clear();
}

export function invalidateHaircutHistoryCache(): void {
	haircutHistoryCache.clear();
}
