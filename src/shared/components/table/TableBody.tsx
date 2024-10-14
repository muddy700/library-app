import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IPage, PrimaryData, TableColumn } from "@lims/shared/types";
import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import { StatusChip } from "../StatusChip";
import { TableActionEnum } from "@lims/shared/enums";
import { EyeIcon } from "@heroicons/react/24/solid";

type BodyProps<T extends PrimaryData> = {
	columns: TableColumn[];
	pageInfo: IPage<T>;
	hasSerialNumbers: boolean;
	hasActionsColumn: boolean;
	isActionVisible: (actionId: TableActionEnum) => boolean;
	actionHandler: (actionId: TableActionEnum, data: unknown) => void;
};

export const TableBody = <T extends PrimaryData>({ columns, pageInfo, hasSerialNumbers, actionHandler, hasActionsColumn, isActionVisible }: BodyProps<T>) => {
	const { VIEW, UPDATE, DELETE } = TableActionEnum;
	const { items, currentPage, currentSize } = pageInfo;

	const getBooleanValue = (column: TableColumn, row: T): string => {
		return ((row[column.fieldName as never] as boolean) ? column.options?.valid : column.options?.invalid) as string;
	};

	const getNumberOfColumns = (): number => {
		let cols = columns.length;

		if (hasActionsColumn) cols += 1;

		if (hasSerialNumbers) cols += 1;

		return cols;
	};

	const getSerialNumber = (rowIndex: number) => currentPage * currentSize + rowIndex + 1;

	return (
		<tbody>
			{/* Row Placeholder */}
			{!items.length && (
				<tr className="text-center">
					<td colSpan={getNumberOfColumns()} className="py-4">
						No data to display.
					</td>
				</tr>
			)}

			{items.length > 0 &&
				items.map((dataRow: T, rowIndex: number) => {
					const isLast = rowIndex === items.length - 1;
					let tdClasses = "p-4";
					tdClasses += isLast ? "" : " border-b border-blue-gray-50";

					return (
						<tr key={rowIndex} className="hover:shadow-xl hover:bg-secondary-200">
							{columns.map((column: TableColumn, columnIndex: number) => (
								<React.Fragment key={columnIndex}>
									{/* S/No column */}
									{hasSerialNumbers && columnIndex === 0 && (
										<td className={tdClasses}>
											<Typography variant="small" color="blue-gray" className="pl-2 font-normal">
												{getSerialNumber(rowIndex)}
											</Typography>
										</td>
									)}

									{/* Other columns */}
									<td className={tdClasses}>
										<Typography variant="small" color="blue-gray" className="font-normal">
											{((column?.dataType === "text" || !column?.dataType) && dataRow[column.fieldName as never]) ?? "--"}

											{column.dataType === "date" && (dataRow[column.fieldName as never] as string).split("T")[0]}

											{column.dataType === "boolean" && <StatusChip value={getBooleanValue(column, dataRow)} theme={dataRow[column.fieldName as never]} />}
										</Typography>
									</td>

									{/* Actions column */}
									{hasActionsColumn && columnIndex === columns.length - 1 && (
										<td className="text-center">
											{isActionVisible(VIEW) && (
												<IconButton variant="text" onClick={() => actionHandler(VIEW, dataRow.id)}>
													<EyeIcon className="h-5 w-5 text-primary-700" />
												</IconButton>
											)}
											{isActionVisible(UPDATE) && (
												<IconButton variant="text" color="blue" onClick={() => actionHandler(UPDATE, dataRow.id)}>
													<PencilSquareIcon className="h-5 w-5" />
												</IconButton>
											)}
											{isActionVisible(DELETE) && (
												<IconButton variant="text" color="red" onClick={() => actionHandler(DELETE, dataRow.id)}>
													<TrashIcon className="h-5 w-5" />
												</IconButton>
											)}
										</td>
									)}
								</React.Fragment>
							))}
						</tr>
					);
				})}
		</tbody>
	);
};
