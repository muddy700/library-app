import { Validation } from "./Validation";

export interface Error {
	description: string;
	path: string;
	timestamp: string;
	validations: Validation[] | null;
}
