import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useRef } from 'react';
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
	const inputRef = useRef<HTMLInputElement>(null);

	const form = useForm({
		defaultValues: {
			id: '',
		},
		validators: {
			onSubmit: z.object({
				id: z.string().min(1, 'Scan ID tidak boleh kosong'),
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
			// Auto-focus kembali setelah scan berhasil
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		},
		onError: (error) => {
			toast.error(error.message);
			// Auto-focus kembali setelah error untuk retry cepat
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		},
	});

	// Auto-focus pada mount dan setiap kali komponen di-render
	useEffect(() => {
		inputRef.current?.focus();
	}, []);
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
											ref={inputRef}
											value={field.state.value}
											onChange={(e) => {
												field.handleChange(e.target.value);
											}}
											onKeyDown={(e) => {
												// Auto-submit ketika Enter ditekan (barcode scanner biasanya mengirim Enter)
												if (e.key === 'Enter' && field.state.value.trim()) {
													e.preventDefault();
													form.handleSubmit();
												}
											}}
											onBlur={() => {
												// Kembalikan focus jika kehilangan focus (kecuali user klik button)
												// Delay kecil untuk memastikan tidak konflik dengan klik button
												setTimeout(() => {
													if (document.activeElement?.tagName !== 'BUTTON') {
														inputRef.current?.focus();
													}
												}, 100);
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
