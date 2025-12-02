import { createFileRoute, Navigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import PreviewDsb from '@/features/dashboard/preview-dsb';
import ScanDsb from '@/features/dashboard/scan-dsb';
import { useSession } from '@/integrations/auth/auth-client';

export const Route = createFileRoute('/')({ component: App });

function App() {
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
		<div className="flex flex-col justify-between pe-4">
			<ScanDsb />
			<PreviewDsb />
		</div>
	);
}
