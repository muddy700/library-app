import { apiService, routeService } from "@lims/shared/services";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuditTrail } from "../types";
import { TableActionEnum } from "@lims/shared/enums";
import { IError, NavigationPath, TableColumn } from "@lims/shared/types";
import { Page } from "@lims/shared/layouts";
import { DataTable } from "@lims/shared/components";

export const AuditTrailsList = () => {
	const { isLoading, data, error } = useQuery({ queryKey: ["audit-trails"], queryFn: () => apiService.getWithQuery<AuditTrail>("/audit-trails", { size: 9 }) });

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

	const getErrorInfo = () => (error ? (error as unknown as IError) : undefined);

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		const roleId = data as string;
		if (actionId === VIEW) navigate(routeService.auditTrails.details(roleId));
	};

	const getFormattedData = () => {
		if (data) return { ...data, items: data.items.map((item) => ({ ...item, actorName: item.user.fullName, actorEmail: item.user.email })) };
	};

	return (
		<Page title="Audit Trails" subTitle="View users activities" paths={navPaths} errorInfo={getErrorInfo()}>
			<DataTable<AuditTrail> columns={tableColumns} dataPage={getFormattedData()} entityName="Audit Trail" actions={tableActions} actionHandler={handleTableActions} isLoading={isLoading} />
		</Page>
	);
};
