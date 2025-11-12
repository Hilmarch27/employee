import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { DataTableEmployee } from '@/features/employee/data-table-emp';
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

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<DataTableEmployee data={data ?? []} />
	);
}
