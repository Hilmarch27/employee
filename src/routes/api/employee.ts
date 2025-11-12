import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { sql } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { employees } from "@/db/schema";
import { generateBadgeNumber } from "@/lib/utils";
import { CreateEmployeeSc, type EmployeeInput } from "@/server-function/employee-fn";

const CreateManyEmployeesSc = z.array(CreateEmployeeSc);

export const Route = createFileRoute("/api/employee")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = await request.json();
					const data = CreateManyEmployeesSc.parse(body);

					return await db.transaction(async (tx) => {
						const results = [];

						const positionsNeeded = [
							...new Set(
								data.map((emp) =>
									emp.position.toUpperCase().replace(/\s+/g, ""),
								),
							),
						];

						const maxSequences = new Map<string, number>();

						for (const positionKey of positionsNeeded) {
							const result = await tx
								.select({ badge: employees.badge })
								.from(employees)
								.where(sql`${employees.badge} LIKE ${`${positionKey}-%`}`);

							let maxSequence = 0;
							result.forEach((emp) => {
								const badgeParts = emp.badge.split("-");
								if (badgeParts.length === 2) {
									const sequence = parseInt(badgeParts[1], 10);
									if (!Number.isNaN(sequence) && sequence > maxSequence) {
										maxSequence = sequence;
									}
								}
							});

							maxSequences.set(positionKey, maxSequence);
						}

						// 2. Group employees by position
						const positionGroups: {
							[key: string]: EmployeeInput[];
						} = {};

						data.forEach((emp) => {
							const positionKey = emp.position
								.toUpperCase()
								.replace(/\s+/g, "");
							if (!positionGroups[positionKey]) {
								positionGroups[positionKey] = [];
							}
							positionGroups[positionKey].push(emp);
						});

						// 3. Insert semua employees dengan sequence yang aman
						for (const [positionKey, employeesInGroup] of Object.entries(
							positionGroups,
						)) {
							let nextSequence = (maxSequences.get(positionKey) || 0) + 1;

							for (const empData of employeesInGroup) {
								const badge = generateBadgeNumber(
									empData.position,
									nextSequence,
								);

								const newEmployee = await tx
									.insert(employees)
									.values({
										name: empData.name,
										position: empData.position,
										badge: badge,
									})
									.returning();

								results.push(newEmployee[0]);
								nextSequence++;
							}
						}

						return json(results);
					});
				} catch (error) {
					console.error(error);
					throw new Error("Internal Server Error");
				}
			},
		},
	},
});
