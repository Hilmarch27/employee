import '@tanstack/react-table';
import type { Row, RowData } from '@tanstack/react-table';
import type { DataTableConfig } from '@/components/data-table/data-table-config';

declare module '@tanstack/react-table' {
	// biome-ignore lint/correctness/noUnusedVariables: this is a valid use case
	interface ColumnMeta<TData extends RowData, TValue> {
		disabled?: boolean | ((row: Row<TData>) => boolean);
		variant?: FilterVariant;
		label?: string;
		placeholder?: string;
		options?: Array<Option>;
		icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	}

	interface TableMeta<TData extends RowData> {
		rowActions?: (payload: RowActionPayload<TData>) => void;
	}
}

export type RowActionPayload<TData extends RowData> = {
	row: Row<TData>;
	variant: ActionVariant;
};

export type Option = {
	label: string;
	value: string;
	count?: number;
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type FilterVariant = DataTableConfig['filterVariants'][number];
export type ActionVariant = DataTableConfig['actionVariants'][number];
