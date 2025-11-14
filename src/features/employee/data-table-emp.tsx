import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import type { ColumnDef } from '@tanstack/react-table';
import { Calendar, Text, UserRoundPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
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
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { Employee } from '@/db/schema';
import { envClient } from '@/env';
import {
	dateRange,
	includesTrimmed,
	useClientTable,
} from '@/hooks/use-client-table';
import { formatDateTime } from '@/lib/utils';
import {
	CreateEmployeeSc,
	createEmployee,
	type EmployeeInput,
} from '@/server-function/employee-fn';

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
				<DataTableColumnHeader column={column} title="Instansi" />
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

				const fullUrl = `${barcodeUrl}`;

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
								src={`${barcodeUrl}`}
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
	const [open, setOpen] = useState(false);
	const postEmployee = useServerFn(createEmployee);

	const { mutateAsync } = useMutation({
		mutationFn: postEmployee,
		onSuccess: () => {
			toast.success('Employee created successfully');
			form.reset();
			setOpen(false);
		},
		onError: () => {
			toast.error('Failed to create employee');
		},
	});

	const form = useForm({
		defaultValues: {
			name: '',
			position: '',
		} as EmployeeInput,
		validators: {
			onBlur: CreateEmployeeSc,
		},
		onSubmit: async ({ value }) => {
			toast.promise(mutateAsync({ data: value }), {
				loading: 'Creating employee...',
				success: 'Employee created successfully',
				error: 'Failed to create employee',
			});
		},
	});

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
					<Button
						onClick={() => setOpen(true)}
						variant="outline"
						size="sm"
						className="h-8"
					>
						Create New
						<UserRoundPlus className="ml-2 h-4 w-4" />
					</Button>
				</DataTableToolbar>
			</DataTable>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Employee</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field name="name">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Name</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Enter name"
												autoComplete="off"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="position">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Instansi</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Enter position"
												autoComplete="off"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
						</FieldGroup>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
