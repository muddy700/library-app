import { Card, CardBody } from "@material-tailwind/react";
import { IError, IPage, PrimaryData, TableColumn } from "../../types";
import { TableSkeleton } from "../TableSkeleton";
import { TableActionEnum } from "../../enums";
import { placeholderService } from "../../services";
import { UseQueryResult } from "@tanstack/react-query";
import { TableActions, TableBody, TableFooter, TableHead } from ".";

type TableProps<T extends PrimaryData> = {
	columns: TableColumn[];
	pageQuery: UseQueryResult<IPage<T>, IError>;
	entityName?: string;
	hasSerialNumbers?: boolean;
	actions?: TableActionEnum[];
	actionHandler?: (actionId: TableActionEnum, data: unknown) => void;
	onPagination?: (fieldName: string, value: number) => void;
};

export const DataTable = <T extends PrimaryData>({
	columns,
	pageQuery,
	entityName = "Entity",
	hasSerialNumbers = true,
	actions = [],
	onPagination = (fieldName: string, value: number) => console.log("Table Pagination: ", fieldName, value),
	actionHandler = (actionId: TableActionEnum, data: unknown) => console.log("Table action handler: ", actionId, data),
}: TableProps<T>) => {
	const { isLoading, isFetching, data } = pageQuery;
	const pageInfo = data ?? placeholderService.getDataPage();

	const { VIEW, UPDATE, DELETE, VIEW_MORE, MORE_ACTIONS } = TableActionEnum;

	const hasActionsColumn = (): boolean => {
		// Table actions which display under the Actions column
		const eligibleActions = [VIEW, UPDATE, DELETE, VIEW_MORE, MORE_ACTIONS];

		return actions.some((action) => eligibleActions.includes(action));
	};

	const isActionVisible = (actionId: TableActionEnum) => (actions.find((action) => action === actionId) ? true : false);

	if (isLoading) return <TableSkeleton />;

	return (
		<div className="flex flex-col gap-2">
			<TableActions entityName={entityName} actionHandler={actionHandler} isActionVisible={isActionVisible} />

			<Card className="h-full w-full overflow-x-scroll border-b-4 border-primary-900">
				<CardBody className="p-0">
					<table className="w-full min-w-max table-auto text-left">
						<TableHead hasSerialNumbers={hasSerialNumbers} hasActionsColumn={hasActionsColumn()} columns={columns} />
						
						<TableBody
							hasSerialNumbers={hasSerialNumbers}
							hasActionsColumn={hasActionsColumn()}
							columns={columns}
							actionHandler={actionHandler}
							pageInfo={pageInfo}
							isActionVisible={isActionVisible}
						/>
					</table>
				</CardBody>
				<TableFooter isFetching={isFetching} onPagination={onPagination} pageInfo={pageInfo} />
			</Card>
		</div>
	);
};
