import { CreationData, MiniUser } from "@lims/shared/types";

export interface AuditTrail extends CreationData {
	action: string;
	actorName: string;
	actorEmail: string;
	resourceName: string;
	resourceId: string;
	previousValues?: string;
	updatedValues?: string;
	user: MiniUser;
}
