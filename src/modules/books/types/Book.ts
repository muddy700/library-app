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

	//! The fields below are only avalable through getById()
	description: string;
	content: string;
	reviews: Review[];
}
