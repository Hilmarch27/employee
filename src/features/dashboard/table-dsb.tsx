import { useMutation } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import type { ColumnDef } from '@tanstack/react-table';
import { Briefcase, Calendar, FileSpreadsheet, Text } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { Button } from '@/components/ui/button';
import type { HaircutHistory } from '@/db/schema';
import {
	dateRange,
	includesTrimmed,
	useClientTable,
} from '@/hooks/use-client-table';
import { exportHaircutHistoryExcel } from '@/server-function/employee-fn';

function COLUMNS_HAIRCUT_HISTORY(): ColumnDef<HaircutHistory>[] {
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
				<DataTableColumnHeader column={column} title="Instansi" />
			),
			cell: ({ row }) => <div>{row.getValue('position')}</div>,
			meta: {
				label: 'Instansi',
				placeholder: 'Search instansi...',
				variant: 'combobox',
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
				<DataTableColumnHeader column={column} title="Date" />
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
				<DataTableColumnHeader column={column} title="Time" />
			),
			cell: ({ row }) => <div>{row.getValue('formattedTime')}</div>,
		},
		{
			accessorKey: 'monthYear',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Month & Year" />
			),
			cell: ({ row }) => <div>{row.getValue('monthYear')}</div>,
		},
	];
}

export function DataTableHaircut({ data }: { data: HaircutHistory[] }) {
	const exportExcelFn = useServerFn(exportHaircutHistoryExcel);

	const { mutateAsync } = useMutation({
		mutationFn: async () => {
			const response = await exportExcelFn({});
			const blob = await response.blob();
			return blob;
		},
		onSuccess: (blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `haircut-history-${new Date().toISOString()}.xlsx`;
			a.click();
			window.URL.revokeObjectURL(url);
		},
	});

	const handleExportExcel = () => {
		toast.promise(mutateAsync(), {
			loading: 'Exporting Excel...',
			success: 'Excel exported successfully',
			error: 'Failed to export Excel',
		});
	};

	const columns = useMemo(() => {
		return COLUMNS_HAIRCUT_HISTORY();
	}, []);

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
					<Button
						variant="outline"
						size="sm"
						className="h-8"
						onClick={handleExportExcel}
					>
						Export Excel
						<FileSpreadsheet className="ml-2 h-4 w-4" />
					</Button>
				</DataTableToolbar>
			</DataTable>
		</div>
	);
}
