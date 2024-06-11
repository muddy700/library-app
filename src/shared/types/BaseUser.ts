import { MiniUser } from "@lims/shared/types";

export interface BaseUser extends MiniUser {
	phoneNumber: string;
	gender: string;
	enabled: boolean;
	roleName?: string;
}
