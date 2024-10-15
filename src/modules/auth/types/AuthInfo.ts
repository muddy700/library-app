
import { User } from "@lims/shared/types";

export interface AuthInfo {
	token: string;
	expiresIn: number;
	user: User;
}
