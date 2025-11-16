import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@/integrations/auth/auth-config';

export const Route = createFileRoute('/api/auth/$')({
	server: {
		handlers: {
			GET: ({ request }) => {
				return auth.handler(request);
			},
			POST: ({ request }) => {
				return auth.handler(request);
			},
		},
	},
});
