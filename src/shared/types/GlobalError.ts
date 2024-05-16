import { BaseError } from "./BaseError";

export interface GlobalError extends BaseError {
	detail: string;
	instance: string;
	type: string;
}

// detail: "Failed to read request";
// instance: "/api/v1/tasks";
// status: 400;
// title: "Bad Request";
// type: "about:blank";
