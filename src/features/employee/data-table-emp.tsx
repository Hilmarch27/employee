import type { ColumnDef } from '@tanstack/react-table';
import { Calendar, Text, UserRoundPlus } from 'lucide-react';
import { useMemo } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Employee } from '@/db/schema';
import { envClient } from '@/env';
import {
	dateRange,
	includesTrimmed,
	useClientTable,
} from '@/hooks/use-client-table';
import { formatDateTime } from '@/lib/utils';

function COLUMNS_EMPLOYEES(): ColumnDef<Employee>[] {
	return [
		{
			id: 'select',
			header: ({ table }) => {
				const hasAnyWithoutBarcode = table
					.getCoreRowModel()
					.rows.some((r) => !r.original.barcodeUrl);

				if (!hasAnyWithoutBarcode) return null;

				return (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && 'indeterminate')
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label="Select all"
						className="translate-y-[2px] mb-2"
					/>
				);
			},
			cell: ({ row }) => {
				const hasBarcode = !!row.original.barcodeUrl;
				if (hasBarcode) return null;

				return (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label="Select row"
						className="translate-y-[2px] mb-2"
					/>
				);
			},
			minSize: 30,
			maxSize: 30,
			enableResizing: false,
			enablePinning: false,
			enableSorting: false,
			enableHiding: false,
		},
		{
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
			accessorKey: 'position',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Position" />
			),
			cell: ({ row }) => <div>{row.getValue('position')}</div>,
		},
		{
			accessorKey: 'badge',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Badge" />
			),
			cell: ({ row }) => <div>{row.getValue('badge')}</div>,
		},
		{
			id: 'barcodeUrl',
			accessorKey: 'barcodeUrl',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Barcode" />
			),
			cell: ({ row }) => {
				const barcodeUrl = row.getValue('barcodeUrl');
				if (!barcodeUrl) return null;

				const fullUrl = `${envClient.VITE_PUBLIC_URL}${barcodeUrl}`;

				const handleDownload = () => {
					const link = document.createElement('a');
					link.href = fullUrl;
					const fileName =
						typeof barcodeUrl === 'string' && barcodeUrl.split
							? barcodeUrl.split('/').pop() || 'barcode.png'
							: 'barcode.png';
					link.download = fileName;
					link.click();
				};

				const handlePrint = () => {
					const printWindow = window.open('', '_blank');
					if (!printWindow) return;
					printWindow.document.write(`
					<html>
						<head><title>Print Barcode</title></head>
						<body style="text-align:center;">
						<img src="${fullUrl}" style="width:600px;height:700px;" />
						<script>window.print(); window.close();</script>
						</body>
					</html>`);
					printWindow.document.close();
				};

				return (
					<AlertDialog>
						<AlertDialogTrigger
							asChild
							className="flex items-center justify-center cursor-pointer"
							title="Click to view barcode"
						>
							<img
								src={`${envClient.VITE_PUBLIC_URL}${barcodeUrl}`}
								alt="Barcode"
								width={100}
								height={100}
								className="w-10 h-10 object-cover"
							/>
						</AlertDialogTrigger>
						<AlertDialogContent className="w-fit h-fit">
							<AlertDialogHeader>
								<AlertDialogTitle>Print Barcode</AlertDialogTitle>
							</AlertDialogHeader>
							<div className="flex items-center justify-center">
								<img
									src={fullUrl}
									alt="Barcode"
									width={200}
									height={200}
									className="w-[200px] h-[200px]r"
								/>
							</div>
							<AlertDialogFooter>
								<AlertDialogAction onClick={handleDownload}>
									Download
								</AlertDialogAction>
								<AlertDialogAction onClick={handlePrint}>
									Print
								</AlertDialogAction>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				);
			},
			minSize: 100,
			maxSize: 100,
		},
		{
			id: 'createdAt',
			accessorKey: 'createdAt',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Created At" />
			),
			cell: ({ row }) => <div>{formatDateTime(row.getValue('createdAt'))}</div>,
			meta: {
				label: 'Created At',
				placeholder: 'Search Created At...',
				variant: 'dateRange',
				icon: Calendar,
			},
			filterFn: dateRange,
			enableColumnFilter: true,
		},
	];
}

export function DataTableEmployee({ data }: { data: Employee[] }) {
	const columns = useMemo(() => {
		return COLUMNS_EMPLOYEES();
	}, []);

	const { table } = useClientTable({
		initialState: {
			columnPinning: {
				right: ['barcodeUrl'],
			},
		},
		defaultColumn: {
			minSize: 160,
		},
		data,
		columns,
		getRowId: (originalRow) => originalRow.id,
		enableRowSelection: (row) => !row.original.barcodeUrl,
	});

	return (
		<div className="w-full">
			<DataTable className="min-h-[570px] py-3" table={table}>
				<DataTableToolbar table={table}>
					<Button variant="outline" size="sm" className="h-8">
						Create New
						<UserRoundPlus className="ml-2 h-4 w-4" />
					</Button>
				</DataTableToolbar>
			</DataTable>
		</div>
	);
}
