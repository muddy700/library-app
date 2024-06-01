import { useEffect, useState } from "react";
import { DataTable } from "@lims/shared/components";
import { BaseUser, Error, NavigationPath,  TableColumn } from "@lims/shared/types";
import { apiService, utilService } from "@lims/shared/services";
import { Page } from "@lims/shared/layouts";
import { useNavigate } from "react-router-dom";
import { TableActionEnum } from "@lims/shared/enums";

export const UsersList = () => {
	const [users, setUsers] = useState<BaseUser[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [errorInfo, setErrorInfo] = useState<Error>();

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

	useEffect(() => {
		(async () => {
			const response = await apiService.getWithQuery<BaseUser>("/users", { size: 8 });

			setIsLoading(false);
			if (utilService.isPage(response)) setUsers(response.items);
			else setErrorInfo(response);
		})();
	}, []);

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		const userId = data as string;

		if (actionId === VIEW) navigate("../" + userId + "/details");
		else if (actionId === NEW) navigate("../create");
	};

	return (
		<Page title="Users" subTitle="Manage system users" paths={navPaths} errorInfo={errorInfo} onCloseErrorDialog={setErrorInfo}>
			<DataTable<BaseUser> columns={tableColumns} data={users} entityName="User" actions={tableActions} actionHandler={handleTableActions} isLoading={isLoading} />
		</Page>
	);
};
