import { BaseData, Role } from "@lims/shared/types";
import { BaseUser } from "./BaseUser";

export interface User extends BaseUser, BaseData {
	emailVerifiedAt: string;
	phoneVerifiedAt?: string;
	role: Role;
	passwordChangedAt: string;
}
