/** biome-ignore-all lint/a11y/noSvgWithoutTitle: is used for svg */

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type ComboboxItem = {
	value: string;
	label: string;
};

interface ComboboxProps {
	items: ComboboxItem[];
	value?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	emptyText?: string;
	className?: string;
	disabled?: boolean;
}

export default function Combobox({
	items,
	value,
	onValueChange,
	placeholder = 'Select item...',
	searchPlaceholder = 'Search...',
	emptyText = 'No results found.',
	className,
	disabled = false,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);

	const selectedItem = items.find((item) => item.value === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={disabled}
					className={cn('w-full justify-between', className)}
				>
					<span className="truncate">
						{selectedItem ? selectedItem.label : placeholder}
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="ml-2 h-4 w-4 shrink-0 opacity-50"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-[--radix-popover-trigger-width] p-0"
				side='bottom'
			>
				<Command className='h-52'>
					<CommandInput placeholder={searchPlaceholder} />
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										onValueChange?.(currentValue === value ? '' : currentValue);
										setOpen(false);
									}}
								>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
