import { QueryClient } from "@tanstack/react-query";
import { Success, IError, IPage, PrimaryData } from "../types";

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

export const isSuccess = (response: Success | IError): response is Success => "resourceId" in response && "message" in response;

export const isPage = <T extends PrimaryData>(response: IPage<T> | IError): response is IPage<T> => "items" in response && "totalItems" in response;

export const isValidData = <T extends PrimaryData>(response: T | IError): response is T => "id" in response;

export const encode = (data: string) => btoa(data);

export const decode = (encodedInfo: string) => atob(encodedInfo);

export const formatDate = (value: string) => value.split("T")[0] ?? "--";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNull = (value: any) => [null, undefined, ""].includes(value);

export const pauseExecution = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const getEntityPlural = (entityName: string) => {
	const normalEntities = ["user", "todo", "role", "permission", "book"];

	if (normalEntities.includes(entityName.toLowerCase())) return entityName + "s";
	else return entityName;
};

export const getTraceId = () => {
	// Eg ==> TID-2024-0915-1003

	const currentDate = new Date();
	let traceId = "TID-" + currentDate.getFullYear() + "-";

	traceId += ("0" + (currentDate.getMonth() + 1)).slice(-2) + ("0" + currentDate.getDate()).slice(-2);
	traceId += "-100" + Math.floor(Math.random() * 9 + 1);

	return traceId;
};

export const constants = {
	AUTH_INFO: "AUTH_INFO",
};

/**
 * Create: POST => Success ===> resourceId
 * Delete: DELETE => Success ===> resourceId
 * Update: PATCH => Success ===> resourceId
 * GetAll: GET => Page ===> items
 * GetById: GET => T extends BaseData ===> id
 */
