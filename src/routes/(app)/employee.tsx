import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { Loader2 } from 'lucide-react';
import { DataTableEmployee } from '@/features/employee/table-emp';
import { useSession } from '@/integrations/auth/auth-client';
import { getEmployees } from '@/server-function/employee-fn';

export const Route = createFileRoute('/(app)/employee')({
	component: RouteComponent,
});

function RouteComponent() {
	const getData = useServerFn(getEmployees);
	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: () => getData(),
	});

	const { data: session, isPending } = useSession();
	if (isPending) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader2 className="size-10 animate-spin" />
			</div>
		);
	}

	return !session ? (
		<Navigate to="/signin" />
	) : isLoading ? (
		<div className="flex items-center justify-center h-screen">
			<Loader2 className="size-10 animate-spin" />
		</div>
	) : (
		<DataTableEmployee username={session?.user.username || ''} data={data ?? []} />
	);
}
