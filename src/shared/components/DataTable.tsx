import { Card, IconButton, Typography } from "@material-tailwind/react";
import { PrimaryData, TableColumn } from "../types";
import { TableHead } from "./TableHead";
import { EyeIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

type TableProps<T> = {
	columns: TableColumn[];
	data: T[];
	hasSerialNumbers?: boolean;
	hasActions?: boolean;
	eventHandler: (eventId: number, taskId: number) => void;
};

export const DataTable = <T extends PrimaryData>({ columns, data, hasSerialNumbers = true, hasActions = true, eventHandler }: TableProps<T>) => {
	return (
		<Card className="h-full w-full overflow-scroll">
			<table className="w-full min-w-max table-auto text-left">
				<TableHead hasSerialNumbers={hasSerialNumbers} hasActions={hasActions} columns={columns} />
				<tbody>
					{data.map((dataRow: T, rowIndex: number) => {
						const isLast = rowIndex === data.length - 1;
						let tdClasses = "p-4";
						tdClasses += isLast ? "" : " border-b border-blue-gray-50";

						return (
							<tr key={rowIndex} className="hover:shadow-xl hover:bg-secondary-200/50">
								{columns.map((column: TableColumn, columnIndex: number) => (
									// TODO: Each child in a list should have a unique "key" prop
									<React.Fragment key={columnIndex}>
										{/* S/No column */}
										{hasSerialNumbers && columnIndex === 0 && (
											<td className={tdClasses}>
												<Typography variant="small" color="blue-gray" className="font-normal">
													{rowIndex + 1}
												</Typography>
											</td>
										)}

										{/* Other columns */}
										<td className={tdClasses}>
											<Typography variant="small" color="blue-gray" className="font-normal">
												{column.dataType === "text" && dataRow[column.fieldName as never]}

												{column.dataType === "date" && (dataRow[column.fieldName as never] as string).split("T")[0]}
											</Typography>
										</td>

										{/* Actions column */}
										{hasActions && columnIndex === columns.length - 1 && (
											<td>
												<IconButton variant="text" color="indigo" onClick={() => eventHandler(1, dataRow.id)}>
													<EyeIcon className="h-5 w-5" />
												</IconButton>
												<IconButton variant="text" color="blue" onClick={() => eventHandler(2, dataRow.id)}>
													<PencilSquareIcon className="h-5 w-5" />
												</IconButton>
												<IconButton variant="text" color="red" onClick={() => eventHandler(3, dataRow.id)}>
													<TrashIcon className="h-5 w-5" />
												</IconButton>
											</td>
										)}
									</React.Fragment>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</Card>
	);
};
