import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { Loader2 } from 'lucide-react';
import ScanDsb from '@/features/dashboard/scan-dsb';
import { DataTableHaircut } from '@/features/dashboard/table-dsb';
import { useSession } from '@/integrations/auth/auth-client';
import { getHaircutHistory } from '@/server-function/barcode-fn';

export const Route = createFileRoute('/')({ component: App });

function App() {
	const getData = useServerFn(getHaircutHistory);
	const { data: history, isLoading } = useQuery({
		queryKey: ['haircut-history'],
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
	) : (
		<div className="flex flex-col justify-between pe-5">
			<ScanDsb />
			{isLoading ? (
				<div className="flex items-center justify-center h-screen">
					<Loader2 className="size-10 animate-spin" />
				</div>
			) : (
				<DataTableHaircut
					username={session?.user.username || ''}
					data={history?.data || []}
				/>
			)}
		</div>
	);
}
