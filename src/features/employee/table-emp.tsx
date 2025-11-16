import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import type { ColumnDef } from '@tanstack/react-table';
import { Calendar, Text, UserRoundPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
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
	DialogFooter,
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
import {
	dateRange,
	includesTrimmed,
	useClientTable,
} from '@/hooks/use-client-table';
import { formatDateTime } from '@/lib/utils';
import {
	CreateEmployeeSc,
	createEmployee,
	deleteEmployee,
	UpdateEmployeeSc,
	updateEmployee,
} from '@/server-function/employee-fn';

function COLUMNS_EMPLOYEES(username: string): ColumnDef<Employee>[] {
	const baseColumns: ColumnDef<Employee>[] = [
		{
			id: 'select',
			header: ({ table }) => {
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

	if (username === 'admin') {
		baseColumns.push({
			id: 'actions',
			cell: ({ row, table }) => <DataTableRowActions table={table} row={row} />,
			minSize: 50,
			maxSize: 50,
			enableResizing: false,
			enableHiding: false,
		});
	}

	return baseColumns;
}

export function DataTableEmployee({
	data,
	username,
}: {
	data: Employee[];
	username: string;
}) {
	const [open, setOpen] = useState(false);
	const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
	const postEmployee = useServerFn(createEmployee);
	const deleteEmployeeFn = useServerFn(deleteEmployee);
	const updateEmployeeFn = useServerFn(updateEmployee);
	const queryClient = useQueryClient();

	const { mutateAsync: updateEmployeeAsync } = useMutation({
		mutationFn: updateEmployeeFn,
		onSuccess: () => {
			toast.success('Employee updated successfully');
			queryClient.invalidateQueries({ queryKey: ['employees'] });
		},
		onError: () => {
			toast.error('Failed to update employee');
		},
	});

	const { mutateAsync: deleteEmployeeAsync } = useMutation({
		mutationFn: deleteEmployeeFn,
		onSuccess: () => {
			toast.success('Employee deleted successfully');
			queryClient.invalidateQueries({ queryKey: ['employees'] });
		},
		onError: () => {
			toast.error('Failed to delete employee');
		},
	});

	const { mutateAsync } = useMutation({
		mutationFn: postEmployee,
		onSuccess: () => {
			toast.success('Employee created successfully');
			queryClient.invalidateQueries({ queryKey: ['employees'] });
		},
		onError: () => {
			toast.error('Failed to create employee');
		},
	});

	const form = useForm({
		defaultValues: {
			name: editEmployee?.name || '',
			position: editEmployee?.position || '',
		} as any,
		validators: {
			onSubmit: editEmployee
				? UpdateEmployeeSc.omit({ id: true })
				: CreateEmployeeSc,
		},
		onSubmit: async ({ value }) => {
			if (editEmployee) {
				toast.promise(
					updateEmployeeAsync({ data: { ...value, id: editEmployee.id } }),
					{
						loading: 'Updating employee...',
						error: 'Failed to update employee',
					},
				);
			} else {
				toast.promise(mutateAsync({ data: value }), {
					loading: 'Creating employee...',
					error: 'Failed to create employee',
				});
			}
			setOpen(false);
			setEditEmployee(null);
			form.reset();
		},
	});

	const columns = useMemo(() => {
		return COLUMNS_EMPLOYEES(username);
	}, [username]);

	const { table } = useClientTable({
		initialState: {
			columnPinning: {
				right:
					username === 'admin' ? ['barcodeUrl', 'actions'] : ['barcodeUrl'],
			},
		},
		defaultColumn: {
			minSize: 160,
		},
		data,
		columns,
		getRowId: (originalRow) => originalRow.id,
		enableRowSelection: (row) => !row.original.barcodeUrl,
		rowActions(payload) {
			if (payload.variant === 'edit') {
				setEditEmployee(payload.row.original);
				setOpen(true);
			} else if (payload.variant === 'delete') {
				deleteEmployeeAsync({ data: payload.row.original });
			}
		},
	});

	return (
		<div className="w-full">
			<DataTable className="min-h-[570px] py-3" table={table}>
				<DataTableToolbar table={table}>
					{username === 'admin' && (
						<Button
							onClick={() => setOpen(true)}
							variant="outline"
							size="sm"
							className="h-8"
						>
							Create New
							<UserRoundPlus className="ml-2 h-4 w-4" />
						</Button>
					)}
				</DataTableToolbar>
			</DataTable>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editEmployee ? 'Edit Employee' : 'Create New Employee'}
						</DialogTitle>
					</DialogHeader>
					<form
						id={`employee-form-${editEmployee?.id || 'new'}`}
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
					<DialogFooter>
						<Button type="button" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<form.Subscribe selector={(state) => state.isSubmitting}>
							{(isSubmitting) => (
								<Button
									type="submit"
									form={`employee-form-${editEmployee?.id || 'new'}`}
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Saving...' : 'Save'}
								</Button>
							)}
						</form.Subscribe>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
