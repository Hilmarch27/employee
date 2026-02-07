import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import type { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableSticky } from '@/components/data-table/data-table-sticky';
import type { HaircutHistory } from '@/db/schema';
import { useClientTable } from '@/hooks/use-client-table';
import { getPreviewHaircut } from '@/server-function/barcode-fn';

function COLUMNS_PREVIEW_HAIRCUT(): ColumnDef<HaircutHistory>[] {
	return [
		{
			id: 'no',
			accessorKey: 'no',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="No" />
			),
			cell: ({ row }) => <div>{row.index + 1}</div>,
			minSize: 40,
			maxSize: 40,
			enableSorting: false,
			enablePinning: false,
			enableHiding: false,
		},
		{
			id: 'name',
			accessorKey: 'name',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			cell: ({ row }) => <div>{row.getValue('name')}</div>,
		},
		{
			id: 'position',
			accessorKey: 'position',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Instansi" />
			),
			cell: ({ row }) => <div>{row.getValue('position')}</div>,
			minSize: 250,
			maxSize: 250,
		},
		{
			accessorKey: 'badge',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Badge" />
			),
			cell: ({ row }) => <div>{row.getValue('badge')}</div>,
			minSize: 250,
			maxSize: 250,
		},
		{
			id: 'haircutDate',
			accessorKey: 'haircutDate',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Date" />
			),
			cell: ({ row }) => {
				const value = row.getValue<number>('haircutDate');

				if (!value) return <div>-</div>;

				const date = new Date(value * 1000); // unix → ms

				return (
					<div>
						{date.toLocaleDateString('id-ID', {
							timeZone: 'Asia/Jakarta',
							weekday: 'long',
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</div>
				);
			},
			minSize: 200,
			maxSize: 200,
		},
		{
			accessorKey: 'formattedTime',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Time" />
			),
			cell: ({ row }) => <div>{row.getValue('formattedTime')}</div>,
		},
	];
}

export default function PreviewDsb() {
	const getData = useServerFn(getPreviewHaircut);
	const { data: preview, isLoading } = useQuery({
		queryKey: ['preview-haircut'],
		queryFn: () => getData(),
	});

	const columns = useMemo(() => {
		return COLUMNS_PREVIEW_HAIRCUT();
	}, []);

	const { table } = useClientTable({
		enableColumnPinning: false,
		enableSorting: false,
		enableColumnResizing: false,
		enableHiding: false,
		defaultColumn: {
			minSize: 160,
		},
		data: preview?.data || [],
		columns,
		getRowId: (originalRow) => originalRow.id,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 9999,
			},
		},
	});

	// Update pageSize to show all data when data is loaded
	useEffect(() => {
		if (preview?.data && preview.data.length > 0) {
			table.setPageSize(preview.data.length);
		}
	}, [preview?.data, table]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-muted-foreground">Loading preview...</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			<DataTableSticky className="py-3" table={table} showPagination={false} />
		</div>
	);
}
