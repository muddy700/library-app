import { Button, Card, CardBody, CardFooter, IconButton, Input, Typography } from "@material-tailwind/react";
import { InputOption, Page, PrimaryData, TableColumn } from "../types";
import { TableHead } from "./TableHead";
import { EyeIcon } from "@heroicons/react/24/solid";
import { FunnelIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { TableSkeleton } from "./TableSkeleton";
import { TableActionEnum } from "../enums";
import { placeholderService } from "../services";
import { StatusChip } from "./StatusChip";
import { SelectInput } from "./form";

type TableProps<T extends PrimaryData> = {
	columns?: TableColumn[];
	dataPage?: Page<T>;
	isLoading?: boolean;
	isFetching?: boolean;
	entityName?: string;
	hasSerialNumbers?: boolean;
	actions?: TableActionEnum[];
	actionHandler?: (actionId: TableActionEnum, data: unknown) => void;
	onPagination?: (direction: boolean) => void;
	onPageSizeChange?: (value: number) => void;
};

export const DataTable = <T extends PrimaryData>({
	columns = [],
	dataPage = placeholderService.getDataPage(),
	isLoading = false,
	isFetching = false,
	entityName = "Entity",
	hasSerialNumbers = true,
	actions = [],
	onPagination = (value: boolean) => console.log("Table Pagination: ", value),
	onPageSizeChange = (value: number) => console.log("Table Page Size: ", value),
	actionHandler = (actionId: TableActionEnum, data: unknown) => console.log("Table action handler: ", actionId, data),
}: TableProps<T>) => {
	const { items, totalItems, currentPage, totalPages, currentSize } = dataPage;
	const [searchQuery, setSearchQuery] = useState<string>("");

	const buttonClasses: string = "flex items-center gap-3 text-primary-900 py-2 px-3";
	const { NEW, FILTER, SEARCH, VIEW, UPDATE, DELETE, VIEW_MORE, MORE_ACTIONS } = TableActionEnum;

	const getNumberOfColumns = (): number => {
		let cols = columns.length;

		if (hasActionsColumn()) cols += 1;

		if (hasSerialNumbers) cols += 1;

		return cols;
	};

	const hasActionsColumn = (): boolean => {
		// Table actions which display under the Actions column
		const eligibleActions = [VIEW, UPDATE, DELETE, VIEW_MORE, MORE_ACTIONS];

		return actions.some((action) => eligibleActions.includes(action));
	};

	const isVisible = (actionId: TableActionEnum) => (actions.find((action) => action === actionId) ? true : false);

	const getBooleanValue = (column: TableColumn, row: T): string => {
		return ((row[column.fieldName as never] as boolean) ? column.options?.valid : column.options?.invalid) as string;
	};

	const isLastPage = () => currentPage + 1 === totalPages;

	const getSerialNumber = (rowIndex: number) => currentPage * currentSize + rowIndex + 1;

	const onSelectionChange = (fieldName: string, value?: string) => onPageSizeChange(Number(value));

	const sizeOptions: InputOption[] = [
		{ label: "3", value: "3" },
		{ label: "5", value: "5" },
		{ label: "10", value: "10" },
		{ label: "15", value: "15" },
		{ label: "20", value: "20" },
	];

	if (isLoading) return <TableSkeleton />;

	return (
		<div className="flex flex-col gap-2">
			{/* Table actions row: Start */}
			<div className="flex items-center justify-between">
				<div className="flex gap-3 items-center">
					{isVisible(NEW) && (
						<Button className={buttonClasses} variant="outlined" onClick={() => actionHandler(NEW, null)}>
							<PlusIcon className="h-5 w-5" strokeWidth={2} />
							New {entityName}
						</Button>
					)}
					{isVisible(FILTER) && (
						<Button className={buttonClasses} variant="outlined" onClick={() => actionHandler(FILTER, null)}>
							<FunnelIcon className="w-5 h-5" strokeWidth={2} />
							Filter
						</Button>
					)}
				</div>
				<div className="w-72">
					{isVisible(SEARCH) && (
						<Input
							label="Search"
							icon={<MagnifyingGlassIcon className="h-5 w-5 hover:cursor-pointer" onClick={() => actionHandler(SEARCH, searchQuery)} />}
							onChange={(e) => setSearchQuery(e.target.value)}
							color="teal"
							size="lg"
						/>
					)}
				</div>
			</div>
			{/* Table actions row: End */}

			{/* Table component: Start */}
			<Card className="h-full w-full overflow-x-scroll border-b-4 border-primary-900">
				<CardBody className="p-0">
					<table className="w-full min-w-max table-auto text-left">
						<TableHead hasSerialNumbers={hasSerialNumbers} hasActionsColumn={hasActionsColumn()} columns={columns} />
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
													{hasActionsColumn() && columnIndex === columns.length - 1 && (
														<td className="text-center">
															{isVisible(VIEW) && (
																<IconButton variant="text" onClick={() => actionHandler(VIEW, dataRow.id)}>
																	<EyeIcon className="h-5 w-5 text-primary-700" />
																</IconButton>
															)}
															{isVisible(UPDATE) && (
																<IconButton variant="text" color="blue" onClick={() => actionHandler(UPDATE, dataRow.id)}>
																	<PencilSquareIcon className="h-5 w-5" />
																</IconButton>
															)}
															{isVisible(DELETE) && (
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
					</table>
				</CardBody>
				<CardFooter className="grid grid-cols-3 items-center border-t border-blue-gray-50 p-4 py-1">
					<Typography variant="small" color="blue-gray" className="font-semibold text-opacity-75">
						Page {currentPage + 1} of {totalPages} from {totalItems} rows
					</Typography>

					<div className="justify-self-center">
						<SelectInput disabled={isFetching} label={"Rows"} onChange={onSelectionChange} options={sizeOptions} size="md" value={currentSize.toString()} />
					</div>

					{isFetching ? (
						<Button size="sm" className="capitalize bg-primary-900 justify-self-end" loading={isFetching} children="Loading..." />
					) : (
						<div className="flex gap-3 items-center justify-self-end">
							<Button disabled={!currentPage} variant="outlined" size="sm" onClick={() => onPagination(false)}>
								Previous
							</Button>
							<Button disabled={isLastPage()} variant="outlined" size="sm" onClick={() => onPagination(true)}>
								Next
							</Button>
						</div>
					)}
				</CardFooter>
			</Card>
			{/* Table component: End */}
		</div>
	);
};
