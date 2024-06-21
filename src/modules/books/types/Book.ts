import { BaseData } from "@lims/shared/types";
import { Review } from ".";

export interface Book extends BaseData {
	title: string;
	registrationNumber: string;
	coverImage: string;
	authorName: string;
	reviewsCount: number;
	ratings: number;
	enabled: boolean;

	description?: string;
	content?: string;
	reviews?: Review[];
}
