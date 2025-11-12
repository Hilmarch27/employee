import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Combobox, { ComboboxItem } from '@/components/ui/combobox';
import { CommandItem } from '@/components/ui/command';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { getPositions } from '@/server-function/employee-fn';

export const Route = createFileRoute('/(app)/barcode')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<BarcodeForm />
		</div>
	);
}

const CreateBarcodeSc = z.object({
	position: z.string().min(1),
	employeeIds: z.array(z.string().min(1)),
});

type CreateBarcodeType = z.infer<typeof CreateBarcodeSc>;

function BarcodeForm() {
	const getData = useServerFn(getPositions);

	const { data: positions = [] } = useQuery({
		queryKey: ['positions'],
		queryFn: () => getData(),
	});

	const positionItems: ComboboxItem[] = positions.map((position) => ({
		value: position,
		label: position,
	}));

	const form = useForm({
		defaultValues: {
			position: '',
			employeeIds: [],
		} as CreateBarcodeType,
		validators: {
			onBlur: CreateBarcodeSc,
		},
		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Barcode Form</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-3 gap-1">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field name="position">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Position</FieldLabel>
										<Combobox
											items={positionItems}
											value={field.state.value}
											onValueChange={(value) => {
												field.handleChange(value);
											}}
											placeholder="Pilih posisi..."
											searchPlaceholder="Cari posisi..."
											emptyText="Posisi tidak ditemukan."
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
			</CardContent>
		</Card>
	);
}
