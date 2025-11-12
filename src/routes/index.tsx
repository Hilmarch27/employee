import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import ScanDsb from '@/features/dashboard/scan-dsb';
import { DataTableHaircut } from '@/features/dashboard/table-dsb';
import { getHaircutHistory } from '@/server-function/barcode-fn';

export const Route = createFileRoute('/')({ component: App });

function App() {
	const getData = useServerFn(getHaircutHistory);

	const { data: history, isLoading } = useQuery({
		queryKey: ['haircut-history'],
		queryFn: () => getData(),
	});

	return (
		<div className="flex flex-col justify-between pe-5">
			<ScanDsb />
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<DataTableHaircut data={history?.data || []} />
			)}
		</div>
	);
}
