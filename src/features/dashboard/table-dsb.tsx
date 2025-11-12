import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import type { ColumnDef } from '@tanstack/react-table';
import { Briefcase, Calendar, FileSpreadsheet, Text } from 'lucide-react';
import { useMemo } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { Button } from '@/components/ui/button';
import type { ComboboxItem } from '@/components/ui/combobox';
import type { HaircutHistory } from '@/db/schema';
import {
	dateRange,
	includesTrimmed,
	useClientTable,
} from '@/hooks/use-client-table';
import { getPositions } from '@/server-function/employee-fn';

function COLUMNS_HAIRCUT_HISTORY(
	positionItems: ComboboxItem[],
): ColumnDef<HaircutHistory>[] {
	console.log(positionItems);
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
			meta: {
				label: 'Name',
				placeholder: 'Search Name...',
				variant: 'text',
				icon: Text,
			},
			filterFn: includesTrimmed,
			enableColumnFilter: true,
		},
		{
			id: 'position',
			accessorKey: 'position',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Position" />
			),
			cell: ({ row }) => <div>{row.getValue('position')}</div>,
			meta: {
				label: 'Position',
				placeholder: 'Search Position...',
				variant: 'combobox',
				options: positionItems,
				icon: Briefcase,
			},
			enableColumnFilter: true,
		},
		{
			accessorKey: 'badge',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Badge" />
			),
			cell: ({ row }) => <div>{row.getValue('badge')}</div>,
		},
		{
			id: 'haircutDate',
			accessorKey: 'haircutDate',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Tanggal" />
			),
			cell: ({ row }) => {
				const haircutDate = row.getValue('haircutDate');
				if (
					haircutDate instanceof Date &&
					!Number.isNaN(haircutDate.getTime())
				) {
					return (
						<div>
							{haircutDate.toLocaleDateString('id-ID', {
								weekday: 'long',
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
						</div>
					);
				}
				return <div>-</div>;
			},
			meta: {
				label: 'Haircut Date',
				placeholder: 'Search Haircut Date...',
				variant: 'dateRange',
				icon: Calendar,
			},
			filterFn: dateRange,
			enableColumnFilter: true,
			minSize: 200,
			maxSize: 200,
		},
		{
			accessorKey: 'formattedTime',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Waktu" />
			),
			cell: ({ row }) => <div>{row.getValue('formattedTime')}</div>,
		},
		{
			accessorKey: 'monthYear',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Bulan & Tahun" />
			),
			cell: ({ row }) => <div>{row.getValue('monthYear')}</div>,
		},
	];
}

export function DataTableHaircut({ data }: { data: HaircutHistory[] }) {
	const getData = useServerFn(getPositions);

	const { data: positions = [] } = useQuery({
		queryKey: ['positions'],
		queryFn: () => getData(),
		structuralSharing: true,
		staleTime: 5 * 60 * 1000,
	});

	const columns = useMemo(() => {
		return COLUMNS_HAIRCUT_HISTORY(positions || []);
	}, [positions]);

	const { table } = useClientTable({
		defaultColumn: {
			minSize: 160,
		},
		data,
		columns,
		getRowId: (originalRow) => originalRow.id,
	});

	return (
		<div className="w-full">
			<DataTable className="py-3 mt-10" table={table}>
				<DataTableToolbar table={table}>
					<Button variant="outline" size="sm" className="h-8">
						Export Excel
						<FileSpreadsheet className="ml-2 h-4 w-4" />
					</Button>
				</DataTableToolbar>
			</DataTable>
		</div>
	);
}
