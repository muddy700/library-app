import { BaseData, PrimaryData } from "@lims/shared/types";
import { BaseUser } from "./BaseUser";

interface Permission extends PrimaryData {
	description: string;
}

interface Role extends BaseData {
	name: string;
	description: string;
	active: boolean;
	permissions: Permission[];
}

export interface User extends BaseUser, BaseData {
	emailVerifiedAt: string;
	phoneVerifiedAt?: string;
	role: Role;
	passwordChangedAt: string;
}
