import { Success, Error, Page, PrimaryData } from "../types";
// TODO: Write descriptions for the functions below

export const isSuccess = (response: Success | Error): response is Success => "resourceId" in response && "message" in response;

export const isPage = <T>(response: Page<T> | Error): response is Page<T> => "items" in response && "totalItems" in response;

export const isValidData = <T extends PrimaryData>(response: T | Error): response is T => "id" in response;

// TODO: Modify the funtion below to replace the above functions
// export const isError = (response: Error | any): response is Error => "traceId" in response && "path" in response && "timestamp" in response;

/**
 * Create: POST => Success ===> resourceId
 * Delete: DELETE => Success ===> resourceId
 * Update: PATCH => Success ===> resourceId
 * GetAll: GET => Page ===> items
 * GetById: GET => T extends BaseData ===> id
 */
