import { User } from "@lims/modules/users/types";

export interface AuthInfo {
	token: string;
	expiresIn: number;
	user: User;
}
