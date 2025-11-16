import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import type { Column, Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter';
import { Button } from '@/components/ui/button';
import Combobox from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import type { Employee, HaircutHistory, User } from '@/db/schema';
import { cn } from '@/lib/utils';
import { createBarcode } from '@/server-function/barcode-fn';
import { getPositions } from '@/server-function/employee-fn';
import { DataTableDateFilter } from './data-table-date-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData>
	extends React.HTMLAttributes<HTMLDivElement> {
	table: Table<TData>;
}
export function DataTableToolbar<
	TData extends Employee | HaircutHistory | User,
>({ table, children, className, ...props }: DataTableToolbarProps<TData>) {
	const postBarcode = useServerFn(createBarcode);
	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationFn: postBarcode,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] });
			toast.success('Barcode created successfully');
			table.resetRowSelection();
		},
		onError: () => {
			toast.error('Failed to create barcode');
		},
	});

	const isFiltered = table.getState().columnFilters.length > 0;

	const selectedRows = table.getSelectedRowModel().rows;

	const columns = React.useMemo(
		() => table.getAllColumns().filter((column) => column.getCanFilter()),
		[table],
	);

	const onReset = React.useCallback(() => {
		table.resetColumnFilters();
	}, [table]);

	const handleCreateBarcode = () => {
		if (selectedRows.length === 0) {
			toast.error('Please select at least one employee');
			return;
		}

		const items = selectedRows.map((row) => ({
			id: row.original.id,
			name: row.original.name,
		}));

		// Gunakan mutateAsync yang return Promise
		toast.promise(mutateAsync({ data: { items } }), {
			loading: `Creating ${items.length} barcode(s)...`,
			success: (data) => `${data.count} barcode(s) created!`,
			error: 'Failed to create barcodes',
		});
	};

	return (
		<div
			className={cn(
				'flex w-full items-center justify-between gap-2 overflow-auto p-1 ',
				className,
			)}
			{...props}
		>
			<div className="flex flex-1 items-center space-x-2">
				<div className="flex flex-1 flex-wrap items-center gap-2">
					{columns.map((column) => (
						<DataTableToolbarFilter key={column.id} column={column} />
					))}
					{isFiltered && (
						<Button
							aria-label="Reset filters"
							variant="outline"
							size="sm"
							className="border-dashed"
							onClick={onReset}
						>
							<X />
							Reset
						</Button>
					)}
				</div>
				{selectedRows.length > 0 && (
					<Button size={'sm'} onClick={handleCreateBarcode}>
						{`Create Barcode ${selectedRows.length} Selected`}
					</Button>
				)}
			</div>
			<div className="flex items-center space-x-2">
				{children}
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}

interface DataTableToolbarFilterProps<TData> {
	column: Column<TData>;
}

function DataTableToolbarFilter<TData>({
	column,
}: DataTableToolbarFilterProps<TData>) {
	const getData = useServerFn(getPositions);
	const { data: positions } = useQuery({
		queryKey: ['positions'],
		queryFn: () => getData(),
		staleTime: 5 * 60 * 1000,
	});

	{
		const columnMeta = column.columnDef.meta;
		const onFilterRender = React.useCallback(() => {
			if (!columnMeta?.variant) return null;

			switch (columnMeta.variant) {
				case 'text':
					return (
						<Input
							placeholder={columnMeta.placeholder ?? columnMeta.label}
							value={(column.getFilterValue() as string) || ''}
							onChange={(event) => column.setFilterValue(event.target.value)}
							className="h-8 w-40 lg:w-56"
						/>
					);
				case 'combobox':
					return (
						<Combobox
							items={positions || []}
							value={(column.getFilterValue() as string) || ''}
							onValueChange={(value) => column.setFilterValue(value)}
							placeholder={columnMeta.placeholder ?? columnMeta.label}
							className="h-8 w-40 lg:w-56"
						/>
					);

				case 'date':
				case 'dateRange':
					return (
						<DataTableDateFilter
							column={column}
							title={columnMeta.label ?? column.id}
							multiple={columnMeta.variant === 'dateRange'}
						/>
					);

				case 'select':
				case 'multiSelect':
					return (
						<DataTableFacetedFilter
							column={column}
							title={columnMeta.label ?? column.id}
							options={columnMeta.options ?? []}
							multiple={columnMeta.variant === 'multiSelect'}
						/>
					);

				default:
					return null;
			}
		}, [column, columnMeta, positions]);

		return onFilterRender();
	}
}
