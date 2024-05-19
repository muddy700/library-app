import { UpdationData } from "@lims/shared/types";
import { BaseTask } from "./BaseTask";

export interface Task extends BaseTask, UpdationData {
	published: boolean;
	maxDuration: number;

	updatedAt: string;
	authorName: string;
	authorEmail: string;
}
