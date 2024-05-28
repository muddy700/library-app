import { useEffect, useState } from "react";
import { BaseUser } from "../types";
import { DataTable } from "@lims/shared/components";
import { NavigationPath, TableActionEnum, TableColumn } from "@lims/shared/types";
import { dummyDataService } from "@lims/shared/services";
import { Page } from "@lims/shared/layouts";
import { useNavigate } from "react-router-dom";

export const UsersList = () => {
	const [users, setUsers] = useState<BaseUser[]>([]);

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

	useEffect(() => setUsers(dummyDataService.initialUsers), []);

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		const userId = data as string;

		if (actionId === VIEW) navigate("../" + userId + "/details");
	};

	return (
		<Page title="Users" subTitle="Manage system users" paths={navPaths}>
			<DataTable<BaseUser> columns={tableColumns} data={users} entityName="User" actions={tableActions} actionHandler={handleTableActions} />
		</Page>
	);
};
