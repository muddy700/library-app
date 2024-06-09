import { QueryClient } from "@tanstack/react-query";
import { Success, IError, Page, PrimaryData } from "../types";

export const queryClient = new QueryClient();

export const isSuccess = (response: Success | IError): response is Success => "resourceId" in response && "message" in response;

export const isPage = <T>(response: Page<T> | IError): response is Page<T> => "items" in response && "totalItems" in response;

export const isValidData = <T extends PrimaryData>(response: T | IError): response is T => "id" in response;

export const encode = (data: string) => btoa(data);

export const decode = (encodedInfo: string) => atob(encodedInfo);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNull = (value: any) => [null, undefined, ""].includes(value);

export const pauseExecution = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const getEntityPlural = (entityName: string) => {
	const normalEntities = ["user", "todo", "role", "permission", "book"];

	if (normalEntities.includes(entityName.toLowerCase())) return entityName + "s";
	else return entityName;
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
