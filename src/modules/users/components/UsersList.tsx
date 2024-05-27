import { useEffect, useState } from "react";
import { User } from "../types";
import { DataTable } from "@lims/shared/components";
import { TableActionEnum, TableColumn } from "@lims/shared/types";
import { dummyDataService } from "@lims/shared/services";

export const UsersList = () => {
	const [users, setUsers] = useState<User[]>([]);
	const { NEW, FILTER, SEARCH, VIEW, UPDATE } = TableActionEnum;
	const tableActions = [NEW, FILTER, SEARCH, VIEW, UPDATE];

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
		if (actionId === NEW) console.log("Create New User Clicked: ", actionId, data);
	};

	return <DataTable<User> columns={tableColumns} data={users} entityName="User" actions={tableActions} actionHandler={handleTableActions} />;
};
