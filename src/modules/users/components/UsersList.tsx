import { DataTable } from "@lims/shared/components";
import { BaseUser, IError, NavigationPath, TableColumn } from "@lims/shared/types";
import { apiService, routeService } from "@lims/shared/services";
import { Page } from "@lims/shared/layouts";
import { useNavigate } from "react-router-dom";
import { TableActionEnum } from "@lims/shared/enums";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const UsersList = () => {
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(5);

	const { isLoading, isFetching, data, error } = useQuery({
		queryKey: ["users", { size, page }],
		queryFn: () => apiService.getWithQuery<BaseUser>("/users", { size, page }),
		placeholderData: keepPreviousData,
	});

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

	const getErrorInfo = () => (error ? (error as unknown as IError) : undefined);

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		const userId = data as string;

		if (actionId === VIEW) navigate(routeService.users.details(userId));
		else if (actionId === NEW) navigate(routeService.users.create);
		else if (actionId === UPDATE) navigate(routeService.users.update(userId));
	};

	const handlePagination = (value: boolean) => {
		if (value && data) setPage(data.currentPage + 1);
		else if (!value && data) setPage(data.currentPage - 1);
	};

	return (
		<Page title="Users" subTitle="Manage system users" paths={navPaths} errorInfo={getErrorInfo()}>
			<DataTable<BaseUser>
				columns={tableColumns}
				dataPage={data}
				entityName="User"
				actions={tableActions}
				actionHandler={handleTableActions}
				isLoading={isLoading}
				isFetching={isFetching}
				onPagination={handlePagination}
				onPageSizeChange={setSize}
			/>
		</Page>
	);
};
