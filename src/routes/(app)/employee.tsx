import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { Loader2 } from 'lucide-react';
import { DataTableEmployee } from '@/features/employee/table-emp';
import { useSession } from '@/integrations/auth/auth-client';
import { authMiddleware } from '@/middleware/auth';
import { getEmployees } from '@/server-function/employee-fn';

export const Route = createFileRoute('/(app)/employee')({
	component: RouteComponent,
	server: {
		middleware: [authMiddleware],
	},
});

function RouteComponent() {
	const getData = useServerFn(getEmployees);
	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: () => getData(),
		staleTime: Infinity,
		gcTime: Infinity,
	});

	const { data: session, isPending } = useSession();
	if (isPending) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader2 className="size-10 animate-spin" />
			</div>
		);
	}

	return isLoading ? (
		<div className="flex items-center justify-center h-screen">
			<Loader2 className="size-10 animate-spin" />
		</div>
	) : (
		<DataTableEmployee
			username={session?.user.username || ''}
			data={data ?? []}
		/>
	);
}
