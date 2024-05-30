import { BaseData, Permission } from ".";

export interface Role extends BaseData {
	name: string;
	description: string;
	active: boolean;
	permissions: Permission[];
}
