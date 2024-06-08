import { DataTable } from "@lims/shared/components";
import { BaseUser, IError, NavigationPath, TableColumn } from "@lims/shared/types";
import { apiService } from "@lims/shared/services";
import { Page } from "@lims/shared/layouts";
import { useNavigate } from "react-router-dom";
import { TableActionEnum } from "@lims/shared/enums";
import { useQuery } from "@tanstack/react-query";

export const UsersList = () => {
	const { isLoading, data, error } = useQuery({ queryKey: ["users"], queryFn: () => apiService.getWithQuery<BaseUser>("/users", { size: 8 }) });

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

		if (actionId === VIEW) navigate("../" + userId + "/details");
		else if (actionId === NEW) navigate("../create");
		else if (actionId === UPDATE) navigate("../" + userId + "/update");
	};

	return (
		<Page title="Users" subTitle="Manage system users" paths={navPaths} errorInfo={getErrorInfo()}>
			<DataTable<BaseUser> columns={tableColumns} data={data?.items} entityName="User" actions={tableActions} actionHandler={handleTableActions} isLoading={isLoading} />
		</Page>
	);
};
