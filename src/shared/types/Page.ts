export interface Page<T> {
	totalItems: number;
	currentSize: number;
	totalPages: number;
	currentPage: number;
	items: T[];
}
