import { createFileRoute } from '@tanstack/react-router';
import PreviewDsb from '@/features/dashboard/preview-dsb';
import ScanDsb from '@/features/dashboard/scan-dsb';
import { authMiddleware } from '@/middleware/auth';

export const Route = createFileRoute('/')({
	component: App,
	server: {
		middleware: [authMiddleware],
	},
});

function App() {
	return (
		<div className="flex flex-col justify-between pe-4">
			<ScanDsb />
			<PreviewDsb />
		</div>
	);
}
