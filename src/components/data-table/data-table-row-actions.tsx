import type { Row, Table } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
	table: Table<TData>;
}

export function DataTableRowActions<TData>({
	row,
	table,
}: DataTableRowActionsProps<TData>) {
	const tableMeta = table.options.meta;

	function rowActions({ action }: { action: 'edit' | 'delete' }) {
		if (!tableMeta?.rowActions)
			throw new Error('rowActions function is required');
		if (action === 'delete') {
			tableMeta.rowActions({ row, variant: 'delete' });
		}
		if (action === 'edit') {
			tableMeta.rowActions({ row, variant: 'edit' });
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="data-[state=open]:bg-muted size-8"
				>
					<MoreHorizontal />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem onClick={() => rowActions({ action: 'edit' })}>
					Edit
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					variant="destructive"
					onClick={() => rowActions({ action: 'delete' })}
				>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
