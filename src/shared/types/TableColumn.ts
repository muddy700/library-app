export interface TableColumn {
	label: string;
	fieldName: string;
	dataType?: string;
	options?: { valid: string; invalid: string };
}
