import type {
	ColumnDef,
	ColumnFiltersState,
	ExpandedState,
	Row,
	SortingState,
	TableOptions,
	TableState,
	VisibilityState,
} from '@tanstack/react-table';
import {
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import type { RowActionPayload } from '@/components/data-table/data-table-types';

interface ClientTableProps<TData>
	extends Omit<
		TableOptions<TData>,
		'getCoreRowModel' | 'manualFiltering' | 'manualPagination' | 'manualSorting'
	> {
	columns: Array<ColumnDef<TData>>;
	data: Array<TData>;
	getRowCanExpand?: (row: Row<TData>) => boolean;
	rowActions?: (payload: RowActionPayload<TData>) => void;
	initialState?: Partial<TableState>;
}

export function useClientTable<TData>(props: ClientTableProps<TData>) {
	const {
		columns,
		data,
		initialState,
		getRowCanExpand,
		rowActions,
		...tableProps
	} = props;

	// * state for cleint table
	const [rowSelection, setRowSelection] = useState(
		initialState?.rowSelection ?? {},
	);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		initialState?.columnVisibility ?? {},
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
		initialState?.columnFilters ?? [],
	);
	const [sorting, setSorting] = useState<SortingState>(
		initialState?.sorting ?? [],
	);
	const [expanded, setExpanded] = useState<ExpandedState>(
		initialState?.expanded ?? {},
	);

	// * row actions
	function handleRowActions(payload: RowActionPayload<TData>) {
		if (!rowActions) throw new Error('rowActions function is required');
		rowActions(payload);
	}

	const table = useReactTable({
		...tableProps,
		initialState,
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			expanded,
		},
		defaultColumn: {
			...tableProps.defaultColumn,
			enableColumnFilter: false,
		},
		columnResizeMode: 'onChange',
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onExpandedChange: setExpanded,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand,
		meta: {
			rowActions: handleRowActions,
		},
	});

	return { table };
}

// Fungsi filter rentang tanggal
function normalizeStartOfDay(time: number) {
	const d = new Date(time);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
}

function normalizeEndOfDay(time: number) {
	const d = new Date(time);
	d.setHours(23, 59, 59, 999);
	return d.getTime();
}

export function dateRange<TData>(
	row: Row<TData>,
	columnId: string,
	value: [number | undefined, number | undefined],
) {
	const rowTime = new Date(row.getValue(columnId)).getTime();

	const [startRaw, endRaw] = Array.isArray(value)
		? value
		: [undefined, undefined];

	const startTime =
		typeof startRaw === 'number' ? normalizeStartOfDay(startRaw) : undefined;
	const endTime =
		typeof endRaw === 'number' ? normalizeEndOfDay(endRaw) : undefined;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if ((startTime || endTime) && rowTime === undefined) return false;

	if (startTime !== undefined && endTime === undefined) {
		return rowTime! >= startTime;
	}

	if (startTime === undefined && endTime !== undefined) {
		return rowTime! <= endTime;
	}

	if (startTime !== undefined && endTime !== undefined) {
		return rowTime! >= startTime && rowTime! <= endTime;
	}

	return true;
}

export function includesTrimmed<TData>(
	row: Row<TData>,
	columnId: string,
	filterValue: string,
) {
	const cellValue = String(row.getValue(columnId) ?? '')
		.trim()
		.toLowerCase();
	const inputValue = filterValue.trim().toLowerCase();
	return cellValue.includes(inputValue);
}
