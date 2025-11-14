import { createFileRoute } from '@tanstack/react-router';
import { createRouteHandler } from 'uploadthing/server';
import { uploadRouter } from '@/integrations/uploadthing/config';

const handler = createRouteHandler({ router: uploadRouter });

export const Route = createFileRoute('/api/uploadthing')({
	server: {
		handlers: {
			GET: handler,
			POST: handler,
		},
	},
});
