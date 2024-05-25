import { useEffect, useState } from "react";
import { User } from "../types";
import { DataTable } from "@lims/shared/components";
import { TableActionEnum, TableColumn } from "@lims/shared/types";

const initialUses: User[] = [
	{
		id: "a3adeebb-1a9e-4bb8-bea3-4aba0d66e1a5",
		email: "mohamedmfaume700@gmail.com",
		fullName: "Mohamed Mfaume Mohamed",
		phoneNumber: "255717963697",
		gender: "M",
		enabled: true,
		roleName: "Admin",
	},
	{
		id: "fa95fdba-fdda-489d-ab47-ff1b0da329a4",
		email: "jdoe.kalambo@gmail.com",
		fullName: "John Doe Kalambo",
		phoneNumber: "2557889900",
		gender: "M",
		enabled: false,
		roleName: "Staff",
	},
	{
		id: "a3adeebb-1a9e-4bb8-bea3-4aba0d66e1a3",
		email: "jj.mgonja@gmail.com",
		fullName: "Justin John Mgonja",
		phoneNumber: "255717181920",
		gender: "F",
		enabled: false,
		roleName: "Admin",
	},
	{
		id: "fa95fdba-fdda-489d-ab47-ff1b0da329a2",
		email: "issa.shekivuli@gmail.com",
		fullName: "Issa Adam Shekivuli",
		phoneNumber: "255789101112",
		gender: "F",
		enabled: true,
		roleName: "Student",
	},
	{
		id: "a3adeebb-1a9e-4bb8-bea3-4aba0d66e1a3",
		email: "jj.mgonja@gmail.com",
		fullName: "Justin John Mgonja",
		phoneNumber: "255717181920",
		gender: "F",
		enabled: false,
		roleName: "Admin",
	},
];

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

	useEffect(() => setUsers(initialUses), []);

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		if (actionId === NEW) console.log("Create New User Clicked: ", actionId, data);
	};

	return <DataTable<User> columns={tableColumns} data={users} entityName="User" actions={tableActions} actionHandler={handleTableActions} />;
};
