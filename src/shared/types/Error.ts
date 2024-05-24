import { BaseError } from "./BaseError";
import { Validation } from "./Validation";

// TODO: Remove the optional mark in traceId field

export interface Error extends BaseError {
	traceId?: string;
	description: string;
	path: string;
	timestamp: string;
	validations: Validation[] | null;
}
