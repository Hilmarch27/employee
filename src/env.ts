import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const envServer = createEnv({
	server: {
		DB_FILE_NAME: z.string().min(1),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

export const envClient = createEnv({
	clientPrefix: 'VITE_',
	client: {
		VITE_PUBLIC_URL: z.string(),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
