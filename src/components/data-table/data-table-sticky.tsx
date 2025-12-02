import type {
	Header,
	Row,
	Table as TanstackTable,
} from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import React from 'react';
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { DataTablePagination } from './data-table-pagination';

export interface DataTableStickyProps<TData>
	extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * The table instance returned from useServerTable hook with pagination, sorting, filtering, etc.
	 * @type TanstackTable<TData>
	 */
	table: TanstackTable<TData>;
	/**
	 * Callback for handling row clicks.
	 * @param row - The row data that was clicked.
	 */
	onRowClick?: (row: TData) => void;

	/**
	 * Function to render a sub-component for expandable rows.
	 * @param props - The row properties.
	 * @returns A React element.
	 */
	renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;

	/**
	 * Whether to show pagination controls.
	 * @default true
	 */
	showPagination?: boolean;
}

export function DataTableSticky<TData>({
	table,
	onRowClick,
	renderSubComponent,
	showPagination = true,
	children,
	className,
	...props
}: DataTableStickyProps<TData>) {
	// Helper function to get column width and sticky styles
	const getColumnStyles = (header: Header<TData, unknown>): CSSProperties => {
		return {
			width: header.getSize() !== 150 ? header.getSize() : undefined,
			position: 'sticky',
			top: 0,
			zIndex: 10,
		};
	};

	return (
		<div className={cn('w-full space-y-2.5', className)} {...props}>
			{children}
			<div className="rounded-md border max-h-[300px] overflow-hidden">
				<div className="overflow-y-auto max-h-[300px]">
					<table className="[&_td]:border-border [&_th]:border-border w-full table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="bg-muted/50">
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className="h-10 truncate bg-muted/95 backdrop-blur-sm first:rounded-tl-md last:rounded-tr-md"
											style={{ ...getColumnStyles(header) }}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => (
									<React.Fragment key={`fragment-${row.id}`}>
										<TableRow
											className={onRowClick ? 'cursor-pointer' : ''}
											onClick={() => onRowClick?.(row.original)}
											data-state={row.getIsSelected() && 'selected'}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell
													key={cell.id}
													className="truncate"
													style={{
														width:
															cell.column.getSize() !== 150
																? cell.column.getSize()
																: undefined,
													}}
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
										{row.getIsExpanded() && renderSubComponent && (
											<TableRow>
												<TableCell colSpan={row.getVisibleCells().length}>
													{renderSubComponent({ row })}
												</TableCell>
											</TableRow>
										)}
									</React.Fragment>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={table.getAllColumns().length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</table>
				</div>
			</div>
			{showPagination && <DataTablePagination table={table} />}
		</div>
	);
}
