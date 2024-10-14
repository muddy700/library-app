import { Validation } from "./Validation";

// TODO: Remove the optional mark in traceId field
export interface IError {
	status: number;
	title: string;
	traceId: string;
	description: string;
	path: string;
	timestamp: string;
	validations?: Validation[];
}
