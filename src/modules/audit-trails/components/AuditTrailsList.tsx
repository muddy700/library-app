import { apiService, placeholderService, routeService } from "@lims/shared/services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuditTrail } from "../types";
import { TableActionEnum } from "@lims/shared/enums";
import { IError, IPage, NavigationPath, QueryParams, TableColumn } from "@lims/shared/types";
import { Page } from "@lims/shared/layouts";
import { DataTable } from "@lims/shared/components";
import { useState } from "react";

export const AuditTrailsList = () => {
	const [params, setParams] = useState<QueryParams>(placeholderService.defaultQueryParams);

	const queryFn = () => apiService.getWithQuery<AuditTrail>("/audit-trails", params);
	const trailsQuery = useQuery<IPage<AuditTrail>, IError>({ queryKey: ["audit-trails", params], queryFn, placeholderData: keepPreviousData });

	const navigate = useNavigate();
	const { FILTER, SEARCH, VIEW } = TableActionEnum;
	const tableActions = [FILTER, SEARCH, VIEW];

	const navPaths: NavigationPath[] = [{ label: "audit-trails" }, { label: "list" }];

	const tableColumns: TableColumn[] = [
		{ label: "Full Name", fieldName: "actorName" },
		{ label: "Email", fieldName: "actorEmail" },
		{ label: "Activity", fieldName: "action" },
		{ label: "Resource Name", fieldName: "resourceName" },
		{ label: "Time", fieldName: "createdAt", dataType: "date" },
	];

	const tableActionsHandler = (actionId: TableActionEnum, data: unknown): void => {
		const trailId = data as string;
		if (actionId === VIEW) navigate(routeService.auditTrails.details(trailId));
	};

	const formattedQuery = () => {
		const { data } = trailsQuery;
		return !data ? trailsQuery : { ...trailsQuery, data: { ...data, items: data.items.map((item) => ({ ...item, actorName: item.user.fullName, actorEmail: item.user.email })) } };
	};

	const paginationHandler = (fieldName: string, value: number) => setParams({ ...params, [fieldName]: value });

	return (
		<Page title="Audit Trails" subTitle="View users activities" paths={navPaths} errorInfo={trailsQuery.error}>
			<DataTable<AuditTrail>
				columns={tableColumns}
				entityName="Audit Trail"
				actions={tableActions}
				actionHandler={tableActionsHandler}
				onPagination={paginationHandler}
				pageQuery={formattedQuery()}
			/>
		</Page>
	);
};
