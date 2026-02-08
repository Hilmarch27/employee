/** biome-ignore-all lint/suspicious/noExplicitAny: off */
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import type { ColumnDef } from '@tanstack/react-table';
import { Calendar, QrCode, Text, UserRoundPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
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
import BarcodeEmployee from '@/features/employee/barcode';
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

function BarcodeCell({ name, id }: { name: string; id: string }) {
	const [open, setOpen] = useState(false);
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					title="View / Download / Print barcode"
				>
					<QrCode className="h-4 w-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="p-4 w-[330px] h-[350px] flex flex-col items-center justify-center overflow-auto box-border">
				<div className="flex-1 flex items-center justify-center min-h-0 py-10">
					<BarcodeEmployee name={name} id={id} onClose={() => setOpen(false)} />
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function COLUMNS_EMPLOYEES(username: string): ColumnDef<Employee>[] {
	const baseColumns: ColumnDef<Employee>[] = [
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
		// Add barcode (auto-generated) and actions columns at the end (rightmost)
		baseColumns.push(
			{
				id: 'barcodeUrl',
				accessorKey: 'id',
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Barcode" />
				),
				cell: ({ row }) => (
					<BarcodeCell name={row.original.name} id={row.original.id} />
				),
				minSize: 60,
				maxSize: 80,
			},
			{
				id: 'actions',
				cell: ({ row, table }) => (
					<DataTableRowActions table={table} row={row} />
				),
				minSize: 50,
				maxSize: 50,
				enableResizing: false,
				enableHiding: false,
			},
		);
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
