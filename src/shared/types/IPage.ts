import { PrimaryData } from "./PrimaryData";

export interface IPage<T extends PrimaryData> {
	totalItems: number;
	currentSize: number;
	totalPages: number;
	currentPage: number;
	items: T[];
}
