import { Navigate, useLocation } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';
import { Command, Home, LogOut, Users } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from '@/components/ui/sidebar';
import { authClient } from '@/integrations/auth/auth-client';

export const DATA_SIDEBAR = {
	navMain: [
		{
			name: 'Dashboard',
			url: '/',
			icon: Home,
		},
		{
			name: 'Employee',
			url: '/employee',
			icon: Users,
		},
	],
	navSecondary: [
		{
			title: 'Logout',
			url: '#',
			icon: LogOut,
		},
	],
};

type MainNavProps = {
	items: Array<{
		name: string;
		url: string;
		icon: LucideIcon;
	}>;
};

function MainNav({ items }: MainNavProps) {
	const pathname = useLocation({
		select: (location) => location.pathname,
	});
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>General Admin</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild isActive={pathname === item.url}>
							<a href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

type SecondaryNavProps = {
	items: Array<{
		title: string;
		url: string;
		icon: LucideIcon;
	}>;
};

function SecondaryNav({
	items,
	...props
}: SecondaryNavProps & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								size="sm"
								onClick={async () => {
									await authClient.signOut({
										fetchOptions: {
											onSuccess: () => {
												<Navigate to="/signin" />;
											},
										},
									});
								}}
							>
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">USER MANAGEMENT</span>
									<span className="truncate text-xs">ADMIN</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<MainNav items={DATA_SIDEBAR.navMain} />
				<SecondaryNav items={DATA_SIDEBAR.navSecondary} className="mt-auto" />
			</SidebarContent>
		</Sidebar>
	);
}

export function LayoutSidebar({ children }: { children: React.ReactNode }) {
	const pathname = useLocation({
		select: (location) => location.pathname,
	});

	const isSignin = pathname === '/signin';

	if (isSignin) {
		return <>{children}</>;
	}

	return (
		<SidebarProvider defaultOpen={true}>
			<AppSidebar />
			<SidebarInset className="border-2 flex h-[calc(100dvh-1rem)] overflow-hidden pb-3">
				<Navbar />
				<div className="flex-1 overflow-auto">
					<div className="container max-w-full h-full mx-0 ps-2 md:ps-4.5">
						{children}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
