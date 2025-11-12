import { Breadcrumbs } from "@/components/layout/bread-crumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
	return (
		<header className="flex h-16 shrink-0 items-center justify-between gap-2">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4 bg-foreground"
				/>
				<Breadcrumbs />
			</div>
			{/* <div className="flex items-center gap-4 px-4">
			</div> */}
		</header>
	);
}
