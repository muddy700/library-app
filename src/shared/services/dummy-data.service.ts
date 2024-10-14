import { UserDto } from "@lims/modules/users/schemas";
import { BaseUser, IError, Success, User } from "../types";
import { LoginDto } from "@lims/modules/auth/schemas";

export const initialUsers: BaseUser[] = [
	{
		id: "a3adeebb-1a9e-4bb8-bea3-4aba0d66e1a1",
		email: "mohamedmfaume700@gmail.com",
		fullName: "Mohamed Mfaume Mohamed",
		phoneNumber: "255717963697",
		gender: "M",
		enabled: true,
		roleName: "Admin",
	},
	{
		id: "fa95fdba-fdda-489d-ab47-ff1b0da329a2",
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
		id: "fa95fdba-fdda-489d-ab47-ff1b0da329a4",
		email: "issa.shekivuli@gmail.com",
		fullName: "Issa Adam Shekivuli",
		phoneNumber: "255789101112",
		gender: "F",
		enabled: true,
		roleName: "Student",
	},
	{
		id: "a3adeebb-1a9e-4bb8-bea3-4aba0d66e1a5",
		email: "jj.mgonja@gmail.com",
		fullName: "Justin John Mgonja",
		phoneNumber: "255717181920",
		gender: "F",
		enabled: false,
		roleName: "Admin",
	},
	{
		id: "fa95fdba-fdda-489d-ab47-ff1b0da329a6",
		email: "jdoe.kalambo@gmail.com",
		fullName: "John Doe Kalambo",
		phoneNumber: "2557889900",
		gender: "M",
		enabled: false,
		roleName: "Staff",
	},
	{
		id: "a3adeebb-1a9e-4bb8-bea3-4aba0d66e1a7",
		email: "jj.mgonja@gmail.com",
		fullName: "Justin John Mgonja",
		phoneNumber: "255717181920",
		gender: "F",
		enabled: false,
		roleName: "Admin",
	},
	{
		id: "fa95fdba-fdda-489d-ab47-ff1b0da329a8",
		email: "issa.shekivuli@gmail.com",
		fullName: "Issa Adam Shekivuli",
		phoneNumber: "255789101112",
		gender: "F",
		enabled: true,
		roleName: "Student",
	},
];

export const userDetails: User = {
	id: "a3adeebb-1a9e-4bb8-bea3-4aba0d66e1a8",
	email: "mohamedmfaume700@gmail.com",
	phoneNumber: "255717963697",
	fullName: "Prisca John Milangasi",
	emailVerifiedAt: "2024-04-29T11:02:19.458+00:00",
	gender: "M",
	enabled: true,
	role: {
		id: "2031233d-0037-45c3-bbc6-042a1f5a3545",
		name: "Student",
		description: "Role for the overall system administrator who can perform anything.",
		active: true,
		permissions: [
			{
				id: "e959eee0-e4f5-4916-93a7-d14fc5f836a3",
				description: "Can view Permission(s).",
				resourceName: "Permission",
			},
			{
				id: "f2ba3c30-1679-4777-9e1d-724dd518c7dd",
				description: "Can delete Book(s).",
				resourceName: "Book",
			},
			{
				id: "c5dcc61a-5ca1-48c2-a269-273456af7dac",
				description: "Can delete User(s).",
				resourceName: "User",
			},
			{
				id: "ff9a2962-f952-476c-990f-9b4c4eba5170",
				description: "Can view Book(s).",
				resourceName: "Book",
			},
			{
				id: "ca727732-f445-4433-9d33-a6c9c72a3465",
				description: "Can view Role(s).",
				resourceName: "Role",
			},
			{
				id: "f40ca20a-1dbb-4f91-b30e-9331bfab5a38",
				description: "Can create Role(s).",
				resourceName: "Role",
			},
			{
				id: "05b1ed30-9bfe-449e-af44-9b2230800a5c",
				description: "Can create User(s).",
				resourceName: "User",
			},
			{
				id: "3b713b55-da81-4f5b-b06c-ba34a86c42be",
				description: "Can create Book(s).",
				resourceName: "Book",
			},
			{
				id: "1dcad8fd-c037-4436-9203-3a1571f5546e",
				description: "Can add and remove  permission(s) to and from the role",
				resourceName: "Permission",
			},
			{
				id: "2b22f093-ebc0-48be-ba11-f3e2021775a1",
				description: "Can view User(s).",
				resourceName: "User",
			},
			{
				id: "2c2383e3-c75a-43bf-ab9d-fa5a03fddf41",
				description: "Can update User(s).",
				resourceName: "User",
			},
			{
				id: "2f532465-0639-4b85-845e-e84ffec00c42",
				description: "Can view AuditTrail(s).",
				resourceName: "AuditTrail",
			},
			{
				id: "301b1cc8-cce6-47e5-84fc-83f4a68e88ae",
				description: "Can update Book(s).",
				resourceName: "Book",
			},
			{
				id: "d5da2248-df15-4a05-924e-f85c1921264c",
				description: "Can update Role(s).",
				resourceName: "Role",
			},
			{
				id: "5aea9b86-65e9-4ba4-a0ca-c8a9768acf68",
				description: "Can delete Role(s).",
				resourceName: "Role",
			},
		],
		createdAt: "2024-04-25T10:59:04.857+00:00",
		updatedAt: "2024-04-25T10:59:04.857+00:00",
	},
	passwordChangedAt: "2024-04-29T11:03:18.433+00:00",
	createdAt: "2024-04-25T10:59:04.969+00:00",
	updatedAt: "2024-04-29T11:03:18.437+00:00",
};

export const unknownError: IError = {
	status: 400,
	title: "Unknown Error",
	traceId: "TID-unknown",
	description: "Something went wrong, please contact your System Admin.",
	path: "/api/v1/unknown-path",
	timestamp: new Date().toISOString(),
};

export const loginInfo: LoginDto = { email: "mohamedmfaume700@gmail.com", password: "Pass@1234" };

export const userForm: UserDto = {
	fullName: "Magdalena Nchimbi",
	email: "maggie.nchimbi@gmail.com",
	phoneNumber: "789101112",
	roleId: "2031233d-0037-45c3-bbc6-042a1f5a3545",
	gender: "F",
};

export const successInfo: Success = { message: "User created successfully.", resourceId: "e619159e-9253-4ccd-a71a-308049637430" };
