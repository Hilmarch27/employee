import { usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	plugins: [usernameClient()],
});
export type AuthClient = ReturnType<typeof createAuthClient>;
export const useSession = authClient.useSession;
