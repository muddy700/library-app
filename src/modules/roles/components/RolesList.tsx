import { DataTable } from "@lims/shared/components";
import { TableActionEnum } from "@lims/shared/enums";
import { useRoles } from "@lims/shared/hooks";
import { Page } from "@lims/shared/layouts";
import { placeholderService, routeService } from "@lims/shared/services";
import { NavigationPath, QueryParams, Role, TableColumn } from "@lims/shared/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RolesList = () => {
	const [params, setParams] = useState<QueryParams>(placeholderService.defaultQueryParams);
	const rolesQuery = useRoles(params);

	const navigate = useNavigate();
	const { NEW, FILTER, SEARCH, VIEW, UPDATE } = TableActionEnum;
	const tableActions = [NEW, FILTER, SEARCH, VIEW, UPDATE];

	const navPaths: NavigationPath[] = [{ label: "roles" }, { label: "list" }];

	const tableColumns: TableColumn[] = [
		{ label: "Name", fieldName: "name" },
		{ label: "Permissions", fieldName: "permissionsCount" },
		{ label: "Users", fieldName: "usersCount" },
		{ label: "Status", fieldName: "active", dataType: "boolean", options: { valid: "Active", invalid: "Locked" } },
	];

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		const roleId = data as string;

		if (actionId === VIEW) navigate(routeService.roles.details(roleId));
		else if (actionId === NEW) navigate(routeService.roles.create);
		else if (actionId === UPDATE) navigate(routeService.roles.update(roleId));
	};

	const paginationHandler = (fieldName: string, value: number) => setParams({ ...params, [fieldName]: value });

	return (
		<Page title="Roles" subTitle="Manage system roles" paths={navPaths} errorInfo={rolesQuery.error}>
			<DataTable<Role> columns={tableColumns} pageQuery={rolesQuery} entityName="Role" actions={tableActions} actionHandler={handleTableActions} onPagination={paginationHandler} />
		</Page>
	);
};
