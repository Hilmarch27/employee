import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/integrations/auth/auth-client';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/(app)/signin')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-full max-w-md">
				<LoginForm />
			</div>
		</div>
	);
}

const LoginSc = z.object({
	username: z.string().min(1),
	password: z.string().min(1),
});

type Login = z.infer<typeof LoginSc>;

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			username: '',
			password: '',
		} as Login,
		validators: {
			onSubmit: LoginSc,
		},
		onSubmit: async ({ value }) => {
			const { data, error } = await authClient.signIn.username({
				username: value.username,
				password: value.password,
			});
			if (error) {
				toast.error(error.message);
			}
			if (data) {
				toast.success('Login successful');
				navigate({ to: '/' });
				form.reset();
			}
		},
	});

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your account below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id={`login-form`}
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field name="username">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Username</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Enter username"
												autoComplete="off"
												autoFocus
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="password">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Enter password"
												autoComplete="off"
												type="password"
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
				<CardFooter>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<Button type="submit" form={`login-form`} disabled={isSubmitting}>
								{isSubmitting ? 'Logging in...' : 'Login'}
							</Button>
						)}
					</form.Subscribe>
				</CardFooter>
			</Card>
		</div>
	);
}
