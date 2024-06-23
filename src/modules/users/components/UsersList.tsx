import { DataTable } from "@lims/shared/components";
import { BaseUser, IError, NavigationPath, IPage, QueryParams, TableColumn } from "@lims/shared/types";
import { apiService, placeholderService, routeService } from "@lims/shared/services";
import { Page } from "@lims/shared/layouts";
import { useNavigate } from "react-router-dom";
import { TableActionEnum } from "@lims/shared/enums";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const UsersList = () => {
	const [params, setParams] = useState<QueryParams>(placeholderService.defaultQueryParams);

	const queryFn = () => apiService.getWithQuery<BaseUser>("/users", params);
	const usersQuery = useQuery<IPage<BaseUser>, IError>({ queryKey: ["users", params], queryFn, placeholderData: keepPreviousData });

	const navigate = useNavigate();
	const { NEW, FILTER, SEARCH, VIEW, UPDATE } = TableActionEnum;
	const tableActions = [NEW, FILTER, SEARCH, VIEW, UPDATE];

	const navPaths: NavigationPath[] = [{ label: "users" }, { label: "list" }];

	const tableColumns: TableColumn[] = [
		{ label: "Full Name", fieldName: "fullName" },
		{ label: "Email", fieldName: "email" },
		{ label: "Phone Number", fieldName: "phoneNumber" },
		{ label: "Gender", fieldName: "gender" },
		{ label: "Role", fieldName: "roleName" },
		{ label: "Status", fieldName: "enabled", dataType: "boolean", options: { valid: "Active", invalid: "Locked" } },
	];

	const tableActionsHandler = (actionId: TableActionEnum, data: unknown): void => {
		const userId = data as string;

		if (actionId === VIEW) navigate(routeService.users.details(userId));
		else if (actionId === NEW) navigate(routeService.users.create);
		else if (actionId === UPDATE) navigate(routeService.users.update(userId));
	};

	const paginationHandler = (fieldName: string, value: number) => setParams({ ...params, [fieldName]: value });

	return (
		<Page title="Users" subTitle="Manage system users" paths={navPaths} errorInfo={usersQuery.error}>
			<DataTable<BaseUser> columns={tableColumns} entityName="User" actions={tableActions} actionHandler={tableActionsHandler} onPagination={paginationHandler} pageQuery={usersQuery} />
		</Page>
	);
};
