import { DataTable } from "@lims/shared/components";
import { TableActionEnum } from "@lims/shared/enums";
import { useRoles } from "@lims/shared/hooks";
import { Page } from "@lims/shared/layouts";
import { routeService } from "@lims/shared/services";
import { IError, NavigationPath, Role, TableColumn } from "@lims/shared/types";
import { useNavigate } from "react-router-dom";

export const RolesList = () => {
	const { isLoading, data, error } = useRoles();

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

	const getErrorInfo = () => (error ? (error as unknown as IError) : undefined);

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		const roleId = data as string;

		if (actionId === VIEW) navigate(routeService.roles.details(roleId));
		else if (actionId === NEW) navigate(routeService.roles.create);
		else if (actionId === UPDATE) navigate(routeService.roles.update(roleId));
	};

	return (
		<Page title="Roles" subTitle="Manage system roles" paths={navPaths} errorInfo={getErrorInfo()}>
			<DataTable<Role> columns={tableColumns} dataPage={data} entityName="Role" actions={tableActions} actionHandler={handleTableActions} isLoading={isLoading} />
		</Page>
	);
};
