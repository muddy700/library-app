import { PrimaryData } from ".";

export interface Permission extends PrimaryData {
	action?: string;
	resourceName: string;
	description: string;
}
