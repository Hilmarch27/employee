CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`position` text NOT NULL,
	`badge` text NOT NULL,
	`barcode_url` text,
	`created_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_barcode_url_unique` ON `employees` (`barcode_url`);--> statement-breakpoint
CREATE TABLE `haircut_history` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text,
	`haircut_date` integer DEFAULT (unixepoch()) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
