import { BaseData, Permission } from ".";

export interface Role extends BaseData {
	name: string;
	description: string;
	active: boolean;
	permissionsCount?: number;
	permissions: Permission[];
}
