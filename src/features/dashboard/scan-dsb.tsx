import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { scanBarcode } from '@/server-function/barcode-fn';

export default function ScanDsb() {
	const scanBarcodeFn = useServerFn(scanBarcode);
	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			id: '',
		},
		validators: {
			onSubmit: z.object({
				id: z.string().min(1),
			}),
		},
		onSubmit: async ({ value }) => {
			toast.promise(mutateAsync({ data: value }), {
				loading: 'Scanning...',
			});
		},
	});

	const { mutateAsync } = useMutation({
		mutationFn: scanBarcodeFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['haircut-history'] });
			toast.success(data.message);
			form.reset();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle>Scan Barcode</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="flex gap-2 items-center w-full"
				>
					<div className="flex-1">
						<form.Field name="id">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Instansi</FieldLabel>
										<Input
											value={field.state.value}
											onChange={(e) => {
												field.handleChange(e.target.value);
											}}
											autoFocus
											placeholder="Scan ID Barcode..."
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>
					</div>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<Button type="submit" disabled={isSubmitting} className="mt-7.5">
								{isSubmitting ? 'Scanning...' : 'Scan'}
							</Button>
						)}
					</form.Subscribe>
				</form>
			</CardContent>
		</Card>
	);
}
