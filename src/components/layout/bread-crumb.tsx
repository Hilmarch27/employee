import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbConfig {
	[key: string]: string;
}

const customTitles: BreadcrumbConfig = {
	users: "Manage Users",
	user: "User",
};

export function Breadcrumbs() {
	const pathname = useLocation({
		select: (location) => location.pathname,
	});

	// Split path and filter empty strings
	const segments = pathname.split("/").filter(Boolean);

	// Generate breadcrumb items
	const breadcrumbs = segments.map((segment, index) => {
		const href = `/${segments.slice(0, index + 1).join("/")}`;

		// Get custom title or format segment as title
		const title = customTitles[segment] || formatTitle(segment);

		return { href, title, segment };
	});

	// Format segment to title (e.g., "users" -> "Users", "user-profile" -> "User Profile")
	function formatTitle(segment: string): string {
		return segment
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	}

	return (
		<nav className="flex items-center gap-2 text-sm text-muted-foreground">
			<Link to="/" className="hover:text-foreground transition-colors">
				Dashboard
			</Link>

			{breadcrumbs.map((crumb, index) => (
				<div key={crumb.href} className="flex items-center gap-2">
					<ChevronRight className="w-4 h-4" />
					{index === breadcrumbs.length - 1 ? (
						<span className="text-foreground font-medium">{crumb.title}</span>
					) : (
						<Link
							to={crumb.href}
							className="hover:text-foreground transition-colors"
						>
							{crumb.title}
						</Link>
					)}
				</div>
			))}
		</nav>
	);
}
