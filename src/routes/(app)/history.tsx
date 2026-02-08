import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { Loader2 } from 'lucide-react';
import { DataTableHaircut } from '@/features/history/table-dsb';
import { useSession } from '@/integrations/auth/auth-client';
import { authMiddleware } from '@/middleware/auth';
import { getHaircutHistory } from '@/server-function/barcode-fn';

export const Route = createFileRoute('/(app)/history')({
	component: RouteComponent,
	server: {
		middleware: [authMiddleware],
	},
});

function RouteComponent() {
	const getData = useServerFn(getHaircutHistory);
	const { data: history, isLoading } = useQuery({
		queryKey: ['haircut-history'],
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
		<DataTableHaircut
			username={session?.user.username || ''}
			data={history?.data || []}
		/>
	);
}
