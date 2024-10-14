import { MiniUser, UpdationData } from "@lims/shared/types";

export interface Review extends UpdationData {
	ratings: number;
	comment?: string;
	user: MiniUser;
}
