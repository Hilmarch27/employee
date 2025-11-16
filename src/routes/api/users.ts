import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import z from 'zod';
import { auth } from '@/integrations/auth/auth-config';

const createUserSc = z.object({
	username: z.string().min(1),
	password: z.string().min(1),
	email: z.email().min(1),
	name: z.string().min(1),
});

export const Route = createFileRoute('/api/users')({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = await request.json();
					const data = createUserSc.parse(body);

					const newUser = await auth.api.signUpEmail({
						body: {
							email: data.email,
							name: data.name,
							password: data.password,
							username: data.username,
						},
					});
					return json(newUser);
				} catch (error) {
					console.error(error);
					throw new Error('Internal Server Error');
				}
			},
		},
	},
});
