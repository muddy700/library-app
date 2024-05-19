import { CreationData } from "@lims/shared/types";

export interface BaseTask extends CreationData {
	title: string;
	createdAt: string;
}
