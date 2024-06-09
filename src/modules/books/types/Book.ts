import { UpdationData } from "@lims/shared/types";

export interface Book extends UpdationData {
	title: string;
	registrationNumber: string;
	coverImage: string;
	authorName: string;
	reviewsCount: number;
	ratings: number;
	enabled: boolean;
}
