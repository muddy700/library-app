import { BaseTask } from "./BaseTask";

export interface Task extends BaseTask {
	published: boolean;
	maxDuration: number;

	updatedAt: string;
	authorName: string;
	authorEmail: string;
}
