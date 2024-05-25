import { PrimaryData } from "@lims/shared/types";

export interface User extends PrimaryData {
	email: string;
	fullName: string;
	phoneNumber: string;
	gender: string;
	enabled: boolean;
	roleName: string;
}
